<?php

namespace App\Http\Controllers;

use App\Interfaces\FiscalFileServiceInterface;
use App\Models\Committee;
use App\Models\FiscalFile;
use App\Models\Member;
use App\Models\ProcesVerbaux;
use App\Models\ProcesVerbauxSection;
use App\Models\SousProcesVerbaux;
use App\Services\ProcesVerbauxService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ProcesVerbauxController extends Controller
{
    public function index()
    {
        $pvs = ProcesVerbaux::all();

        return Inertia::render('Admin/ProcesVerbal/List', [
            'pvs' => $pvs,
        ]);
    }
    public function showMakePV($commiteeId)
    {
        $committee = Committee::with([
            'members',
            'fiscalFiles.reports'
        ])->findOrFail($commiteeId);

        if ($committee->status === 'completed' || $committee->status === 'not-confirmed') {
            return redirect('/dashboard/agenda')->with(['error' => 'The operation is not allowed because the committee is already completed'], 403);
        }
        return Inertia::render('Admin/ProcesVerbal/CreatePV', [
            'committee' => $committee,
        ]);
    }

    public function storePV($committeeId, Request $request)
    {
        try {
            $validatedData = $request->validate([
                // Validation rules for formData
                'formData.presedent' => 'required|string',
                'formData.ouverture' => 'required|string',
                'formData.cloture' => 'required|string',
                'formData.members' => 'required|array|min:1',
                'formData.members.*' => 'required|array|size:3',
                'formData.members.*.0' => 'required|boolean',
                'formData.members.*.1' => 'required|string',
                // Times
                'times' => 'required|array',
                // Validation rules for reportsData
                'reportsData.*.name' => 'required|string',
                'reportsData.*.description' => 'required|string',
                // Validation rules for decisionsData
                'decisionsData.*.decisions' => 'required|string|in:accepted,delayed,rejected',
                'decisionsData.*.notes' => 'required|string',
                'decisionsData.*.id' => 'required|integer',
            ]);

            $statusMapping = [
                'accepted' => 'accepted',
                'delayed' => 'delayed',
                'rejected' => 'rejected',
            ];

            DB::beginTransaction();

            try {
                //presence
                $committee = Committee::findOrFail($committeeId);

                if ($committee->status === 'completed' || $committee->status === 'not-confirmed') {
                    return response()->json(['error' => 'The operation is not allowed because the committee is already completed'], 403);
                }

                foreach ($validatedData['formData']['members'] as  $userId => $userData) {
                    $presence = $userData[0];
                    $committee->members()->updateExistingPivot($userId, ['presence' => $presence ? 'present' : 'absent']);
                }

                // Step 1: Create Sous Proces Verbaux using decisionsData
                $sousPVs = [];
                foreach ($validatedData['decisionsData'] as $decision) {
                    $sousPV = new SousProcesVerbaux();
                    $sousPV->decision = $decision['decisions'];
                    $sousPV->notes = $decision['notes'];
                    $sousPV->fiscal_file_id = $decision['id'];
                    $sousPVs[] = $sousPV;

                    $fiscalFile = FiscalFile::findOrFail($decision['id']);
                    $fiscalFile->status = $statusMapping[$decision['decisions']];
                    $fiscalFile->save();
                }

                // Step 2: Create Proces Verbaux
                $pv = new ProcesVerbaux();
                $pv->presedent = $validatedData['formData']['presedent'];
                $pv->ouverture = $validatedData['formData']['ouverture'];
                $pv->cloture = $validatedData['formData']['cloture'];
                $pv->save();

                // Step 3: Create Custom Proces Verbaux Fields using reportsData
                if (isset($validatedData['reportsData'])) {
                    foreach ($validatedData['reportsData'] as $report) {
                        $customField = new ProcesVerbauxSection();
                        $customField->proces_verbaux_id = $pv->id;
                        $customField->field_name = $report['name'];
                        $customField->field_value = $report['description'];
                        $customField->save();
                    }
                }

                $pv->sousProcesVerbaux()->saveMany($sousPVs);

                $start = date('H:i:s', strtotime($validatedData['times']['start']));
                $end = date('H:i:s', strtotime($validatedData['times']['end']));

                $committee->ouverture = $start;
                $committee->cloture = $end;

                // Generate PDF and save path
                $pdfData = [
                    'committee' => $committee,
                    'pv' => $pv,
                    'members' => $committee->members()->withPivot('presence')->get()
                ];
                Log::alert($committee->members()->withPivot('presence')->get());
                $pdfPath = ProcesVerbauxService::generatePDF($pdfData);
                $pv->pdf = $pdfPath;
                $pv->save();

                // Step 5: Associate Proces Verbaux with Committee
                $committee->proces_verbaux_id = $pv->id;
                $committee->status = "completed";
                $committee->save();

                DB::commit();

                return redirect('/dashboard')->with(['success' => 'Commitee realiser avec succee'])->header('Cache-Control', 'no-cache, no-store, must-revalidate');
            } catch (\Exception $e) {
                Log::alert($e);
                DB::rollback();
                return response()->json(['message' => 'Error creating records: ' . $e->getMessage()], 500);
            }
        } catch (ValidationException $e) {
            $errors = $e->errors();
            Log::alert($errors);
            return response()->json(['message' => 'Validation error', 'errors' => $errors], 422);
        }
    }
}

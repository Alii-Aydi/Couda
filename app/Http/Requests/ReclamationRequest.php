<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Reclamation; // Import the Reclamation model
use Illuminate\Support\Facades\Log; // Import Log facade

class ReclamationRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        // Eager load the relationships
        $reclamation = Reclamation::with('attributesReclamations', 'reportsReclamations')->findOrFail($this->route('reclamation')->id);

        $reportsReclamations = $reclamation->reportsReclamations;
        $attributesReclamations = $reclamation->attributesReclamations;

        $attRules = [];
        foreach ($attributesReclamations as $index => $attribute) {
            $attRules["att.{$attribute->attribute}"] = 'required|string';
        }

        $repRules = [];
        foreach ($reportsReclamations as $index => $report) {
            $repRules["rep.{$report->name}"] = 'required|array';
            $repRules["rep.{$report->name}.*"] = 'file|mimes:pdf,jpg,jpeg,png,doc,docx|max:2048'; // Adjust as needed
        }

        // Combine all rules
        $rules = array_merge($attRules, $repRules);

        // Log::critical($rules);

        return $rules;
    }

    public function messages()
    {
        return [
            // Define your custom error messages here
        ];
    }
}

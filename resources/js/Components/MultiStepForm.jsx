import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { FileCopy, GroupAdd, Check } from '@mui/icons-material';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { Checkbox, Divider, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel } from '@mui/material';
import MeetingMinutes from '@/Pages/Admin/ProcesVerbal/ProcesVerbal';
import { useEffect } from 'react';
import SousPv from '@/Pages/Admin/ProcesVerbal/SousPv';
import { Inertia } from '@inertiajs/inertia';

export default function MultiStepForm({ commitee }) {
    const members = commitee.members.map(mem => ({ 'name': mem.name, "id": mem.id, 'signature': mem.signature_path }));
    const initialFormData = {
        'presedent': '',
        'ouverture': '',
        'cloture': '',
        // Add members' names as keys with initial value ''
        'members': { ...Object.fromEntries(members.map(mem => [mem.id, [false, mem.name, mem.signature ? mem.signature : '']])) },
    };
    // Define steps with fields array
    const steps = [
        { label: 'Membres Presence', icon: <GroupAdd />, fields: members },
        { label: 'Proces Verbales', icon: <FileCopy />, fields: ['presedent', 'ouverture', 'cloture'] },
        { label: 'Dessition et conclution', icon: <BookmarkAddedIcon />, fields: [''] },
    ];
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
    const [formData, setFormData] = useState(initialFormData);
    const [formErrors, setFormErrors] = useState({});
    const [absences, setAbsences] = useState([]);
    const [attende, setAttende] = useState([]);

    const [newReports, setNewReports] = useState([]);
    const [reportErrors, setReportErrors] = useState([]);

    const [decisions, setDecisions] = useState(Array(commitee.fiscal_files.length).fill({ "decisions": '', "notes": '' }));
    const [filesErrors, setFilesErrors] = useState([]);

    const [time, setTime] = useState('');
    useEffect(() => {
        const listAbs = []
        const listAtt = []
        for (let key in formData.members) {
            if (!formData.members[key][0]) {
                listAbs.push(formData.members[key][1])
            } else {
                listAtt.push({ 'name': formData.members[key][1], 'signature': formData.members[key][2] })
            }
        }
        setAbsences(listAbs)
        setAttende(listAtt)
    }, [formData])


    const validateForm = () => {
        const errors = {};
        if (activeStep === 0 && steps[activeStep].fields.some(field => formData.members[field.id][0])) {
            return true;
        } else if (activeStep === 0) {
            errors['checkbox'] = 'Un member est requis au moins';
            setFormErrors(errors);
            return false
        } else if (activeStep === 1) {
            const erRors = newReports.map(report => ({
                name: report.name.trim().length === 0,
                description: report.description.trim().length < 3
            }));

            steps[activeStep].fields.forEach((field) => {
                if (Array.isArray(formData[field])) return
                if (formData[field].trim().length < 3) {
                    errors[field] = true;
                } else {
                    errors[field] = false;
                }
            });
            setFormErrors(errors);
            setReportErrors(erRors);

            return !(erRors.some(e => e.description === true || e.name === true) || Object.keys(errors).some(key => errors[key] === true))
        } else {
            const erRors = decisions.map(d => ({
                decisions: d.decisions.trim().length === 0,
                notes: d.notes.trim().length < 3
            }));
            setFilesErrors(erRors)

            return !(erRors.some(e => e.decisions === true || e.notes === true))
        }
    };

    const handleNext = () => {
        if (!validateForm()) return;
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        if (!validateForm()) return;
        setCompleted({ ...completed, [activeStep]: true });
        if (isLastStep()) {
            handleFinish();
        } else {
            handleNext();
        }
    };

    const handleFinish = async () => {
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

            const dataToSend = {
                formData: formData,
                reportsData: newReports,
                decisionsData: decisions,
                times: { "start": time, "end": new Date().toLocaleTimeString() }
            };

            const response = await fetch(`/dashboard/commitee/${commitee.id}/makepv`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify(dataToSend)
            });

            if (response.ok) {
                Inertia.visit('/dashboard?flash.success=Commitee realiser avec succee')
            } else {
                console.log(response.status)
                if (response.status === 403) {
                    Inertia.visit('/dashboard/agenda?flash.error=Commitee est deja terminer')
                } else {
                    console.error('Failed to send data:', response.statusText);
                }
            }
        } catch (error) {
            console.error('An error occurred:', error.message);
        }
    };

    const handleChange = (event) => {
        const { name, checked, value } = event.target;
        if (event.target.type === 'checkbox') {
            setFormData((prevFormData) => ({
                ...prevFormData,
                members: {
                    ...prevFormData.members,
                    [name]: [
                        checked,
                        prevFormData.members[name][1],
                        prevFormData.members[name][2]
                    ],
                },
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const isLastStep = () => activeStep === steps.length - 1;
    const allStepsCompleted = () => Object.keys(completed).length === steps.length;

    return (
        <Box sx={{ width: '100%' }} className="p-4">
            <Stepper activeStep={activeStep} className='p-4'>
                {steps.map((step, index) => (
                    <Step key={step.label} completed={false}>
                        <StepButton color="inherit" onClick={handleStep(index)}>
                            <StepLabel
                                StepIconComponent={() => (
                                    <div className={`flex items-center justify-center w-12 h-12 rounded-full text-white ${completed[index] ? 'bg-green-700' : 'bg-indigo-500'} ${activeStep === index ? 'glow-effect' : ''}`}>
                                        {completed[index]
                                            ? <Check style={{ fontSize: '36px' }} />
                                            : React.cloneElement(step.icon, {
                                                style: {
                                                    fontSize: '36px',
                                                },
                                            })}
                                    </div>
                                )}
                            >
                                <div className={`text-sm font-medium px-2 py-1 rounded ${activeStep === index ? 'bg-green-700 text-white' : 'bg-transparent'}`}>
                                    {step.label}
                                </div>
                            </StepLabel>
                        </StepButton>
                    </Step>
                ))}
            </Stepper>

            <div>
                {activeStep === 0 ? <Typography variant="h4" sx={{ mt: 2, mb: 1, px: 4 }}>Selectioner les membres presents:</Typography> : ''}
                <Box component="form" noValidate sx={{ mt: 1, px: 4 }}>
                    {/*fields */}
                    {activeStep === 0 && (
                        <FormControl component="fieldset" error={formErrors['checkbox']}>
                            <FormHelperText sx={{ mx: 0 }}>{formErrors['checkbox']}</FormHelperText>
                            {steps[activeStep].fields.map((field, i) => (
                                <FormControlLabel
                                    key={field.id}
                                    control={<Checkbox
                                        checked={formData.members[field.id][0]}
                                        onChange={handleChange}
                                        name={field.id}
                                    />}
                                    label={field.name.charAt(0).toUpperCase() + field.name.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                                />
                            ))}
                        </FormControl>
                    )}

                    {activeStep === 1 && (
                        <MeetingMinutes
                            formData={formData}
                            setFormData={setFormData}
                            commitee={commitee}
                            absences={absences}
                            attende={attende}
                            reportErrors={reportErrors}
                            setNewReports={setNewReports}
                            newReports={newReports}
                            formErrors={formErrors}
                            time={time}
                            setTime={setTime}
                        />
                    )}

                    {activeStep === 2 ? <Typography variant="h4" sx={{ mt: 2, mb: 1 }}>Les Dessitions et Sous-P-V:</Typography> : ''}
                    {activeStep === 2 && (
                        <SousPv
                            fiscal_files={commitee.fiscal_files}
                            decisions={decisions}
                            setDecisions={setDecisions}
                            filesErrors={filesErrors}
                        />
                    )}
                    <Divider className='pt-8'></Divider>

                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }} className="space-x-2">
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}
                            className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button
                            onClick={handleComplete}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}                        </Button>

                    </Box>
                </Box>
            </div >
        </Box >
    );
}

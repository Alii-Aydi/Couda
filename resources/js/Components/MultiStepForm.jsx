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
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel } from '@mui/material';
import MeetingMinutes from '@/Pages/Admin/ProcesVerbal/ProcesVerbal';
import { useEffect } from 'react';

export default function MultiStepForm({ commitee }) {
    const members = commitee.members.map(mem => mem.name)
    const initialFormData = {
        campaignName: '',
        adGroupName: '',
        adName: '',
        adBudget: '',
        // Add members' names as keys with initial value ''
        ...Object.fromEntries(members.map(name => [name, false])),
    };
    // Define steps with fields array
    const steps = [
        { label: 'Membres Presence', icon: <GroupAdd />, fields: members },
        { label: 'Proces Verbales', icon: <FileCopy />, fields: ['pv'] },
        { label: 'Dessition et conclution', icon: <BookmarkAddedIcon />, fields: ['adName', 'adBudget'] },
    ];
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
    const [formData, setFormData] = useState(initialFormData);
    const [formErrors, setFormErrors] = useState({});
    const [absences, setAbsences] = useState([]);
    const [attende, setAttende] = useState([]);

    useEffect(() => {
        const listAbs = []
        const listAtt = []
        for (let key in formData) {
            if (formData[key] !== '') {
                if (!formData[key]) {
                    listAbs.push(key)
                } else {
                    listAtt.push(key)
                }
            }
        }
        setAbsences(listAbs)
        setAttende(listAtt)
    }, [formData])


    const validateForm = () => {
        const errors = {};
        if (activeStep === 0 && steps[activeStep].fields.some(field => formData[field])) {
            return true;
        } else if (activeStep === 0) {
            errors['checkbox'] = 'Un member est requis au moins';
        } else {
            steps[activeStep].fields.forEach((field) => {
                if (!formData[field]) {
                    errors[field] = 'This field is required';
                }
            });
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
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

    const handleFinish = () => {
        console.log('Form Data:', formData);
        alert('Form submitted successfully!');
    };

    const handleChange = (event) => {
        const { name, checked, value } = event.target;
        if (event.target.type === 'checkbox') {
            setFormData({ ...formData, [name]: checked });
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
                {activeStep === 0 ? <Typography sx={{ mt: 2, mb: 1, px: 4 }}>Selectioner les membres presents</Typography> : ''}
                <Box component="form" noValidate sx={{ mt: 1, px: 4 }}>
                    {/*fields */}
                    {activeStep === 0 && (
                        <FormControl component="fieldset" error={formErrors['checkbox']}>
                            <FormHelperText sx={{ mx: 0 }}>{formErrors['checkbox']}</FormHelperText>
                            {steps[activeStep].fields.map((field, i) => (
                                <FormControlLabel
                                    key={field}
                                    control={<Checkbox
                                        checked={formData[field]}
                                        onChange={handleChange}
                                        name={field}
                                    />}
                                    label={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                                />
                            ))}
                        </FormControl>
                    )}

                    {activeStep === 2 && (
                        steps[activeStep].fields.map((field, i) => (
                            <TextField
                                key={field}
                                required
                                fullWidth
                                id={field}
                                name={field}
                                label={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                                value={formData[field]}
                                onChange={handleChange}
                                error={formErrors[field]}
                                helperText={formErrors[field]}
                                margin="normal"
                                className="mb-4"
                            />
                        ))
                    )}

                    {activeStep === 1 && (
                        steps[activeStep].fields.map((field, i) => (
                            <MeetingMinutes commitee={commitee} absences={absences} attende={attende} />
                        ))
                    )}

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
            {allStepsCompleted() && (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you're finished</Typography>
                </React.Fragment>
            )
            }
        </Box >
    );
}

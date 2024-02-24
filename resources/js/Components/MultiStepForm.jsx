import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Settings, GroupAdd, VideoLabel, Check } from '@mui/icons-material';

// Define steps with fields array
const steps = [
    { label: 'Select campaign settings', icon: <Settings />, fields: ['campaignName'] },
    { label: 'Create an ad group', icon: <GroupAdd />, fields: ['adGroupName'] },
    { label: 'Create an ad', icon: <VideoLabel />, fields: ['adName', 'adBudget'] },
];

export default function MultiStepForm() {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
    const [formData, setFormData] = useState({
        campaignName: '',
        adGroupName: '',
        adName: '',
        adBudget: '',
    });
    const [formErrors, setFormErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        steps[activeStep].fields.forEach((field) => {
            if (!formData[field]) {
                errors[field] = 'This field is required';
            }
        });
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

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
        setFormData({
            campaignName: '',
            adGroupName: '',
            adName: '',
            adBudget: '',
        });
        setFormErrors({});
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
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
                                    <div className={`flex items-center justify-center w-12 h-12 rounded-full text-white ${completed[index] ? 'bg-green-500' : 'bg-indigo-500'} ${activeStep === index ? 'glow-effect' : ''}`}>
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
                                <div className={`text-sm font-medium px-2 py-1 rounded ${activeStep === index ? 'bg-green-500 text-white' : 'bg-transparent'}`}>
                                    {step.label}
                                </div>
                            </StepLabel>
                        </StepButton>
                    </Step>
                ))}
            </Stepper>

            <div>
                <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    {steps[activeStep].fields.map((field) => (
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
                    ))}
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
            </div>
            {allStepsCompleted() && (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you're finished</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }} className="space-x-2">
                        <Button onClick={handleReset} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Reset
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}

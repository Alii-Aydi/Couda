import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { usePage } from '@inertiajs/react';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import 'react-toastify/dist/ReactToastify.css';

function Flash() {
    const { flash } = usePage().props;
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('info');
    const [paramSuccessValue, setParamSuccessValue] = useState('');
    const [paramErrorValue, setParamErrorValue] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const paramSuccessValueFromQuery = urlParams.get('flash.success');
        const paramErrorValueFromQuery = urlParams.get('flash.error');
        if (paramSuccessValueFromQuery) {
            setParamSuccessValue(paramSuccessValueFromQuery);
        }
        else if (paramErrorValueFromQuery) {
            setParamErrorValue(paramErrorValueFromQuery);
        }
    }, []);

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }

        if (paramSuccessValue) {
            toast.success(paramSuccessValue);
        }

        if (paramErrorValue) {
            toast.error(paramErrorValue);
        }

        if (flash.error) {
            toast.error(flash.error);
        }

        if (flash.info) {
            setMessage(flash.info); // Set the message state for info flash message
            setSeverity('info');
            setOpen(true);
        }
    }, [flash.success, flash.error, flash.info, paramSuccessValue]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <>
            <div>
                <ToastContainer theme={theme === 'dark' ? 'dark' : 'light'} />
            </div>

            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                autoHideDuration={15000}
                onClose={handleClose}
                style={{
                    backgroundColor: '#2196f3', // Blue color
                    color: '#fff' // White text color
                }}
            >
                <SnackbarContent
                    message={message}
                    action={null}
                    severity="info"
                    style={{ backgroundColor: 'inherit', color: 'inherit' }}
                />
            </Snackbar>

        </>
    );
}

export default Flash;

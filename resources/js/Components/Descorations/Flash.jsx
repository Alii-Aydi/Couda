import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { usePage } from '@inertiajs/react';
import 'react-toastify/dist/ReactToastify.css';

function Flash() {
    const { flash } = usePage().props;
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }

        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash.success, flash.error]);

    return (
        <div>
            <ToastContainer theme={theme === 'dark' ? 'dark' : 'light'} />
        </div>
    );
}

export default Flash;

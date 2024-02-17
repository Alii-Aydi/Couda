import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { usePage } from '@inertiajs/react'
import 'react-toastify/dist/ReactToastify.css';

function Flash() {
    const { flash } = usePage().props
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
            <ToastContainer />
        </div>
    );
}

export default Flash;

import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

const ResReclamations = ({ auth }) => {
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Notifications" />
            <div className="py-12">
                <h1 className='p-4 text-4xl'>Responses Reclamtions</h1>
                <div className="p-7 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">



                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default ResReclamations

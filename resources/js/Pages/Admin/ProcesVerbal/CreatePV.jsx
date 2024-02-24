import MultiStepForm from '@/Components/MultiStepForm'
import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const CreatePV = ({ auth }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Archive Dossiers" />

            <div className="py-12">
                <h1 className='p-4 text-4xl'>Dashboard</h1>
                <div className="p-7 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <MultiStepForm></MultiStepForm>
                </div>

            </div>
        </AuthenticatedLayout>
    )
}

export default CreatePV
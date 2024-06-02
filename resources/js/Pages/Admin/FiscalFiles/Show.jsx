// components/FiscalFileShow.js
import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

import ShowPaper from '@/Components/ShowPaper';

const FiscalFileShow = ({ auth, file }) => {
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title={file.cin_or_fiscal_number} />
            <div className="py-12">
                <h1 className='p-4 text-4xl'>Fiscal File N°{file.id}</h1>
                <div className="p-7 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="container mx-auto mt-8">
                        <ShowPaper auth={auth} file={file}></ShowPaper>
                        <div className="mt-4">
                            <Button
                                className="dark:bg-red-700 dark:text-white rounded-full px-4 py-2 flex items-center gap-2 transition-colors duration-300 ease-in-out hover:bg-purple-500 hover:text-white"
                                startIcon={<ArrowBackIcon />}
                                component={Link}
                                href="/dashboard/fiscalFilesList"
                                style={{ borderRadius: '2em' }}
                            >
                                Retour à la liste
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default FiscalFileShow;

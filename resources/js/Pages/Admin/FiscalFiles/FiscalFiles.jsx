import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import MaterialTable from '@/Components/MaterialTable';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function FiscalFiles({ auth }) {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Liste Des Dossiers" />

            <div className="py-12">
                <h1 className='p-4 text-4xl'>Dossiers</h1>
                <Box sx={{ width: '100%' }}>
                    <Box borderBottom={1} borderColor="divider">
                        <Tabs value={tabValue} onChange={handleTabChange} aria-label="fiscal files tabs">
                            <Tab label="Dossiers actives" />
                            <Tab label="Dossiers archivés" />
                        </Tabs>
                    </Box>
                    <div className="p-7 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        {tabValue === 0 && <MaterialTable filesPath={'/dashboard/fiscalFiles'} action={'Archiver'} />}
                        {tabValue === 1 && <MaterialTable filesPath={'/dashboard/ArchivedfiscalFiles'} action={'Restorer'} />}
                    </div>
                </Box>
            </div>
        </AuthenticatedLayout>
    );
}

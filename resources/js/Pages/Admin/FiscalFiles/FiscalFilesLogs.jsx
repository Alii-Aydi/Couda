import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import MaterialLogsTable from '@/Components/MaterialLogsTable';

export default function FiscalFilesLogs({ auth }) {
    return (
        <AuthenticatedLayout
            auth={auth}
        >
            <Head title="Archive Dossiers" />

            <div className="py-12">
                <h1 className='p-4 text-4xl'>Dashboard</h1>
                <div className="p-7 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <MaterialLogsTable></MaterialLogsTable>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
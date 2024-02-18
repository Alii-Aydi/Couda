import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import MaterialTable from '@/Components/MaterialTable';

export default function FiscalFiles({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Liste Des Dossiers" />

            <div className="py-12">
                <h1 className='p-4 text-4xl'>Dashboard</h1>
                <div className="p-7 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <MaterialTable></MaterialTable>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function ListProcesVerbaux({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="ListProcesVerbaux" />

            <div className="py-12">
                <h1 className='p-4 text-4xl'>List des Proces-Verbaux</h1>
                <div className="p-7 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">

                </div>

            </div>
        </AuthenticatedLayout>
    );
}

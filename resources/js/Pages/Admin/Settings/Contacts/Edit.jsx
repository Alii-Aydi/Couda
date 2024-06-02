import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const EditContact = ({ auth, contact }) => {
    const { data, setData, put, processing, errors } = useForm({
        name: contact.name,
        email: contact.email,
        phone1: contact.phone1,
        phone2: contact.phone2,
        location: contact.location,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('contacts.update', contact.id), {
            onSuccess: () => {
                // Handle success (optional)
            },
        });
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Modifier Contact" />

            <div className="py-12">
                <h1 className='p-4 text-4xl'>Modifier Contact</h1>
                <div className="p-7 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col">
                            <label htmlFor="name" className="mb-1">Nom<span className='text-red-500'>*</span></label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={`mt-1 block w-full rounded-3xl border ${errors.name ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white`}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="mb-1">Email<span className='text-red-500'>*</span></label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className={`mt-1 block w-full rounded-3xl border ${errors.email ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white`}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="phone1" className="mb-1">Numero tel 1<span className='text-red-500'>*</span></label>
                            <input
                                id="phone1"
                                name="phone1"
                                type="text"
                                value={data.phone1}
                                onChange={(e) => setData('phone1', e.target.value)}
                                className={`mt-1 block w-full rounded-3xl border ${errors.phone1 ? 'border-red-500' : 'border-gray-300'} shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white`}
                            />
                            {errors.phone1 && <p className="text-red-500 text-sm mt-1">{errors.phone1}</p>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="phone2" className="mb-1">Numero tel 2</label>
                            <input
                                id="phone2"
                                name="phone2"
                                type="text"
                                value={data.phone2}
                                onChange={(e) => setData('phone2', e.target.value)}
                                className={`mt-1 block w-full rounded-3xl border ${errors.phone2 ? 'border-red-500' : 'border-gray-300'} shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white`}
                            />
                            {errors.phone2 && <p className="text-red-500 text-sm mt-1">{errors.phone2}</p>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="location" className="mb-1">Location<span className='text-red-500'>*</span></label>
                            <input
                                id="location"
                                name="location"
                                type="text"
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                                className={`mt-1 block w-full rounded-3xl border ${errors.location ? 'border-red-500' : 'border-gray-300'} shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white`}
                            />
                            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                        </div>
                        <button
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-3xl text-white bg-indigo-500 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-800"
                            type="submit"
                            disabled={processing}
                        >
                            Modifier Contact
                        </button>
                        <Link
                            href={`/dashboard/settings/infra`}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white ml-2 rounded-3xl bg-red-500 bg:text-red-700 dark:bg-red-600 dark:bg:text-red-800"
                        >
                            Annuler
                        </Link>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default EditContact;

import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import SelectAvatar from '@/Components/Profile/Partials/SelectAvatar';
import SignatureUploadInput from '@/Components/Profile/UploadSignature';

const Register = ({ roles, auth }) => {
    const [selectedRole, setSelectedRole] = useState('');
    const [profilePic, setProfilePic] = useState("/imgs/avatar.png");
    const [image, setImage] = useState("");
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: '',
        profile_pic: '',
        cin: '',
        signature: ''
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data)
        post(route('register'));
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfilePic(reader.result);
            setData('profile_pic', file);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result)
            setData('signature', file);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Settings" />

            <div className="py-12">
                <h1 className='p-4 text-4xl'>Parametre</h1>
                <div className="p-7 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg flex justify-center align-content-center">
                    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-xlg">
                        <h1 className='text-4xl font-light text-black dark:text-white'>Enregistrer nouveau utilisateur</h1>
                        <SelectAvatar profilePic={profilePic} handleProfilePicChange={handleProfilePicChange} />
                        {errors.profile_pic && <div className="text-red-500 text-sm">{errors.profile_pic}</div>}
                        <div>
                            <label htmlFor="name" className="text-black dark:text-white">Nom</label>
                            <input id="name" name="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} className="rounded-3xl mt-1 block w-full border-indigo-300 hover:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                        </div>
                        <div>
                            <label htmlFor="cin" className="text-black dark:text-white">CIN</label>
                            <input id="cin" name="cin" type="text" value={data.cin} onChange={(e) => setData('cin', e.target.value)} className="rounded-3xl mt-1 block w-full border-indigo-300 hover:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            {errors.cin && <div className="text-red-500 text-sm">{errors.cin}</div>}
                        </div>
                        <div>
                            <label htmlFor="email" className="text-black dark:text-white">Email</label>
                            <input id="email" name="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="rounded-3xl mt-1 block w-full border-indigo-300 hover:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                        </div>
                        <div>
                            <label htmlFor="password" className="text-black dark:text-white">Mot de passe</label>
                            <input id="password" name="password" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} className="rounded-3xl mt-1 block w-full border-indigo-300 hover:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
                        </div>
                        <div>
                            <label htmlFor="password_confirmation" className="text-black dark:text-white">Confirmer le mot de passe</label>
                            <input id="password_confirmation" name="password_confirmation" type="password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} className="rounded-3xl mt-1 block w-full border-indigo-300 hover:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            {errors.password_confirmation && <div className="text-red-500 text-sm">{errors.password_confirmation}</div>}
                        </div>
                        <div>
                            <label htmlFor="role" className="text-black dark:text-white">Role</label>
                            <select id="role" name="role" value={selectedRole} onChange={(e) => { setSelectedRole(e.target.value); setData('role', e.target.value); }} className="rounded-3xl mt-1 block w-full border-indigo-300 hover:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                <option value="">Sélectionner un rôle</option>
                                {roles.map(role => (
                                    <option key={role.id} value={role.name}>{role.name}</option>
                                ))}
                            </select>
                            {errors.role && <div className="text-red-500 text-sm">{errors.role}</div>}
                        </div>
                        <div className="py-4 sm:py-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <SignatureUploadInput image={image} handleImageChange={handleImageChange} className="max-w-xl" />
                            {errors.signature && <div className="text-red-500 text-sm">{errors.signature}</div>}
                        </div>
                        <button type="submit" disabled={processing} className="px-4 py-2 rounded-3xl bg-indigo-500 text-white hover:bg-indigo-300 dark:bg-indigo-700 dark:hover:bg-indigo-600">Enregistrer</button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Register;

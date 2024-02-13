// Import useForm hook from Inertia.js
import React, { useEffect } from 'react';
import UserLayout from '@/Layouts/UserLayOut';
import { Head, useForm } from '@inertiajs/react';

const Register = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('register'))
    };

    return (
        <UserLayout>
            <Head title="Register" />
            <div className="flex justify-center items-center min-h-screen">
                <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
                    <h1 className='text-4xl font-light'>Register to proceed</h1>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input id="name" name="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} className="rounded-3xl mt-1 block w-full border-indigo-300 hover:border-indigo-500" />
                        {errors && <div className="text-red-500 text-sm">{errors.name}</div>}
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="rounded-3xl mt-1 block w-full border-indigo-300 hover:border-indigo-500" />
                        {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} className="rounded-3xl mt-1 block w-full border-indigo-300 hover:border-indigo-500" />
                        {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
                    </div>
                    <div>
                        <label htmlFor="password_confirmation">Confirm Password</label>
                        <input id="password_confirmation" name="password_confirmation" type="password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} className="rounded-3xl mt-1 block w-full border-indigo-300 hover:border-indigo-500" />
                        {errors.password_confirmation && <div className="text-red-500 text-sm">{errors.password_confirmation}</div>}
                    </div>
                    <button type="submit" disabled={processing} className="px-4 py-2 rounded-3xl bg-indigo-500 text-white hover:bg-indigo-300">Register</button>
                </form>
            </div>
        </UserLayout>
    );
};

export default Register;

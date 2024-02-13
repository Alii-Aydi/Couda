// Import useForm hook from Inertia.js
import React, { useEffect } from 'react';
import UserLayout from '@/Layouts/UserLayOut';
import { Head, useForm } from '@inertiajs/react';

const Login = () => {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('login')); // Adjust this route to your login route name
    };

    return (
        <UserLayout>
            <Head title="Login" />
            <div className="flex justify-center items-center min-h-screen">
                <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
                    <h1 className='text-4xl font-light'>Login to your account</h1>

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

                    <div className="flex items-center">
                        <input id="remember_me" name="remember_me" type="checkbox" checked={data.remember_me} onChange={(e) => setData('remember_me', e.target.checked)} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                        <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900 cursor-pointer">Remember me</label>
                    </div>

                    <button type="submit" disabled={processing} className="px-4 py-2 rounded-3xl bg-indigo-500 text-white hover:bg-indigo-300 w-full">Login</button>

                    <div className="text-center">
                        <p className="text-sm">
                            Do not have an account? <a href={route('register')} className="text-indigo-600 hover:underline">Sign Up</a>
                        </p>
                    </div>
                </form>
            </div>

        </UserLayout>
    );
};

export default Login;

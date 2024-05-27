import UserLayout from '@/Layouts/UserLayOut';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/inertia-react';
import AutoSwiper from '@/Components/Descorations/Swiper/AutoSwiper';

export default function Welcome({ auth, flash }) {
    return (
        <>
            <Head title='Welcome'></Head>
            <UserLayout user={auth.user} flash={flash}>

                <AutoSwiper></AutoSwiper>

                <div className="absolute inset-0 top-40 bottom-40 sm:left-10 sm:right-10 flex justify-center items-center isolate px-6 lg:px-8 overflow-hidden">
                    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                                Gestion Des Dossiers Fiscales
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-white">
                                Simplifiez votre gestion fiscale
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <a
                                    href="#"
                                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Commencer
                                </a>
                            </div>
                        </div>
                    </div>
                </div>


                {/* About Us Section */}
                <div className="relative bg-gray-900 text-white py-16 overflow-hidden">
                    <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
                        <div className="relative h-full text-lg max-w-prose mx-auto" aria-hidden="true">
                            <svg
                                className="absolute top-12 left-full transform translate-x-32"
                                width="404"
                                height="384"
                                fill="none"
                                viewBox="0 0 404 384"
                            >
                                <defs>
                                    <pattern
                                        id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                                        x="0"
                                        y="0"
                                        width="20"
                                        height="20"
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
                                    </pattern>
                                </defs>
                                <rect width="404" height="384" fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)" />
                            </svg>
                        </div>
                    </div>
                    <div className="container mx-auto flex flex-wrap px-4 sm:px-6 lg:px-8">
                        <div id='a-propos' className="lg:w-1/2 text-lg max-w-prose mx-auto mb-6 lg:mb-0">
                            <h2 className="text-3xl text-center lg:text-left leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                                à propos
                            </h2>
                            <p className="mt-8 text-xl text-gray-300 leading-8">
                                Notre application de gestion fiscale est conçue pour automatiser et simplifier vos tâches fiscales quotidiennes. Grâce à une interface intuitive et des fonctionnalités avancées, vous pouvez gérer vos déclarations, suivre vos paiements et garantir la conformité réglementaire en toute simplicité. Profitez de la sécurité des données, de l'analyse en temps réel et d'un support dédié pour optimiser votre expérience de gestion fiscale.
                            </p>
                        </div>
                        <div className="lg:w-1/2 flex justify-center lg:justify-end">
                            <img
                                className="rounded-lg shadow-xl w-full lg:w-3/4 transform transition hover:scale-105 duration-300 ease-in-out"
                                src="https://images.unsplash.com/photo-1563198804-b144dfc1661c?q=80&w=2059&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with your image path
                                alt="About Us"
                                style={{ maxHeight: '400px' }} // Optional: you can remove this if you want the image to scale with its container
                            />
                        </div>
                    </div>
                </div>

            </UserLayout>
        </>
    );
}

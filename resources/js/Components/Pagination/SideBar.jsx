import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import { FiCommand, FiSettings, FiInbox, FiLogOut, FiChevronDown, FiChevronUp, FiFolder, FiPlus, FiEdit, FiAlertCircle, FiEye, FiList, FiCalendar, FiUsers, FiDatabase, FiClipboard } from 'react-icons/fi';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ThemeToggler from '../Descorations/CustomTogler';
import ProfileCircle from '../Profile/Partials/ProfileCircle';
import { Inertia } from '@inertiajs/inertia';

export function SidebarWithLogo({ auth }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isGestionDossiersOpen, setIsGestionDossiersOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);


    const name = auth.user.profile_pic?.replace(/\//g, ' ');
    const fileUrl = `/files/${name}`;

    const handleSubmit = (e) => {
        e.preventDefault();

        Inertia.post(route('logout'));
    };


    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-1 items-center justify-start rtl:justify-end">
                            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} data-drawer-target="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path></svg>
                            </button>
                            <Link href="/" className="flex ms-2 md:me-24">
                                <img src="/imgs/Insigne_Ministère_des_Finances.svg.png" className="h-8 me-3" alt="FlowBite Logo" />
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Admin</span>
                            </Link>
                        </div>
                        <div className='flex items-center'>
                            <ThemeToggler></ThemeToggler>
                            <div className="mx-4"></div>
                            <Link href='/profile' alt='profile'>
                                {auth.user.profile_pic ? (
                                    <ProfileCircle src={fileUrl} alt={"Profile Pic"}></ProfileCircle>
                                ) : (
                                    <ProfileCircle src={"/imgs/avatar.png"} alt={"Profile Pic"}></ProfileCircle>
                                )
                                }
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <aside className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`} aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto flex flex-col justify-between">
                    {/* Main navigation */}
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link href="/dashboard" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FiCommand className="w-5 h-5" />
                                <span className="ml-4">Tableau de bord</span>
                            </Link>
                        </li>

                        <li>
                            <button onClick={() => setIsGestionDossiersOpen(!isGestionDossiersOpen)} className="flex items-center justify-between w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <div className="flex items-center">
                                    <FiFolder className="w-5 h-5" />
                                    <span className="ml-4">Gestion Dossiers</span>
                                </div>
                                {isGestionDossiersOpen ? <FiChevronUp className="w-5 h-5" /> : <FiChevronDown className="w-5 h-5" />}
                            </button>
                            {isGestionDossiersOpen && (
                                <ul className="pl-8">
                                    <li className="p-2"><Link href="/dashboard/fiscalFilesList" className="block"><FiEye className="inline-block mr-2" /> Consulter</Link></li>
                                    {
                                        auth.permissions.includes('create a file') ? (
                                            <li className="p-2"><Link href="/dashboard/createFile" className="block"><FiPlus className="inline-block mr-2" /> Creer</Link></li>
                                        ) : ''
                                    }

                                    <li className="p-2"><Link href="/dashboard/fiscalFilesLogsList" className="block"><FiList className="inline-block mr-2" /> Journal</Link></li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <Link href="/dashboard/proces-verbaux/list" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <EventNoteIcon className="w-5 h-5" />
                                <span className="ml-4">Procés-Verbaux</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard/agenda" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FiCalendar className="w-5 h-5" />
                                <span className="ml-4">Agenda</span>
                            </Link>
                        </li>
                        {/* <li>
                            <Link href="/dashboard/makepv" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <Fiauth.Users className="w-5 h-5" />
                                <span className="ml-4">Committee</span>
                            </Link>
                        </li> */}
                        {auth.permissions.includes('edit file') ? (
                            <li>
                                <button onClick={() => setIsNotifOpen(!isNotifOpen)} className="flex items-center justify-between w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <div className="flex items-center">
                                        <FiInbox className="w-5 h-5" />
                                        <span className="ml-4">Notifications</span>
                                    </div>
                                    {isNotifOpen ? <FiChevronUp className="w-5 h-5" /> : <FiChevronDown className="w-5 h-5" />}
                                </button>
                                {isNotifOpen && (
                                    <ul className="pl-8">
                                        <li className="p-2"><Link href="/dashboard/reclamations/res" className="block"><FiClipboard className="inline-block mr-2" /> Responses Reclamations</Link></li>
                                    </ul>
                                )}
                            </li>
                        ) : ''
                        }
                        {auth.permissions.includes('infra') ? (
                            <li>
                                <button onClick={() => setIsSettingsOpen(!isSettingsOpen)} className="flex items-center justify-between w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <div className="flex items-center">
                                        <FiSettings className="w-5 h-5" />
                                        <span className="ml-4">Parametres</span>
                                    </div>
                                    {isSettingsOpen ? <FiChevronUp className="w-5 h-5" /> : <FiChevronDown className="w-5 h-5" />}
                                </button>
                                {isSettingsOpen && (
                                    <ul className="pl-8">
                                        <li className="p-2"><Link href="/dashboard/settings/infra" className="block"><FiDatabase className="inline-block mr-2" /> Infrastructure</Link></li>
                                        <li className="p-2"><Link href="/dashboard/settings/accountManagement" className="block"><FiUsers className="inline-block mr-2" /> Gestion Comptes</Link></li>
                                    </ul>
                                )}
                            </li>
                        ) : ''
                        }
                    </ul>
                    {/* Logout button */}
                    <ul>
                        <li>
                            <button onClick={handleSubmit} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FiLogOut className="w-5 h-5 text-red-500" />
                                <span className="ml-4">Se déconnecter</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
}
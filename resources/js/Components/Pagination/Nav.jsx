import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { ArrowPathIcon, Bars3Icon, ChartPieIcon, CursorArrowRaysIcon, FingerPrintIcon, SquaresPlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { Inertia } from '@inertiajs/inertia'
import { Link } from '@inertiajs/react'

const products = [
    { name: 'Analytique', description: 'Comprenez mieux votre trafic', href: '#', icon: ChartPieIcon },
    { name: 'Engagement', description: 'Communiquez directement avec vos clients', href: '#', icon: CursorArrowRaysIcon },
    { name: 'Sécurité', description: 'Les données de vos clients seront en sécurité', href: '#', icon: FingerPrintIcon },
    { name: 'Intégrations', description: 'Connectez-vous avec des outils tiers', href: '#', icon: SquaresPlusIcon },
    { name: 'Automatisations', description: 'Construisez des entonnoirs stratégiques qui convertiront', href: '#', icon: ArrowPathIcon },
]
const callsToAction = [
    { name: 'Voir la démo', href: '#', icon: PlayCircleIcon },
    { name: 'Contactez les ventes', href: '#', icon: PhoneIcon },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const handleSubmit = (e) => {
    e.preventDefault();

    Inertia.post(route('logout'));
};

export default function Navbar({ user }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="bg-white">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Minester de Finance</span>
                        <img className="h-8 w-auto" src="/imgs/Insigne_Ministère_des_Finances.svg.png" alt="" />
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Ouvrir le menu principal</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    <Link href="/" className="text-sm font-semibold leading-6 text-gray-900">
                        Acceille
                    </Link>
                    <Link href="/dashboard" className="text-sm font-semibold leading-6 text-gray-900">
                        Tableau de bord
                    </Link>
                    <a href="#a-propos" className="text-sm font-semibold leading-6 text-gray-900">
                        À propos
                    </a>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {user ? (
                        <>
                            <Link href="/profile" className="text-sm font-semibold leading-6 text-gray-900">
                                Profil
                            </Link>
                            <button
                                onClick={handleSubmit}
                                className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                            >
                                Se déconnecter
                            </button>
                        </>
                    ) : (
                        <>
                            <a href="/login" className="text-sm font-semibold leading-6 text-gray-900">
                                Se connecter
                            </a>
                        </>
                    )}
                </div>
            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Votre Compagnie</span>
                            <img
                                className="h-8 w-auto"
                                src="/imgs/Insigne_Ministère_des_Finances.svg.png"
                                alt=""
                            />
                        </a>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Fermer le menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Link
                                    href="/dashboard"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Tableau de bord
                                </Link>
                                <a
                                    href="/#a-propos"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    À propos
                                </a>
                            </div>
                            {user ? (
                                <>
                                    <div className="py-6">
                                        <Link
                                            href="/profile"
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            Profil
                                        </Link>
                                    </div>
                                    <div className="py-6">
                                        <button
                                            onClick={handleSubmit}
                                            className="text-sm font-semibold leading-6 text-gray-900"
                                        >
                                            Se déconnecter
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="py-6">
                                        <a
                                            href="/login"
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            Se connecter
                                        </a>
                                    </div>
                                    {/* <div className="py-6">
                                        <a
                                            href="/register"
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            S'inscrire
                                        </a>
                                    </div> */}
                                </>
                            )}
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}

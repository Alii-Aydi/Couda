// resources/js/Components/Footer.js
import React from 'react';
import { Link } from '@inertiajs/inertia-react';

const Footer = () => {
    return (
        <footer className="bg-white text-gray-600">
            <div className="mx-auto max-w-7xl items-center p-6 lg:px-8">
                <div className="xl:flex xl:justify-between">
                    <div className="mb-6 xl:mb-0 flex-shrink-0">
                        <Link className="flex" href="/">
                            <img src="imgs/Insigne_Ministère_des_Finances.svg.png" alt="Ministry Logo" className="h-12" />
                        </Link>

                        <p className="mt-2 text-sm text-gray-500">Ministère_des_Finances.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-12 sm:grid-cols-3">
                        <div>
                            <h3 className="text-gray-700 font-semibold mb-4">About</h3>
                            <ul>
                                <li><Link href="/about" className="hover:underline">Our Mission</Link></li>
                                <li><Link href="/team" className="hover:underline">Our Team</Link></li>
                                <li><Link href="/history" className="hover:underline">History</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-gray-700 font-semibold mb-4">Services</h3>
                            <ul>
                                <li><Link href="/education" className="hover:underline">Education</Link></li>
                                <li><Link href="/healthcare" className="hover:underline">Healthcare</Link></li>
                                <li><Link href="/community" className="hover:underline">Community Services</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-gray-700 font-semibold mb-4">Legal</h3>
                            <ul>
                                <li><Link href="/terms" className="hover:underline">Terms of Use</Link></li>
                                <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
                                <li><Link href="/accessibility" className="hover:underline">Accessibility</Link></li>
                            </ul>
                        </div>
                        {/* Additional columns as needed */}
                    </div>
                </div>
                <div className="pt-8 mt-8 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center">© {new Date().getFullYear()} Ministry Name. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

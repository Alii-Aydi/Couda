import { SidebarWithLogo } from '@/Components/Pagination/SideBar';
import { useState } from 'react';

export default function Authenticated({ user, children }) {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">

            <SidebarWithLogo ></SidebarWithLogo>

            <main className="p-4 sm:ml-64">
                {children}
            </main>
        </div>
    );
}

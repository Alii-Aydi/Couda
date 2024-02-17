import { ThemeProvider } from '@/Components/Contexts/ThemeContext';
import Flash from '@/Components/Descorations/Flash';
import { SidebarWithLogo } from '@/Components/Pagination/SideBar';
import { useState } from 'react';

export default function Authenticated({ user, children }) {
    return (
        <ThemeProvider>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                <Flash></Flash>
                <SidebarWithLogo ></SidebarWithLogo>

                <main className="p-4 sm:ml-64">
                    {children}
                </main>
            </div>
        </ThemeProvider>

    );
}

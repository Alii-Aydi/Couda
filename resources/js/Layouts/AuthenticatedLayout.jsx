import { ThemeProvider } from '@/Components/Contexts/ThemeContext';
import Flash from '@/Components/Descorations/Flash';
import { SidebarWithLogo } from '@/Components/Pagination/SideBar';

export default function Authenticated({ auth, children }) {
    return (
        <ThemeProvider>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                <Flash></Flash>
                <SidebarWithLogo auth={auth}></SidebarWithLogo>

                <main className="p-4 sm:ml-64">
                    {children}
                </main>
            </div>
        </ThemeProvider>

    );
}

// resources/js/Components/Layout.js
import React from 'react';
import Navbar from '../Components/Pagination/Nav';
import Footer from '../Components/Pagination/Footer';
import Flash from '@/Components/Descorations/Flash';

const UserLayout = ({ user, children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Flash></Flash>
            <Navbar user={user} />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default UserLayout;

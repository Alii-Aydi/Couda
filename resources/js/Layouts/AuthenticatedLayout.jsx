import { useState } from 'react';

export default function Authenticated({ user, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">


            <main>{children}</main>
        </div>
    );
}

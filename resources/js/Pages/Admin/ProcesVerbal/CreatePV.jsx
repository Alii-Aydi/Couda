import MultiStepForm from '@/Components/MultiStepForm'
import React, { useEffect, useState, useCallback, useMemo } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import formatDate from '@/Utils/formatDate';

const CreatePV = ({ auth }) => {
    const { committee } = usePage().props
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [loading, setLoading] = useState(true)

    const calculateTimeElapsed = useCallback(() => {
        const [year, month, day] = formatDate(committee.date).split('-');
        const [hours, minutes, seconds] = committee.time_start.split(':');
        const startTime = new Date(year, month - 1, day, hours, minutes, seconds);
        const currentTime = new Date();
        return currentTime - startTime;
    }, [committee.date, committee.time_start]);

    useEffect(() => {
        const interval = setInterval(() => {
            const elapsedTime = calculateTimeElapsed();
            setTimeElapsed(elapsedTime);
            setLoading(false);
        }, 1000);

        return () => clearInterval(interval);
    }, [calculateTimeElapsed]);

    const formatTimeElapsed = (milliseconds) => {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (milliseconds >= 0) {
            if (days > 0) {
                return `${days} day(s) ago`;
            } else if (hours > 0) {
                return `${hours} hour(s) ago`;
            } else if (minutes > 0) {
                return `${minutes} minute(s) ago`;
            } else {
                return `${seconds} second(s) ago`;
            }
        } else {
            if (days > 0) {
                return `${days} day(s)`;
            } else if (hours > 0) {
                return `${hours} hour(s)`;
            } else if (minutes > 0) {
                return `${minutes} minute(s)`;
            } else {
                return `${seconds} second(s)`;
            }
        }
    };

    const timeElapsedText = useMemo(() => {
        return !loading ? (timeElapsed >= 0 ? `Committee started ${formatTimeElapsed(timeElapsed)}` : `Committee starts in ${formatTimeElapsed(-timeElapsed)}`) : 'Loading...';
    }, [loading, timeElapsed, formatTimeElapsed]);

    return (
        <AuthenticatedLayout
            auth={auth}
        >
            <Head title="Archive Dossiers" />

            <div className="py-12">
                <h1 className='p-4 text-4xl'>Dashboard</h1>
                <div className="p-7 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className={`text-lg ${timeElapsed >= 0 ? 'text-red-500' : 'text-green-500'}`}>
                        {timeElapsedText}
                    </div>
                    <MemoizedMultiStepForm commitee={committee} />
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

const MemoizedMultiStepForm = React.memo(MultiStepForm);

export default CreatePV;

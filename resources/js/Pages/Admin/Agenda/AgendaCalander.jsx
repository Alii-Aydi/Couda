import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Calendar, Whisper, Popover } from 'rsuite';
import GroupIcon from '@mui/icons-material/Group';
import { useForm } from '@inertiajs/inertia-react';

import './AgendaCalander.css'
import 'rsuite/dist/rsuite-no-reset.min.css';

function getTodoList(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    // Combine year, month, and day to create a unique key for the date
    const dateKey = `${year}-${month}-${day}`;

    // Define your events based on the full date
    const events = {
        '2024-0-10': [
            { time: '10:30 am', title: 'Meeting' },
            { time: '12:00 pm', title: 'Lunch' }
        ],
        '2024-0-15': [
            { time: '09:30 pm', title: 'Products Introduction Meeting' },
            { time: '12:30 pm', title: 'Client entertaining' },
            { time: '02:00 pm', title: 'Product design discussion' },
            { time: '05:00 pm', title: 'Product test and acceptance' },
            { time: '06:30 pm', title: 'Reporting' },
            { time: '10:00 pm', title: 'Going home to walk the dog' }
        ],
        // Add more events as needed
    };

    // Return events for the given date, or an empty array if no events are found
    return events[dateKey] || [];
}


function renderCell(date) {
    const list = getTodoList(date);
    const displayList = list.filter((item, index) => index < 2);

    if (list.length) {
        const moreCount = list.length - displayList.length;
        const moreItem = (
            <li>
                <Whisper
                    placement="top"
                    trigger="click"
                    speaker={
                        <Popover>
                            {list.map((item, index) => (
                                <p key={index}>
                                    <b>{item.time}</b> - {item.title}
                                </p>
                            ))}
                        </Popover>
                    }
                >
                    <a className='text-blue-600'>{moreCount} more</a>
                </Whisper>
            </li>
        );

        return (
            <ul className="calendar-todo-list">
                {displayList.map((item, index) => (
                    <li key={index}>
                        <GroupIcon style={{ fontSize: 20, color: 'gray' }} /> <b>{item.time}</b> - {item.title}
                    </li>
                ))}
                {moreCount ? moreItem : null}
            </ul>
        );
    }

    return null;
}

export default function Dashboard({ auth }) {
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        title: '',
        period: 'AM' // Default value
    });

    const { date, time, title, period } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const { post } = useForm();

    const onSubmit = (e) => {
        e.preventDefault();
        // Post form data to your server using Inertia.js
        post(route('events.store'), formData);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <h1 className='p-4 text-4xl'>Agenda</h1>
                <div className="p-7 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <Calendar bordered renderCell={renderCell} cellClassName={date => (date.getDay() % 2 ? 'bg-gray' : undefined)} />
                </div>
                <div className="p-7 mt-4 bg-white dark:bg-gray-800 dark:text-white overflow-hidden shadow-sm sm:rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Add New Event</h2>
                    <form onSubmit={onSubmit}>
                        <div className="mb-4">
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={date}
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                                required
                            />
                        </div>
                        <div className="flex gap-4">
                            <div className="mb-4">
                                <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Time</label>
                                <input
                                    type="time"
                                    id="time"
                                    name="time"
                                    value={time}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="period" className="block text-sm font-medium text-gray-700 dark:text-gray-300">AM/PM</label>
                                <select
                                    id="period"
                                    name="period"
                                    value={period}
                                    onChange={handleChange}
                                    className="mt-1 p-2 pr-8 appearance-none border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                                    required
                                >
                                    <option value="AM">AM</option>
                                    <option value="PM">PM</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={title}
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                                required
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Add Event</button>
                    </form>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}

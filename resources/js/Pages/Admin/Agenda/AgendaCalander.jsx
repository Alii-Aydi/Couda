import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Calendar, Whisper, Popover } from 'rsuite';
import GroupIcon from '@mui/icons-material/Group';
import MemberSelectList from '@/Components/MembersSelectList';

import './AgendaCalander.css';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { useEffect } from 'react';

function getTodoList(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const dateKey = `${year}-${month}-${day}`;

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
    };

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

export default function AgendaCalander({ auth }) {
    const { data, setData, post, processing, errors, reset, progress } = useForm({
        date: '',
        time: '',
        title: '',
        members: []
    });

    const { date, time, title, members } = data;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        post('/dashboard/commitee');
    };

    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
            const formElement = document.getElementById('agendaForm');
            formElement.scrollIntoView({ behavior: 'smooth' });
        }
    }, [errors]);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Agenda" />

            <div className="py-12">
                <h1 className='p-4 text-4xl'>Agenda</h1>
                <div className="p-7 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <Calendar bordered renderCell={renderCell} cellClassName={date => (date.getDay() % 2 ? 'bg-gray' : undefined)} />
                </div>
                <div className="p-7 mt-4 bg-white dark:bg-gray-800 dark:text-white overflow-hidden shadow-sm sm:rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Add New Commitée Event</h2>
                    <form id='agendaForm' onSubmit={onSubmit}>
                        <div className="mb-4 flex-1">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={title}
                                onChange={handleChange}
                                className={`mt-1 p-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white w-full`}
                                style={{ width: '350px' }} // Set width to 350px
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                        </div>
                        <div className="flex gap-2">
                            <div className="mb-4">
                                <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={date}
                                    onChange={handleChange}
                                    className={`mt-1 p-2 border ${errors.date ? 'border-red-500' : 'border-gray-300'} dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white w-full`}
                                    style={{ width: '350px' }} // Set width to 350px
                                />
                                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                            </div>
                            <div className="mb-4 flex-1">
                                <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Time</label>
                                <input
                                    type="time"
                                    id="time"
                                    name="time"
                                    value={time}
                                    onChange={handleChange}
                                    className={`mt-1 p-2 border ${errors.time ? 'border-red-500' : 'border-gray-300'} dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white w-full`}
                                    style={{ width: '350px' }} // Set width to 350px
                                />
                                {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="members" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Members</label>
                            <MemberSelectList
                                selectedMembers={members}
                                setSelectedMembers={value => setData('members', value)}
                                style={{ width: '350px' }} // Set width to 350px
                            />
                            {errors.members && <p className="text-red-500 text-sm mt-1">{errors.members}</p>}
                        </div>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" disabled={processing}>Add Event</button>
                    </form>
                    {errors.error && <p className="text-red-500 text-sm mt-4">{errors.error}</p>}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
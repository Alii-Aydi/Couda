import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Calendar, Whisper, Popover } from 'rsuite';
import GroupIcon from '@mui/icons-material/Group';

import './AgendaCalander.css'
import 'rsuite/dist/rsuite-no-reset.min.css';

function getTodoList(date) {
    const day = date.getDate();

    switch (day) {
        case 10:
            return [
                { time: '10:30 am', title: 'Meeting' },
                { time: '12:00 pm', title: 'Lunch' }
            ];
        case 15:
            return [
                { time: '09:30 pm', title: 'Products Introduction Meeting' },
                { time: '12:30 pm', title: 'Client entertaining' },
                { time: '02:00 pm', title: 'Product design discussion' },
                { time: '05:00 pm', title: 'Product test and acceptance' },
                { time: '06:30 pm', title: 'Reporting' },
                { time: '10:00 pm', title: 'Going home to walk the dog' }
            ];
        default:
            return [];
    }
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
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <h1 className='p-4 text-4xl'>Dashboard</h1>
                <div className="p-7 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <Calendar bordered renderCell={renderCell} cellClassName={date => (date.getDay() % 2 ? 'bg-gray' : undefined)} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

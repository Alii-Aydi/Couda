import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Divider } from 'rsuite';

export default function ListProcesVerbaux({ auth, pvs }) {
    const [search, setSearch] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);

    const filteredPvs = pvs.filter(pv => {
        const pvDate = new Date(pv.created_at);
        return (
            pv.id.toString().includes(search) &&
            (!selectedDay || pvDate.getDate() === parseInt(selectedDay)) &&
            (!selectedMonth || pvDate.getMonth() + 1 === parseInt(selectedMonth)) &&
            (!selectedYear || pvDate.getFullYear() === parseInt(selectedYear))
        );
    });

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="ListProcesVerbaux" />

            <div className="py-12">
                <h1 className="p-4 text-4xl">Liste des Proces-Verbaux</h1>
                <div className="p-7 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <TextField
                            fullWidth
                            label="Rechercher par ID"
                            variant="outlined"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <FormControl fullWidth>
                            <InputLabel>Jour</InputLabel>
                            <Select
                                value={selectedDay}
                                onChange={(e) => setSelectedDay(e.target.value)}
                                label="Jour"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {days.map(day => (
                                    <MenuItem key={day} value={day}>{day}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel>Mois</InputLabel>
                            <Select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                label="Mois"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {months.map(month => (
                                    <MenuItem key={month} value={month}>{month}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel>Année</InputLabel>
                            <Select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                label="Année"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {years.map(year => (
                                    <MenuItem key={year} value={year}>{year}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    <ul className='mt-10'>
                        {filteredPvs.map(pv => {
                            const name = pv.pdf.replace(/\//g, ' ');
                            const fileUrl = `/files/${name}`;
                            return (
                                <li key={pv.id} className="flex items-center my-4 text-xl">
                                    <a
                                        href={fileUrl}
                                        className="flex items-center no-underline hover:underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img src="/imgs/pdf.png" className="w-10 mr-2" alt="PDF icon" />
                                        <p>Proces-verbal n° {pv.id}</p>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

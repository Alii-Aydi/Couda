import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Alert, AlertTitle, Grid, TextField, Button, Typography } from '@mui/material';
import { MdOutlineReportProblem } from 'react-icons/md';
import dayjs from 'dayjs';

const ResReclamations = ({ auth, reclamations }) => {
    const [filters, setFilters] = useState({
        fiscalFileId: '',
        date: '',
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const filteredReclamations = reclamations.filter((reclamation) => {
        const matchFiscalFileId = filters.fiscalFileId ? reclamation.fiscal_file_id.toString().includes(filters.fiscalFileId) : true;
        const matchDate = filters.date ? dayjs(reclamation.created_at).isSame(dayjs(filters.date), 'day') : true;
        return matchFiscalFileId && matchDate;
    });

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Responses Reclamations" />
            <div className="py-12">
                <h1 className="p-4 text-4xl">Responses Reclamations</h1>
                <div className="p-7 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">

                    {/* Filter Section */}
                    <div className="mb-6 flex space-x-4">
                        <TextField
                            label="Fiscal File ID"
                            variant="outlined"
                            name="fiscalFileId"
                            value={filters.fiscalFileId}
                            onChange={handleFilterChange}
                            className="w-1/2"
                        />
                        <TextField
                            label="Date"
                            variant="outlined"
                            type="date"
                            name="date"
                            value={filters.date}
                            onChange={handleFilterChange}
                            className="w-1/2"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>

                    <Grid container spacing={4}>
                        {filteredReclamations.map((reclamation) => (
                            <Grid item xs={12} key={reclamation.id}>
                                <Link href={`/dashboard/reclamation/details/${reclamation.id}`} className="no-underline">
                                    <Alert
                                        icon={<MdOutlineReportProblem className="text-xl" />}
                                        className="hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 transition duration-300 flex items-center"
                                    >
                                        <div className="flex flex-col">
                                            <AlertTitle className="text-gray-900 dark:text-white">
                                                Pour Dossier Fiscal N° {reclamation.fiscal_file_id}
                                            </AlertTitle>
                                            <Typography className="text-gray-600 dark:text-gray-300">
                                                {reclamation.sender_contact}
                                            </Typography>
                                        </div>
                                    </Alert>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ResReclamations;

import React from 'react';
import { Chart, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Line } from 'react-chartjs-2';
import { Card, CardContent, Grid } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

// Register the necessary components with Chart.js
Chart.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const Dashboard = ({ auth, committees, fiscalFiles }) => {
    const fiscalFilesCount = fiscalFiles.length;
    const committeesCount = committees.length;

    // Calculate the status counts
    const fiscalFilesStatusCount = {
        pending: fiscalFiles.filter(file => file.status === 'pending').length,
        approved: fiscalFiles.filter(file => file.status === 'approved').length,
        rejected: fiscalFiles.filter(file => file.status === 'rejected').length,
        delayed: fiscalFiles.filter(file => file.status === 'delayed').length,
    };

    const committeesStatusCount = {
        completed: committees.filter(committee => committee.status === 'completed').length,
        confirmed: committees.filter(committee => committee.status === 'confirmed').length,
        nonconfirmed: committees.filter(committee => committee.status === 'non-confirmed').length,
    };

    // Data for charts
    const fiscalFilesStatusData = {
        labels: ['En attend', 'Approuvé', 'Rejeté', 'Renvoiyé'],
        datasets: [{
            data: [
                fiscalFilesStatusCount.pending,
                fiscalFilesStatusCount.approved,
                fiscalFilesStatusCount.rejected,
                fiscalFilesStatusCount.delayed
            ],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40']
        }]
    };

    const committeesStatusData = {
        labels: ['Completé', 'Confirmé', 'Non-Confirmé'],
        datasets: [{
            data: [
                committeesStatusCount.completed,
                committeesStatusCount.confirmed,
                committeesStatusCount.nonconfirmed
            ],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
    };

    // Helper function to get the last 7 days' data
    const getLast7DaysData = (committees) => {
        const today = new Date();
        const days = [];
        const counts = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateString = date.toISOString().split('T')[0];
            days.push(dateString);
            counts.push(committees.filter(committee => committee.date.includes(dateString)).length);
        }
        return { days, counts };
    };

    const { days, counts } = getLast7DaysData(committees);

    const committeesPerDayData = {
        labels: days,
        datasets: [{
            label: 'Committees par Jour',
            data: counts,
            borderColor: '#3e95cd',
            fill: false
        }]
    };

    const optionsDoughnut = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const total = context.dataset.data.reduce((sum, value) => sum + value, 0);
                        const percentage = ((context.raw / total) * 100).toFixed(2) + '%';
                        return context.label + ': ' + context.raw + ' (' + percentage + ')';
                    }
                }
            },
            legend: {
                display: true,
                position: 'bottom'
            }
        }
    };

    const optionsLine = {
        plugins: {
            legend: {
                display: true,
                position: 'bottom'
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'jours'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Nombre de comités'
                }
            }
        }
    };

    return (
        <AuthenticatedLayout
            auth={auth}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <h1 className='p-4 text-4xl'>Tableau de bord</h1>
                <div className="p-7 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="container mx-auto p-4">
                        <Grid container spacing={3}>
                            {/* Number of fiscal files */}
                            <Grid item sm={6} xs={12}>
                                <Card className="mb-4">
                                    <CardContent>
                                        <h2 className="text-xl font-semibold">Nombre de dossiers fiscaux</h2>
                                        <p className="text-3xl font-bold">{fiscalFilesCount}</p>
                                    </CardContent>
                                </Card>
                                <Grid container spacing={2}>
                                    <Grid item xs={6} sm={3}>
                                        <Card className="bg-blue-100">
                                            <CardContent>
                                                <p className="text-sm font-semibold">En attente</p>
                                                <p className="text-lg">{fiscalFilesStatusCount.pending}</p>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Card className="bg-green-100">
                                            <CardContent>
                                                <p className="text-sm font-semibold">Approuvé</p>
                                                <p className="text-lg">{fiscalFilesStatusCount.approved}</p>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Card className="bg-red-100">
                                            <CardContent>
                                                <p className="text-sm font-semibold">Rejeté</p>
                                                <p className="text-lg">{fiscalFilesStatusCount.rejected}</p>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Card className="bg-yellow-100">
                                            <CardContent>
                                                <p className="text-sm font-semibold">Retardé</p>
                                                <p className="text-lg">{fiscalFilesStatusCount.delayed}</p>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>

                            {/* Number of committees */}
                            <Grid item sm={6} xs={12}>
                                <Card className="mb-4">
                                    <CardContent>
                                        <h2 className="text-xl font-semibold">Nombre de comités</h2>
                                        <p className="text-3xl font-bold">{committeesCount}</p>
                                    </CardContent>
                                </Card>
                                <Grid container spacing={2}>
                                    <Grid item xs={6} sm={4}>
                                        <Card className="bg-green-100">
                                            <CardContent>
                                                <p className="text-sm font-semibold">Completé</p>
                                                <p className="text-lg">{committeesStatusCount.completed}</p>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={6} sm={4}>
                                        <Card className="bg-blue-100">
                                            <CardContent>
                                                <p className="text-sm font-semibold">Confirmé</p>
                                                <p className="text-lg">{committeesStatusCount.confirmed}</p>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={6} sm={4}>
                                        <Card className="bg-yellow-100">
                                            <CardContent>
                                                <p className="text-sm font-semibold">Non-Confirmé</p>
                                                <p className="text-lg">{committeesStatusCount.nonconfirmed}</p>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>

                            {/* Doughnut chart for fiscal files status */}
                            <Grid item xs={12} sm={6}>
                                <Card>
                                    <CardContent className='w-full'>
                                        <div className="relative h-96">
                                            <Doughnut data={fiscalFilesStatusData} options={optionsDoughnut} />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>

                            {/* Doughnut chart for committee status */}
                            <Grid item xs={12} sm={6}>
                                <Card>
                                    <CardContent className='w-full'>
                                        <div className="relative h-96">
                                            <Doughnut data={committeesStatusData} options={optionsDoughnut} />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>

                            {/* Line chart for committees per day */}
                            <Grid item xs={12}>
                                <Card>
                                    <CardContent>
                                        <div className="relative" style={{ height: "33rem" }}>
                                            <Line data={committeesPerDayData} options={optionsLine} />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Dashboard;

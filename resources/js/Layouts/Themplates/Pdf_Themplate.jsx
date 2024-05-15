import React from 'react';
import { Paper, Typography, Divider } from '@mui/material';
import formatDate from '@/Utils/formatDate';

const MeetingMinutesPDF = ({ commitee, absences, attende, formData, newReports, time }) => {

    return (
        <Paper elevation={3} className="p-8 space-y-4 flex flex-col"> {/* Use Paper component with elevation and padding */}
            <Typography variant="h4" component="h1" className="text-xl font-bold">Procès-verbal de la {commitee.id}e séance</Typography>
            <Typography variant="body1" className="text-lg">Ministère des Finances, Tunisie</Typography>
            <Typography variant="body1" className="text-lg">{formatDate(commitee.date)}, {commitee.time_start}</Typography>
            <Divider /> {/* Add a divider between sections */}
            <Typography variant="h5" component="h2" className="text-lg font-bold">Présents :</Typography>
            <ul className="list-disc ml-6">
                {attende.map((attendee, index) => <Typography key={index} variant="body2" component="li">{attendee}</Typography>)}
            </ul>
            <Divider />
            <Typography variant="h5" component="h2" className="text-lg font-bold">Absents :</Typography>
            {absences.length > 0 ? (
                <ul className="list-disc ml-6">
                    {absences.map((absentee, index) => <Typography key={index} variant="body2" component="li">{absentee}</Typography>)}
                </ul>
            ) : (
                <Typography variant="body2" className="italic text-gray-500">Aucune absence</Typography>
            )}
            <Divider />
            <Typography variant="h5" component="h2" className="text-lg font-bold">Ouverture de la séance :</Typography>
            <div className="flex">
                <Typography variant="body1">La séance est ouverte à {time}, avec président(e) M. {formData.president}</Typography>
            </div>
            <Typography variant="body1">{formData.ouverture}</Typography>
            {newReports.map((report, index) => (
                <div key={index} className="mb-4">
                    <h3 className='mt-2'>Section N°{index + 1} :</h3>
                    <Typography variant="body1">Titre: {report.name}</Typography>
                    <Typography variant="body1">Description: {report.description}</Typography>
                </div>
            ))}
            <Divider />
            <Typography variant="h5" component="h2" className="text-lg font-bold">Clôture de la séance :</Typography>
            <Typography variant="body1">{formData.cloture}</Typography>
            <Divider />
            <div className="mt-auto self-end p-10">Signature</div>
        </Paper>
    );
};

export default MeetingMinutesPDF;

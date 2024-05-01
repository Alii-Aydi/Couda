import React, { useState } from 'react';
import { Paper, Typography, Divider, Select, MenuItem, TextField } from '@mui/material';
import formatDate from '@/Utils/formatDate';
import { useEffect } from 'react';

const MeetingMinutes = ({ commitee, absences, attende }) => {
    const [president, setPresident] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        setTime(new Date().toLocaleTimeString())
    }, [])


    const handlePresidentChange = (event) => {
        setPresident(event.target.value);
    };

    return (
        <Paper elevation={3} className="p-8 space-y-4"> {/* Use Paper component with elevation and padding */}
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
                <Typography variant="body1">La séance est ouverte à {time}, avec president(e) M. </Typography>
                <Select
                    value={president}
                    onChange={handlePresidentChange}
                    displayEmpty
                    fullWidth
                    variant="outlined"
                    sx={{ width: '120px', mt: '-10px', height: '50px' }} // Adjust the width of the Select component
                >
                    <MenuItem value="" disabled>
                        Sélectionner le président
                    </MenuItem>
                    {attende.map((attendee, index) => (
                        <MenuItem key={index} value={attendee}>{attendee}</MenuItem>
                    ))}
                </Select>
            </div>
            <TextField
                id="outlined-multiline-flexible"
                label="Notes"
                multiline
                fullWidth
                rows={4}
                variant="outlined"
            />
        </Paper>
    );
};

export default MeetingMinutes;

import React, { useState, useEffect } from 'react';
import { Paper, Typography, Divider, Select, MenuItem, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Cancel';
import formatDate from '@/Utils/formatDate';

const MeetingMinutes = ({ commitee, absences, attende, formData, setFormData, newReports, setNewReports, reportErrors, formErrors, time, setTime }) => {
    const [president, setPresident] = useState(null);
    const [showAddReportField, setShowAddReportField] = useState(false);

    useEffect(() => {
        setTime(new Date().toLocaleTimeString());
    }, []);

    const handleReportAdd = () => {
        setShowAddReportField(true); // Show the new report fields when the button is clicked
        setNewReports([...newReports, { name: '', description: '' }]);
    };

    const handleReportDelete = (index) => {
        const updatedReports = [...newReports];
        updatedReports.splice(index, 1);
        setNewReports(updatedReports);
    };

    const handleReportChange = (index, field, value) => {
        const updatedReports = [...newReports];
        updatedReports[index][field] = value;
        setNewReports(updatedReports);
    };

    const handlePresidentChange = (event) => {
        const selectedPresident = event.target.value;
        setPresident(selectedPresident);
        setFormData({ ...formData, presedent: selectedPresident.name });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <Paper elevation={3} className="p-8 space-y-4 flex flex-col"> {/* Use Paper component with elevation and padding */}
            <Typography variant="h4" component="h1" className="text-xl font-bold">Procès-verbal de la {commitee.id}e séance</Typography>
            <Typography variant="body1" className="text-lg">Ministère des Finances, Tunisie</Typography>
            <Typography variant="body1" className="text-lg">{formatDate(commitee.date)}, {commitee.time_start}</Typography>
            <Divider /> {/* Add a divider between sections */}
            <Typography variant="h5" component="h2" className="text-lg font-bold">Présents :</Typography>
            <ul className="list-disc ml-6">
                {attende.map((attendee, index) => {
                    const name = attendee.signature.replace(/\//g, ' ');
                    const fileUrl = `/files/${name}`;
                    return (
                        <Typography key={index} variant="body2" component="li" className='justify-between w-1/2' style={{ display: 'flex', alignItems: 'center' }}>
                            {attendee.name}
                            <span style={{ marginLeft: '8px' }}>
                                <img src={fileUrl} alt="signature" style={{ width: '64px', height: '32px' }} />
                            </span>
                        </Typography>
                    );
                })}
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
                <Typography variant="body1">La séance est ouverte à {time}, avec président(e) M. </Typography>
                <Select
                    value={president}
                    onChange={handlePresidentChange}
                    displayEmpty
                    fullWidth
                    variant="outlined"
                    sx={{ width: '120px', mt: '-10px', height: '50px' }} // Adjust the width of the Select component
                    error={formErrors.presedent}
                    renderValue={(selected) => selected ? selected.name : 'Sélectionner le président'}
                >
                    <MenuItem value="" disabled>
                        Sélectionner le président
                    </MenuItem>
                    {attende.map((attendee, index) => (
                        <MenuItem key={index} value={attendee}>{attendee.name}</MenuItem>
                    ))}
                </Select>
            </div>
            <TextField
                id="ouverture"
                name="ouverture"
                label="Ouverture"
                multiline
                fullWidth
                rows={4}
                variant="outlined"
                value={formData.ouverture}
                onChange={handleChange}
                error={formErrors.ouverture}
                helperText={formErrors.ouverture ? 'Ouverture est obligatoire' : ''}
            />
            {showAddReportField && newReports.map((report, index) => (
                <div key={index} className="mb-4 relative">
                    <h3 className='mt-2'>Section N°{index + 1} :</h3>
                    <TextField
                        label="Titre"
                        variant="outlined"
                        fullWidth
                        value={report.name}
                        onChange={(event) => handleReportChange(index, 'name', event.target.value)}
                        style={{ marginTop: '0.5rem' }}
                        error={reportErrors[index]?.name}
                        helperText={reportErrors[index]?.name ? 'Le titre ne peut pas être vide' : ''}
                    />
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={report.description}
                        onChange={(event) => handleReportChange(index, 'description', event.target.value)}
                        style={{ marginTop: '0.5rem' }}
                        error={reportErrors[index]?.description}
                        helperText={reportErrors[index]?.description ? 'Section ne peut pas être vide' : ''}
                    />
                    <button
                        type="button"
                        onClick={() => handleReportDelete(index)}
                        className="absolute top-0 right-0 bg-transparent text-red-500 hover:text-white dark:text-gray-600 dark:hover:text-white p-1 rounded-full"
                    >
                        <DeleteIcon />
                    </button>
                </div>
            ))}
            <div className="flex items-center mt-3">
                <button type="button" onClick={handleReportAdd} className="bg-indigo-500 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded mr-2">
                    <AddIcon /> Ajouter une section
                </button>
            </div>
            <Divider />
            <Typography variant="h5" component="h2" className="text-lg font-bold">Clôture de la séance :</Typography>
            <TextField
                id="cloture"
                name="cloture"
                label="Clôture"
                multiline
                fullWidth
                rows={4}
                variant="outlined"
                value={formData.cloture}
                onChange={handleChange}
                error={formErrors.cloture}
                helperText={formErrors.cloture ? 'Clôture est obligatoire' : ''}
            />
            <Divider />
            <div className="mt-auto self-end p-10">
                {president ? (
                    <img src={`/files/${president.signature.replace(/\//g, ' ')}`} alt="signature" style={{ width: '64px', height: '32px' }} />
                ) : <p>Signature</p>
                }
            </div>
        </Paper>
    );
};

export default MeetingMinutes;

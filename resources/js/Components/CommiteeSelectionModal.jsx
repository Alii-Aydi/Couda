import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Select, MenuItem, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Group } from '@mui/icons-material';
import formatDate from '@/Utils/formatDate';

function BigModal({ isOpen, onClose, handleConfirm, selectedCommittee, setSelectedCommittee, error }) {
    const [committees, setCommittees] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        fetchCommittees();
    }, []);

    const fetchCommittees = async () => {
        try {
            const response = await fetch('/dashboard/commitee/list'); // Adjust the endpoint accordingly
            const data = await response.json();
            setCommittees(data);
        } catch (error) {
            console.error('Error fetching committees:', error);
        }
    };

    const handleChange = (event) => {
        setSelectedCommittee(event.target.value);
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth style={{ padding: '20px' }}>
            <DialogTitle className={theme.palette.mode === 'dark' ? 'bg-gray-800 text-white' : ''}>Attribue a une commitee</DialogTitle>
            <DialogContent>
                <Typography variant="body1" className="py-4">Les dossier fiscal selectioner va etre attribuer a la commitee selectioner pour les analyser.</Typography>
                <Select
                    value={selectedCommittee}
                    onChange={handleChange}
                    fullWidth
                    displayEmpty
                    inputProps={{ 'aria-label': 'Select committee' }}
                >
                    <MenuItem value="" disabled>
                        <em>Select Committee</em>
                    </MenuItem>
                    {committees.map(committee => (
                        <MenuItem key={committee.id} value={committee.id}>
                            <Group className="mr-2" />
                            <span>{committee.title} - {formatDate(committee.date)} - {committee.time_start}</span>
                        </MenuItem>
                    ))}
                </Select>
                {error && <p className="text-red-500 text-sm mt-1">Selectioner use commitee pour continue!</p>}
                <div className="flex justify-end mt-4 gap-2">
                    <Button variant="contained" color="error" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="success" onClick={handleConfirm}>
                        Confirm
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default BigModal;

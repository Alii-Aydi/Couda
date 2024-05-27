import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

function WarningModal({ isOpen, onClose }) {
    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth>
            <DialogTitle className="flex items-center justify-center">
                <WarningIcon className="text-orange-500 mr-2" />
                Avertissement
            </DialogTitle>
            <DialogContent className="p-4">
                <Typography variant="body1" className="text-center">Sauf les dossiers non traités sont acceptés.</Typography>
                <div className="flex justify-center mt-4">
                    <Button variant="contained" color="primary" onClick={onClose}>
                        OK
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default WarningModal;

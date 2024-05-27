import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, action }) => {
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Confirm {action == 'Archiver' ? 'Archival' : 'Restoration'} </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Êtes-vous sûr de vouloir {action.toLowerCase()} le ou les éléments sélectionnés?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>No</Button>
                <Button onClick={onConfirm} autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationModal
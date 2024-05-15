import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/Note';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Inertia } from '@inertiajs/inertia';

const Infra = ({ auth }) => {
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [selectedContactId, setSelectedContactId] = useState(null);
    const [isConfirmationOpen, setConfirmationOpen] = useState(false);

    useEffect(() => {
        // Fetch contacts from the API
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await fetch('/dashboard/contacts');
            const data = await response.json();
            if (response.ok) {
                setContacts(data.contacts);
            } else {
                console.error('Failed to fetch contacts:', data.message);
            }
        } catch (error) {
            console.error('An error occurred while fetching contacts:', error);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleEdit = (id) => {
        Inertia.visit(`/dashboard/contacts/${id}/edit`)
    };

    const handleDeleteConfirmation = (id) => {
        setSelectedContactId(id);
        setConfirmationOpen(true);
    };

    const handleDelete = async () => {
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            const response = await fetch(`/dashboard/contacts/${selectedContactId}/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setSnackbarMessage('Contact deleted successfully.');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                fetchContacts();
            } else {
                setSnackbarMessage(data.message || 'Failed to delete contact.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error('An error occurred while deleting contact:', error);
            setSnackbarMessage('An error occurred. Please try again later.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        } finally {
            setConfirmationOpen(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Infrastructure" />
            <div className="py-12">
                <h1 className="p-4 text-4xl">Infrastructure</h1>
                <div className="p-7 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="flex flex-col">
                        <div className="flex justify-between">
                            <h1 className="p-4 text-4xl">Contacts</h1>
                            <TextField
                                label="Search by Name"
                                variant="outlined"
                                className="ml-4"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                        <TableContainer component={Paper} className="mt-4">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Phone 1</TableCell>
                                        <TableCell>Phone 2</TableCell>
                                        <TableCell>Location</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {contacts
                                        .filter((contact) =>
                                            contact.name.toLowerCase().includes(searchTerm.toLowerCase())
                                        )
                                        .map((contact) => (
                                            <TableRow key={contact.id}>
                                                <TableCell>{contact.name}</TableCell>
                                                <TableCell>{contact.email}</TableCell>
                                                <TableCell>{contact.phone1}</TableCell>
                                                <TableCell>{contact.phone2}</TableCell>
                                                <TableCell>{contact.location}</TableCell>
                                                <TableCell>
                                                    <EditIcon
                                                        className='cursor-pointer mr-2'
                                                        color="primary"
                                                        onClick={() => handleEdit(contact.id)}
                                                    />
                                                    <DeleteIcon
                                                        className='cursor-pointer ml-2'
                                                        color="error"
                                                        onClick={() => handleDeleteConfirmation(contact.id)}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={6000}
                        onClose={handleCloseSnackbar}
                    >
                        <MuiAlert
                            elevation={6}
                            variant="filled"
                            onClose={handleCloseSnackbar}
                            severity={snackbarSeverity}
                        >
                            {snackbarMessage}
                        </MuiAlert>
                    </Snackbar>
                    <Divider className='py-5' />
                    <Button
                        variant="contained"
                        color="primary"
                        href="/dashboard/contacts/add"
                        className="ml-4"
                        startIcon={<PersonAddIcon />}
                        sx={{ mt: 5 }}
                    >
                        Add Contact
                    </Button>
                    <Dialog open={isConfirmationOpen} onClose={() => setConfirmationOpen(false)}>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Êtes-vous sûr de vouloir supprimer ce contact ?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setConfirmationOpen(false)} color="primary">
                                Annuler
                            </Button>
                            <Button onClick={handleDelete} color="secondary" autoFocus>
                                Supprimer
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Infra;

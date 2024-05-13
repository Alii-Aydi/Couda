import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Avatar, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Divider } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

export default function UserManegment({ auth }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Settings" />
            <div className="py-12">
                <h1 className='p-4 text-4xl'>Parametre</h1>
                <div className="p-7 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Photo</TableCell>
                                    <TableCell>Nom</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>CIN</TableCell>
                                    <TableCell>Role</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => {
                                    const name = user.profile_pic?.replace(/\//g, ' ');
                                    const fileUrl = `/files/${name}`;
                                    return (
                                        <TableRow key={user.id}>
                                            <TableCell>
                                                <Avatar alt={user.name} src={fileUrl} />
                                            </TableCell>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.cin}</TableCell>
                                            <TableCell>{user.roles[0].name}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Divider className='py-5'></Divider>
                    <div className="pt-5">
                        <Button
                            variant="contained"
                            color="primary"
                            href="/register"
                            className="ml-4 mb-4"
                        >
                            Ajouter Nouveau Utilisateur
                        </Button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

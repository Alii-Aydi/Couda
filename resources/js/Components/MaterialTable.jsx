import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Button, MenuItem } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { useState, useEffect, useMemo } from 'react';
import { Link } from '@mui/material';
import getFileIcon from '@/Utils/getFileIcon';
import { Inertia } from '@inertiajs/inertia';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid';
import { Archive } from '@mui/icons-material';

export default function MaterialTable({ auth }) {
    const [data, setData] = useState([]);
    const [userNames, setUserNames] = useState({});

    useEffect(() => {
        fetch('/dashboard/fiscalFiles')
            .then(response => response.json())
            .then(data => {
                setData(data.data);
                const userIds = [...new Set(data.data.map(item => item.created_by))];
                userIds.forEach(id => {
                    fetch(`/users/${id}`)
                        .then(response => response.json())
                        .then(userData => {
                            setUserNames(prevNames => ({ ...prevNames, [id]: userData.name }));
                        })
                        .catch(error => console.error(`Error fetching user ${id}:`, error));
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleArchiveSelected = async (selectedRowIds) => {
        const archivePromises = Object.keys(selectedRowIds).map(id => {
            const row = data.find(row => row.id.toString() === id);
            if (!row) return null;
            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            return fetch(`/dashboard/fiscalFiles/${row.id}/archive`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
            });
        });

        try {
            await Promise.all(archivePromises);
            console.info('All selected records archived successfully');
            // Optionally, refresh the data here
        } catch (error) {
            console.error('Error archiving records:', error);
        }
    };


    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
                size: 10,
            },
            {
                accessorKey: 'name',
                header: 'Name',
                size: 10,
            },
            {
                accessorKey: 'cin_or_fiscal_number',
                header: 'CIN/Fiscal No.',
                size: 10,
            },
            {
                accessorKey: 'taxation_date',
                header: 'Taxation Date',
                size: 10,
            },
            {
                accessorKey: 'tax_center',
                header: 'Tax Center',
                size: 10,
            },
            {
                accessorKey: 'tax_amount',
                header: 'Tax Amount',
                size: 10,
            },
            {
                accessorKey: 'theme',
                header: 'Theme',
                size: 10,
            },
            {
                accessorKey: 'issuing_organism',
                header: 'Issuing Org.',
                size: 10,
            },
            {
                accessorKey: 'delivery_date_to_admin',
                header: 'Delivery Date',
                size: 10,
            },
            {
                accessorKey: 'receipt_date',
                header: 'Receipt Date',
                size: 10,
            },
            {
                accessorKey: 'report',
                header: 'Center Report',
                Cell: ({ cell }) => {
                    let filename = cell.getValue();
                    filename = filename.replace(/\//g, ' ');
                    const fileUrl = `/files/${filename}`;
                    const Icon = getFileIcon(filename);

                    return (
                        <Link href={fileUrl} target="_blank" rel="noopener noreferrer" title="Download or view file">
                            {Icon}
                        </Link>
                    );
                },
                size: 10,
                enableSorting: false,
            },
            {
                accessorKey: 'created_by',
                header: 'Created By',
                Cell: ({ cell }) => userNames[cell.getValue()] || 'Loading...',
                size: 10,
            },
        ],
        [userNames],
    );

    //console.log(data)

    const table = useMaterialReactTable({
        columns,
        data,
        enableSorting: true,
        enableRowActions: true,
        enableRowSelection: true,
        renderRowActionMenuItems: ({ row }) => [
            <MenuItem key="edit" onClick={() => handleEdit(row.original.id)}>
                <div className='flex'><PencilSquareIcon className='h-5 pr-2 text-green-500'></PencilSquareIcon>Edit</div>
            </MenuItem>,
            <MenuItem key="delete" onClick={() => handleDelete(row.original.id)}>
                <div className='flex'><Archive className='h-5 pr-2 text-gray-500'></Archive> Archiver</div>
            </MenuItem>,
        ],
        renderTopToolbarCustomActions: ({ table }) => {
            const rowSelection = table.getState().rowSelection;
            const selectedRows = table.getSelectedRowModel().rows;
            if (selectedRows.length > 0) {
                return (
                    <button
                        onClick={() => handleArchiveSelected(selectedRows.reduce((acc, row) => {
                            acc[row.original.id] = true;
                            return acc;
                        }, {}))}
                        className="flex items-center justify-center px-4 py-2 bg-gray-500 hover:bg-gray-300 text-white dark:bg-gray-900 dark:hover:bg-gray-500 transition-colors duration-150 rounded-lg focus:outline-none focus:shadow-outline"
                    >
                        <Archive className="h-5 w-5 mr-2" />
                        Archive
                    </button>
                );
            }
            return null;
        },
    });

    const handleEdit = (id) => {
        console.info(`Edit ID: ${id}`);
        Inertia.visit(`/dashboard/fiscalFiles/edit/${id}`, {
            method: 'get',
        });
    };

    const handleDelete = (id) => {
        console.info(`Delete ID: ${id}`)
        fetch(`/api/records/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    console.info('Record deleted successfully');
                    setData(data.filter(item => item.id !== id));
                }
            })
            .catch(error => console.error('Error deleting record:', error));
    };


    return (
        <MaterialReactTable
            table={table}
        />
    );
}

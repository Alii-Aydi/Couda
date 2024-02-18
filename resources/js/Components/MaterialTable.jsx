import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { MenuItem } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { useState, useEffect, useMemo } from 'react';
import { Link } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Inertia } from '@inertiajs/inertia';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid';

export default function MaterialTable({ auth }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/dashboard/fiscalFiles')
            .then(response => response.json())
            .then(data => setData(data.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // Helper function to determine the icon based on the file extension
    const getFileIcon = (filePath) => {
        if (filePath.endsWith('.pdf')) {
            return <PictureAsPdfIcon />;
        } else if (filePath.match(/\.(jpeg|jpg|gif|png)$/)) {
            return <ImageIcon />;
        } else if (filePath.match(/\.(csv|xlsx|xls)$/)) {
            return <DescriptionIcon />;
        } else if (filePath.endsWith('none')) {
            return ''
        } else {
            return <DescriptionIcon />; // Fallback icon
        }
    };


    const columns = useMemo(
        () => [
            {
                accessorKey: 'name',
                header: 'Name',
                size: 100,
            },
            {
                accessorKey: 'cin_or_fiscal_number',
                header: 'CIN/Fiscal No.',
                size: 120,
            },
            {
                accessorKey: 'taxation_date',
                header: 'Taxation Date',
                size: 110,
            },
            {
                accessorKey: 'tax_center',
                header: 'Tax Center',
                size: 120,
            },
            {
                accessorKey: 'tax_amount',
                header: 'Tax Amount',
                size: 90,
            },
            {
                accessorKey: 'theme',
                header: 'Theme',
                size: 100,
            },
            {
                accessorKey: 'issuing_organism',
                header: 'Issuing Org.',
                size: 120,
            },
            {
                accessorKey: 'delivery_date_to_admin',
                header: 'Delivery Date',
                size: 110,
            },
            {
                accessorKey: 'receipt_date',
                header: 'Receipt Date',
                size: 110,
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
                size: 90,
                enableSorting: false,
            },
        ],
        [],
    );

    //console.log(data)

    const table = useMaterialReactTable({
        columns,
        data,
        enableSorting: true,
        enableRowActions: true,
        renderRowActionMenuItems: ({ row }) => [
            <MenuItem key="edit" onClick={() => handleEdit(row.original.id)}>
                <div className='flex'><PencilSquareIcon className='h-5 pr-2 text-indigo-500'></PencilSquareIcon>Edit</div>
            </MenuItem>,
            <MenuItem key="delete" onClick={() => handleDelete(row.original.id)}>
                <div className='flex'><TrashIcon className='h-5 pr-2 text-red-500'></TrashIcon> Delete</div>
            </MenuItem>,
        ],
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

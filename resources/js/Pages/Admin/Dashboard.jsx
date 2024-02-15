import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { MenuItem } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { useState, useEffect, useMemo } from 'react';
import { Link } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description'; // Generic icon for Excel/CSV

export default function Dashboard({ auth }) {
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
        } else {
            return <DescriptionIcon />; // Fallback icon
        }
    };


    const columns = useMemo(
        () => [
            {
                accessorKey: 'name',
                header: 'Name',
                size: 100, // Reduced size for name, assuming short names
            },
            {
                accessorKey: 'cin_or_fiscal_number',
                header: 'CIN/Fiscal No.',
                size: 120, // Slightly reduced, compact abbreviation
            },
            {
                accessorKey: 'taxation_date',
                header: 'Taxation Date',
                size: 110, // Dates can be compact if formatted as YYYY-MM-DD
            },
            {
                accessorKey: 'tax_center',
                header: 'Tax Center',
                size: 120, // Assuming tax center names are not overly long
            },
            {
                accessorKey: 'tax_amount',
                header: 'Tax Amount',
                size: 90, // Numbers can be quite compact, especially if not too large
            },
            {
                accessorKey: 'theme',
                header: 'Theme',
                size: 100, // Reduced, assuming short theme names
            },
            {
                accessorKey: 'issuing_organism',
                header: 'Issuing Org.',
                size: 120, // Abbreviated to save space
            },
            {
                accessorKey: 'delivery_date_to_admin',
                header: 'Delivery Date',
                size: 110, // Compact date format
            },
            {
                accessorKey: 'receipt_date',
                header: 'Receipt Date',
                size: 110, // Compact date format
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
            },
        ],
        [],
    );

    console.log(data)

    const table = useMaterialReactTable({
        columns,
        data,
        enableRowActions: true,
        renderRowActionMenuItems: ({ row }) => [
            <MenuItem key="edit" onClick={() => console.info('Edit')}>
                Edit
            </MenuItem>,
            <MenuItem key="delete" onClick={() => console.info('Delete')}>
                Delete
            </MenuItem>,
        ],
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <h1 className='p-4 text-4xl'>Dashboard</h1>
                <div className="p-7 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <MaterialReactTable
                        table={table} //only pass in table instead of all table options
                    />
                </div>

            </div>
        </AuthenticatedLayout>
    );
}

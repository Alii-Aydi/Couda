import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { useState, useEffect, useMemo } from 'react';
import { Link } from '@mui/material';
import getFileIcon from '@/Utils/getFileIcon';
export default function MaterialLogsTable({ auth }) {
    const [data, setData] = useState([]);
    const [userNames, setUserNames] = useState({});

    useEffect(() => {
        fetch('/dashboard/fiscalFilesLogsAll')
            .then(response => response.json())
            .then(data => {
                setData(data.data);
                const userIds = [...new Set(data.data.map(item => item.updated_by))];
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

    const columns = useMemo(
        () => [
            {
                accessorKey: 'fiscal_file_id',
                header: 'ID',
                size: 10,
            },
            {
                accessorKey: 'created_at',
                header: 'Updated At',
                Cell: ({ cell }) => new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                }).format(new Date(cell.getValue())),
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
                accessorKey: 'updated_by',
                header: 'Updated By',
                Cell: ({ cell }) => userNames[cell.getValue()] || 'Loading...',
                size: 10,
            },
        ],
        [userNames],
    );

    console.log(userNames)

    //console.log(data)

    const table = useMaterialReactTable({
        columns,
        data,
        enableSorting: true,
        enableRowSelection: true,
    });


    return (
        <MaterialReactTable
            table={table}
            style={{ maxWidth: '100vw' }}
        />
    );
}

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
                header: 'File ID',
                size: 10,
            },
            {
                accessorKey: 'created_at',
                header: 'Logged At',
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
                accessorKey: 'actions',
                header: 'Action',
                size: 10,
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

    const table = useMaterialReactTable({
        columns,
        data,
        enableSorting: true,
    });


    return (
        <MaterialReactTable
            table={table}
        />
    );
}

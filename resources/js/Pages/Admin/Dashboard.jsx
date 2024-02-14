import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { MenuItem } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { useMemo } from 'react';

const data = [
    {
        name: {
            firstName: 'John',
            lastName: 'Doe',
        },
        address: '261 Erdman Ford',
        city: 'East Daphne',
        state: 'Kentucky',
    },
    {
        name: {
            firstName: 'Jane',
            lastName: 'Doe',
        },
        address: '769 Dominic Grove',
        city: 'Columbus',
        state: 'Ohio',
    },
    {
        name: {
            firstName: 'Joe',
            lastName: 'Doe',
        },
        address: '566 Brakus Inlet',
        city: 'South Linda',
        state: 'West Virginia',
    },
    {
        name: {
            firstName: 'Kevin',
            lastName: 'Vandy',
        },
        address: '722 Emie Stream',
        city: 'Lincoln',
        state: 'Nebraska',
    },
    {
        name: {
            firstName: 'Joshua',
            lastName: 'Rolluffs',
        },
        address: '32188 Larkin Turnpike',
        city: 'Charleston',
        state: 'South Carolina',
    },
];

export default function Dashboard({ auth }) {

    //should be memoized or stable
    const columns = useMemo(
        () => [
            {
                accessorKey: 'name.firstName', //access nested data with dot notation
                header: 'First Name',
                size: 150,
            },
            {
                accessorKey: 'name.lastName',
                header: 'Last Name',
                size: 150,
            },
            {
                accessorKey: 'address', //normal accessorKey
                header: 'Address',
                size: 200,
            },
            {
                accessorKey: 'city',
                header: 'City',
                size: 150,
            },
            {
                accessorKey: 'state',
                header: 'State',
                size: 150,
            },
        ],
        [],
    );

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

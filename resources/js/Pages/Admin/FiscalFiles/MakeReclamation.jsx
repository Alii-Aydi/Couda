import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Cancel';
import { Inertia } from '@inertiajs/inertia';

const MakeReclamation = ({ auth, file }) => {
    const { data, setData } = useForm({
        name: false,
        cin_or_fiscal_number: false,
        taxation_date: false,
        tax_center: false,
        tax_amount: false,
        theme: false,
        issuing_organism: false,
        delivery_date_to_admin: false,
        receipt_date: false,
    });

    const [reasons, setReasons] = useState({});
    const [showAddReportField, setShowAddReportField] = useState(false);
    const [newReports, setNewReports] = useState([]);
    const [reportErrors, setReportErrors] = useState([]);

    const handleCheckboxChange = (key) => {
        setData(key, !data[key]);
        setReasons({ ...reasons, [key]: 'missing' });

        if (!data[key]) {
            delete reasons[key];
        }
    };

    const handleReasonChange = (key, reason) => {
        setReasons({ ...reasons, [key]: reason });
    };

    const handleReportAdd = () => {
        setShowAddReportField(true); // Show the new report fields when the button is clicked
        setNewReports([...newReports, { name: '', description: '' }]);
    };

    const handleReportDelete = (index) => {
        const updatedReports = [...newReports];
        updatedReports.splice(index, 1);
        setNewReports(updatedReports);
    };


    const handleReportChange = (index, field, value) => {
        const updatedReports = [...newReports];
        updatedReports[index][field] = value;
        setNewReports(updatedReports);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validation for newReports
        const errors = newReports.map(report => ({
            name: report.name.trim().length === 0,
            description: report.description.trim().length < 3
        }));

        setReportErrors(errors);

        if (errors.some(error => error.name || error.description)) {
            return;
        }

        console.log('Form submitted:', data, reasons, newReports);
        Inertia.post(`/dashboard/fiscalFiles/${file.id}/reclamation`, { data, reasons, newReports });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Make Reclamation" />

            <div className="py-12">
                <h1 className='p-4 text-4xl'>Make Reclamation</h1>
                <div className="p-7 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-2/5 md:pr-4">
                                <Typography variant="h4" gutterBottom className="dark:text-white mb-3">Select the relevant attributes:</Typography>
                                {Object.keys(data).map(key => {
                                    if (['id', 'created_at', 'updated_at', 'reports', 'archived'].includes(key)) {
                                        return null;
                                    }
                                    return (
                                        <div key={key} className="mb-4">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={data[key]}
                                                        onChange={() => handleCheckboxChange(key)}
                                                        color="primary"
                                                    />
                                                }
                                                label={key}
                                            />
                                            {data[key] && (
                                                <TextField
                                                    id={`reason-${key}`}
                                                    variant="outlined"
                                                    fullWidth
                                                    value={reasons[key] || ''}
                                                    onChange={(event) => handleReasonChange(key, event.target.value)}
                                                    className="mt-2"
                                                    select
                                                    SelectProps={{
                                                        native: true,
                                                    }}
                                                >
                                                    <option value="missing">Missing</option>
                                                    <option value="wrong">Wrong</option>
                                                    <option value="doubtful">Doubtful</option>
                                                </TextField>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="w-full md:w-3/5 md:pl-7 md:border-l md:border-gray-300">
                                <Typography variant="h4" gutterBottom className="dark:text-white mb-3">Demander reports:</Typography>
                                {showAddReportField && newReports.map((report, index) => (
                                    <div key={index} className="mb-4 relative">
                                        <h3 className='mt-2'>Demande report {index + 1} :</h3>
                                        <TextField
                                            label="Report Name"
                                            variant="outlined"
                                            fullWidth
                                            value={report.name}
                                            onChange={(event) => handleReportChange(index, 'name', event.target.value)}
                                            style={{ marginTop: '0.5rem' }}
                                            error={reportErrors[index]?.name}
                                            helperText={reportErrors[index]?.name ? 'Name cannot be empty' : ''}
                                        />
                                        <TextField
                                            label="Report Description"
                                            variant="outlined"
                                            fullWidth
                                            value={report.description}
                                            onChange={(event) => handleReportChange(index, 'description', event.target.value)}
                                            style={{ marginTop: '0.5rem' }}
                                            error={reportErrors[index]?.description}
                                            helperText={reportErrors[index]?.description ? 'Description must be at least 3 characters long' : ''}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleReportDelete(index)}
                                            className="absolute top-0 right-0 bg-transparent text-red-500 hover:text-white dark:text-gray-600 dark:hover:text-white p-1 rounded-full"
                                        >
                                            <DeleteIcon />
                                        </button>
                                    </div>
                                ))}
                                <div className="flex items-center mt-3">
                                    <button type="button" onClick={handleReportAdd} className="bg-indigo-500 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded mr-2">
                                        <AddIcon /> Demande Report
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* <div style={{ display: 'flex', justifyContent: 'flex-end' }}> */}
                        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-3xl text-white bg-indigo-500 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-800">
                            Submit
                        </button>
                        <Link href={`/dashboard/fiscalFiles/${file.id}`} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white ml-2 rounded-3xl bg-red-500 bg:text-red-700 dark:bg-red-600 dark:bg:text-red-800">
                            Cancel
                        </Link>
                        {/* </div> */}
                    </form>

                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default MakeReclamation;

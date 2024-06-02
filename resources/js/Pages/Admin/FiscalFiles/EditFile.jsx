import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Link } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { InertiaLink } from '@inertiajs/inertia-react';
import getFileIcon from '@/Utils/getFileIcon';
import { Checkbox, FormControlLabel, IconButton, Snackbar } from '@mui/material';
import { Delete, Undo } from '@mui/icons-material';
import { Inertia } from '@inertiajs/inertia';
export default function EditFiscalFile({ auth, file }) {
    const { data, setData, processing, errors } = useForm({
        name: file.name,
        cin_or_fiscal_number: file.cin_or_fiscal_number,
        taxation_date: file.taxation_date,
        tax_center: file.tax_center,
        tax_amount: file.tax_amount,
        theme: file.theme,
        issuing_organism: file.issuing_organism,
        delivery_date_to_admin: file.delivery_date_to_admin,
        receipt_date: file.receipt_date,
        report: [],
    });
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadMessage, setUploadMessage] = useState('');
    const [droppedFiles, setDroppedFiles] = useState([]);
    const [oldFiles, setOldFiles] = useState(file.reports);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [undoActive, setUndoActive] = useState(false);
    const [deletedFiles, setDeletedFiles] = useState([]);

    const handleCheckboxChange = (e, report) => {
        if (e.target.checked) {
            setSelectedFiles(prevState => [...prevState, report]);
        } else {
            setSelectedFiles(prevState => prevState.filter(r => r.id !== report.id));
        }
    };

    // handleDeleteFile function
    const handleDeleteFile = () => {
        const updatedFiles = oldFiles.filter(file => !selectedFiles.some(selected => selected.id === file.id));
        setDeletedFiles(prevDeletedFiles => [...prevDeletedFiles, ...selectedFiles]);
        setSelectedFiles([]);
        setUndoActive(true);
        setOldFiles(updatedFiles);
    };

    // handleUndoDelete function
    const handleUndoDelete = () => {
        const updatedFiles = [...oldFiles, ...deletedFiles];
        setDeletedFiles([]);
        setUndoActive(false);
        setOldFiles(updatedFiles);
    };

    function handleChange(e) {
        setData(e.target.name, e.target.value);
    }

    function handleDrop(acceptedFiles) {
        const filesData = acceptedFiles.map(file => ({
            name: file.name,
        }));
        setData(prevData => ({
            ...prevData,
            report: [...prevData.report, ...acceptedFiles]
        }));
        setDroppedFiles(filesData);
        setUploadProgress(0);
        setUploadMessage("Uploading...");

        // Simulate an upload process for each file
        acceptedFiles.forEach((file, index) => {
            const simulateUpload = setInterval(() => {
                setUploadProgress(prevProgress => {
                    if (prevProgress >= 100) {
                        clearInterval(simulateUpload);
                        if (index === acceptedFiles.length - 1) {
                            setUploadMessage("Upload Successful!");
                        }
                        return 100;
                    }
                    return prevProgress + 10;
                });
            }, 100);
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key === 'report') {
                data[key].forEach((file, index) => {
                    formData.append(`${key}[${index}]`, file, file.name);
                });
            } else {
                formData.append(key, data[key]);
            }
        });
        if (deletedFiles.length > 0) {
            formData.append('deletedFiles', JSON.stringify(deletedFiles));
        }
        formData.append('_method', 'PUT');
        Inertia.post(route('update.record', file.id), formData, {
            forceFormData: true,
        });
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleDrop,
        accept: 'application/pdf, image/*',
    });

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Edit Dossier" />
            <div className="py-12">
                <h1 className='p-4 text-4xl'>Edit Dossier Fiscale</h1>
                <div className="p-7 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name / Company</label>
                            <input
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-3xl border-gray-300 shadow-sm focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                            {errors.name && <div className="text-red-500">{errors.name}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">CIN/Fiscal Number</label>
                            <input
                                type="text"
                                name="cin_or_fiscal_number"
                                value={data.cin_or_fiscal_number}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-3xl border-gray-300 shadow-sm focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                            {errors.cin_or_fiscal_number && <div className="text-red-500">{errors.cin_or_fiscal_number}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Taxation Date</label>
                            <input
                                type="date"
                                name="taxation_date"
                                value={data.taxation_date}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-3xl border-gray-300 shadow-sm focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                            {errors.taxation_date && <div className="text-red-500">{errors.taxation_date}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tax Center</label>
                            <input
                                type="text"
                                name="tax_center"
                                value={data.tax_center}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-3xl border-gray-300 shadow-sm focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                            {errors.tax_center && <div className="text-red-500">{errors.tax_center}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tax Amount</label>
                            <input
                                type="number"
                                step="0.01"
                                name="tax_amount"
                                value={data.tax_amount}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-3xl border-gray-300 shadow-sm focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                            {errors.tax_amount && <div className="text-red-500">{errors.tax_amount}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Theme / Object</label>
                            <input
                                type="text"
                                name="theme"
                                value={data.theme}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-3xl border-gray-300 shadow-sm focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                            {errors.theme && <div className="text-red-500">{errors.theme}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Issuing Organism</label>
                            <input
                                type="text"
                                name="issuing_organism"
                                value={data.issuing_organism}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-3xl border-gray-300 shadow-sm focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                            {errors.issuing_organism && <div className="text-red-500">{errors.issuing_organism}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Delivery Date to Admin</label>
                            <input
                                type="date"
                                name="delivery_date_to_admin"
                                value={data.delivery_date_to_admin}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-3xl border-gray-300 shadow-sm focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                            {errors.delivery_date_to_admin && <div className="text-red-500">{errors.delivery_date_to_admin}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Receipt Date</label>
                            <input
                                type="date"
                                name="receipt_date"
                                value={data.receipt_date}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-3xl border-gray-300 shadow-sm focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                            {errors.receipt_date && <div className="text-red-500">{errors.receipt_date}</div>}
                        </div>

                        {/* Dropzone and Existing File Display */}
                        <div {...getRootProps()} className={`border-dashed border-4 ${isDragActive ? 'border-indigo-500 bg-indigo-100' : 'border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-800'} text-center py-8 rounded-3xl h-60 flex justify-center items-center`}>
                            <input {...getInputProps()} multiple />
                            {droppedFiles.length ? (
                                <div className="flex flex-col items-center justify-center">
                                    {droppedFiles.map((file, index) => (
                                        <div key={index} className="flex items-center justify-center">
                                            {getFileIcon(file.name)}
                                            <p>{file.name} is ready to be uploaded.</p>
                                        </div>
                                    ))}
                                </div>
                            ) : isDragActive ? <p>Drop the files here ...</p> : <p>Drag and drop Center Rapport, or click to select files</p>}
                        </div>
                        {Object.keys(errors).filter(errorKey => errorKey.includes('report.')).map((errorKey, index) => (
                            <div key={index} className="text-red-500">{errors[errorKey]}</div>
                        ))}

                        {oldFiles && oldFiles.length > 0 ? (
                            <div className="text-gray-700 dark:text-gray-300">
                                <p>View Download Or Delete Old Report(s): </p>
                                {oldFiles.map((report, index) => (
                                    <div key={index} className="flex items-center">
                                        <Checkbox
                                            value={report.id}
                                            checked={selectedFiles.some(selected => selected.id === report.id)}
                                            onChange={(e) => handleCheckboxChange(e, report)}
                                            color="primary"
                                        />
                                        <Link href={`/files/${report.file_path.replace(/\//g, ' ')}`} target="_blank" rel="noopener noreferrer" title="Download or view file">
                                            {getFileIcon(report.file_path)}<span className="text-gray-700 dark:text-gray-300"> {report.desc}</span>
                                        </Link>
                                    </div>
                                ))}

                                {/* Delete button with label message */}
                                {selectedFiles.length > 0 && (
                                    <FormControlLabel
                                        control={<Delete color='warning' />}
                                        label={`Delete ${selectedFiles.length} file${selectedFiles.length > 1 ? 's' : ''}`}
                                        labelPlacement="end"
                                        onClick={handleDeleteFile}
                                        style={{ cursor: 'pointer', marginTop: '1rem' }}
                                    />
                                )}
                                {/* Snackbar for Undo option */}
                                <Snackbar
                                    open={undoActive}
                                    message="File(s) deleted"
                                    action={
                                        <IconButton
                                            size="small"
                                            color="inherit"
                                            onClick={handleUndoDelete}
                                        >
                                            <Undo fontSize="small" />
                                        </IconButton>
                                    }
                                />
                            </div>
                        ) : (
                            <>
                                <p>No Old Reports!</p>
                                {/* Snackbar for Undo option */}
                                <Snackbar
                                    open={undoActive}
                                    message="File(s) deleted"
                                    action={
                                        <IconButton
                                            size="small"
                                            color="inherit"
                                            onClick={handleUndoDelete}
                                        >
                                            <Undo fontSize="small" />
                                        </IconButton>
                                    }
                                /></>
                        )}
                        {uploadMessage && <div className="text-center my-2 text-gray-700 dark:text-gray-300">{uploadMessage}</div>}
                        {uploadProgress > 0 && (
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                            </div>
                        )}

                        <button type="submit" disabled={processing} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-3xl text-white bg-indigo-500 hover:bg-indigo-700">
                            Mis a jour
                        </button>
                        <InertiaLink href="/dashboard" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium ml-2 rounded-3xl text-white bg-gray-500 hover:bg-gray-700">
                            Cancel
                        </InertiaLink>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Link } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { FaFileAlt } from 'react-icons/fa';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { InertiaLink } from '@inertiajs/inertia-react';

export default function EditFiscalFile({ auth, file }) {
    const { data, setData, post, processing, errors } = useForm({
        name: file.name,
        cin_or_fiscal_number: file.cin_or_fiscal_number,
        taxation_date: file.taxation_date,
        tax_center: file.tax_center,
        tax_amount: file.tax_amount,
        theme: file.theme,
        issuing_organism: file.issuing_organism,
        delivery_date_to_admin: file.delivery_date_to_admin,
        receipt_date: file.receipt_date,
        report: null,
    });
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadMessage, setUploadMessage] = useState('');
    const [droppedFile, setDroppedFile] = useState(null);

    // Helper function to determine the icon based on the file extension
    const getFileIcon = (filePath) => {
        if (filePath.endsWith('.pdf')) {
            return <PictureAsPdfIcon />;
        } else if (filePath.match(/\.(jpeg|jpg|gif|png)$/)) {
            return <ImageIcon />;
        } else if (filePath.endsWith('none')) {
            return ''
        } else {
            return <DescriptionIcon />;
        }
    };

    function handleChange(e) {
        setData(e.target.name, e.target.value);
    }

    function handleDrop(acceptedFiles) {
        const file = acceptedFiles[0];
        setData('report', file);
        setDroppedFile({
            name: file.name,
        });
        setUploadProgress(0); // Reset progress
        setUploadMessage("Uploading...");

        // Simulate an upload process
        const simulateUpload = setInterval(() => {
            setUploadProgress(prevProgress => {
                if (prevProgress >= 100) {
                    clearInterval(simulateUpload);
                    setUploadMessage("Upload Successful!");
                    return 100;
                }
                return prevProgress + 10;
            });
        }, 100);
    }

    function handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData();
        Object.keys(data).forEach(key => {
            if (data.report && key === 'report') {
                formData.append(key, data[key], data[key].name);
            } else {
                formData.append(key, data[key]);
            }
        });
        formData.append('_method', 'PUT');
        post(route('update.record', file.id), formData, {
            forceFormData: true,
        });
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleDrop,
        accept: 'application/pdf, image/*',
    });

    return (
        <AuthenticatedLayout user={auth.user}>
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
                            <input {...getInputProps()} />
                            {droppedFile ? (<div className="flex items-center justify-center">
                                <FaFileAlt className="mr-2" size="1.5em" />
                                <p>{droppedFile.name} is ready to be uploaded.</p>
                            </div>) : isDragActive ? <p>Drop the files here ...</p> : <p>Drag and drop Center Rapport, or click to select files</p>}
                        </div>
                        {file.report && file.report != 'none' ? (
                            <div className="text-gray-700 dark:text-gray-300">
                                <p>View Or Download Old Report: </p>
                                <Link href={`/files/${file.report.replace(/\//g, ' ')}`} target="_blank" rel="noopener noreferrer" title="Download or view file">
                                    <span className="text-gray-700 dark:text-gray-300"> {file.report.split('/').pop()}</span>{getFileIcon(file.report)}
                                </Link>
                            </div>
                        ) : <p>No Old Report! </p>}
                        {errors.report && <div className="text-red-500 dark:text-red-400">{errors.report}</div>}
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

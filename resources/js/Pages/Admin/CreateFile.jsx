import React, { useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import { Head } from '@inertiajs/react';
import { useDropzone } from 'react-dropzone';
import { FaFileAlt } from 'react-icons/fa';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function CreateFiscalFile({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        cin_or_fiscal_number: '',
        taxation_date: '',
        tax_center: '',
        tax_amount: '',
        theme: '',
        issuing_organism: '',
        delivery_date_to_admin: '',
        receipt_date: '',
        report: null,
    });
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadMessage, setUploadMessage] = useState('');
    const [droppedFile, setDroppedFile] = useState(null);

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
        post('/fiscal-files', data, {
            forceFormData: true,
        });
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleDrop,
        accept: 'application/pdf, image/*',
    });

    return (

        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Creation Dossier" />

            <div className="py-12">
                <h1 className='p-4 text-4xl'>Create a Dossier Fiscale</h1>
                <div className="p-7 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Fields for Name/Company, CIN/Fiscal Number, Taxation Date, etc. */}
                        {/* Name/Company Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name / Company</label>
                            <input
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-3xl border-gray-300 shadow-sm"
                            />
                            {errors.name && <div className="text-red-500">{errors.name}</div>}
                        </div>

                        {/* CIN/Fiscal Number Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">CIN/Fiscal Number</label>
                            <input
                                type="text"
                                name="cin_or_fiscal_number"
                                value={data.cin_or_fiscal_number}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-3xl border-gray-300 shadow-sm"
                            />
                            {errors.cin_or_fiscal_number && <div className="text-red-500">{errors.cin_or_fiscal_number}</div>}
                        </div>

                        {/* Additional Fields based on your requirements */}
                        {/* Repeat this structure for each field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Taxation Date</label>
                            <input
                                type="date"
                                name="taxation_date"
                                value={data.taxation_date}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-3xl border-gray-300 shadow-sm"
                            />
                            {errors.taxation_date && <div className="text-red-500">{errors.taxation_date}</div>}
                        </div>

                        {/* Tax Center Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tax Center</label>
                            <input
                                type="text"
                                name="tax_center"
                                value={data.tax_center}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-3xl border-gray-300 shadow-sm"
                            />
                            {errors.tax_center && <div className="text-red-500">{errors.tax_center}</div>}
                        </div>

                        {/* Tax Amount Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tax Amount</label>
                            <input
                                type="number"
                                step="0.01"
                                name="tax_amount"
                                value={data.tax_amount}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-3xl border-gray-300 shadow-sm"
                            />
                            {errors.tax_amount && <div className="text-red-500">{errors.tax_amount}</div>}
                        </div>

                        {/* Theme/Object Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Theme / Object</label>
                            <input
                                type="text"
                                name="theme"
                                value={data.theme}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-3xl border-gray-300 shadow-sm"
                            />
                            {errors.theme && <div className="text-red-500">{errors.theme}</div>}
                        </div>

                        {/* Issuing Organism Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Issuing Organism</label>
                            <input
                                type="text"
                                name="issuing_organism"
                                value={data.issuing_organism}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-3xl border-gray-300 shadow-sm"
                            />
                            {errors.issuing_organism && <div className="text-red-500">{errors.issuing_organism}</div>}
                        </div>

                        {/* Delivery Date to Admin Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Delivery Date to Admin</label>
                            <input
                                type="date"
                                name="delivery_date_to_admin"
                                value={data.delivery_date_to_admin}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-3xl border-gray-300 shadow-sm"
                            />
                            {errors.delivery_date_to_admin && <div className="text-red-500">{errors.delivery_date_to_admin}</div>}
                        </div>

                        {/* Receipt Date Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Receipt Date</label>
                            <input
                                type="date"
                                name="receipt_date"
                                value={data.receipt_date}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-3xl border-gray-300 shadow-sm"
                            />
                            {errors.receipt_date && <div className="text-red-500">{errors.receipt_date}</div>}
                        </div>

                        {/* Dropzone */}
                        <div {...getRootProps()} className={`border-dashed border-4 ${isDragActive ? 'border-blue-500 bg-blue-100' : 'border-gray-200 bg-white'} text-center py-8 rounded-3xl h-60 flex justify-center items-center`}>
                            <input {...getInputProps()} />
                            {
                                droppedFile ?
                                    (<div className="flex items-center justify-center">
                                        <FaFileAlt className="mr-2" size="1.5em" />
                                        <p>{droppedFile.name} is ready to be uploaded.</p>
                                    </div>) :
                                    isDragActive ? <p>Drop the files here ...</p> : <p>Drag and drop a report here, or click to select files</p>
                            }
                        </div>
                        {uploadMessage && <div className="text-center my-2">{uploadMessage}</div>}
                        {uploadProgress > 0 && (
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button type="submit" disabled={processing} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-3xl text-white bg-indigo-500 hover:bg-indigo-700">
                            Submit
                        </button>
                    </form>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}

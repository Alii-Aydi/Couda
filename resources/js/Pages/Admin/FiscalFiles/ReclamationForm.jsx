import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayOut';
import { useDropzone } from 'react-dropzone';
import { HiOutlineUpload } from 'react-icons/hi';

function ReclamationForm({ flash, auth, reclamation }) {
    const { id, attributes_reclamations, reports_reclamations, contact_destination, created_by } = reclamation;
    const { data, setData, post, processing, errors } = useForm({
        att: {},
        rep: {}
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            att: {
                ...prevData.att,
                [name]: value
            }
        }));
    };

    const handleDrop = (name, files) => {
        setData(prevData => ({
            ...prevData,
            rep: {
                ...prevData.rep,
                [name]: files
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data)
        post(`/dashboard/reclamation/${id}`);
    };

    const renderDropzone = (name) => {
        const onDrop = (acceptedFiles) => handleDrop(name, acceptedFiles);
        const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: true });

        const files = data.rep[name] || [];

        return (
            <div {...getRootProps()} className="border-2 border-dashed border-gray-300 p-4 rounded-md mt-2 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition-colors">
                <input {...getInputProps()} />
                <HiOutlineUpload className="text-gray-500 mb-2" size={24} />
                {isDragActive ? (
                    <p className="text-sm text-indigo-500">Lâchez les fichiers ici...</p>
                ) : files.length > 0 ? (
                    <div>
                        {files.map((file, index) => (
                            <p key={index} className="text-sm text-gray-900">{file.name}</p>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">Glissez et déposez des fichiers ici, ou cliquez pour sélectionner des fichiers</p>
                )}
            </div>
        );
    };

    console.log(errors)

    return (
        <>
            <Head title='Reclamation'></Head>
            <UserLayout user={auth.user} flash={flash}>
                <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 my-5">
                    <h1 className="text-4xl font-semibold mb-6 text-center">Reclamation Form</h1>
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Données nécessaires</h2>
                        {attributes_reclamations.map((attr, index) => (
                            <div key={index} className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">{`${attr.attribute} - Raison: ${attr.reason}`}</label>
                                <input
                                    type="text"
                                    name={attr.attribute}
                                    value={data.att[attr.attribute] || ''}
                                    onChange={handleChange}
                                    className="mt-1 text-gray-900 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                {errors[`att.${attr.attribute}`] && <p className="text-red-600 text-sm mt-1">{errors[`att.${attr.attribute}`]}</p>}
                            </div>
                        ))}

                        <h2 className="text-xl font-semibold mb-4">Les Documents</h2>
                        {reports_reclamations.map((report, index) => (
                            <div key={index} className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Nom: {report.name}</label>
                                {renderDropzone(report.name)}
                                <p className="text-sm text-gray-600 mt-2">Description: {report.description}</p>
                                {errors[`rep.${report.name}`] && <p className="text-red-600 text-sm mt-1">{errors[`rep.${report.name}`]}</p>}
                            </div>
                        ))}

                        <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-6" disabled={processing}>
                            Submit
                        </button>
                    </form>
                </div>
            </UserLayout>
        </>
    );
}

export default ReclamationForm;

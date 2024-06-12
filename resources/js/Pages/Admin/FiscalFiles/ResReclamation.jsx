// components/FiscalFileShow.js
import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import { useEffect } from 'react';
import { useState } from 'react';

const ReclamationDetails = ({ auth, file }) => {
    const { resReclamation } = usePage().props;

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const imageFiles = [];
        const pdfFiles = [];

        resReclamation.repo_res.forEach((report, index) => {
            const name = report.file_path.replace(/\//g, " ");
            const fileUrl = `/files/${name}`;
            const fileType = name.split(".").pop().toLowerCase();

            if (["jpg", "jpeg", "png", "gif"].includes(fileType)) {
                imageFiles.push({ src: fileUrl, alt: `Rapport ${index}` });
            }
        });

        setImages(imageFiles);
    }, [resReclamation.repo_res]);

    const openImageLightbox = (index) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setCurrentImageIndex(null);
        setLightboxOpen(false);
    };

    if (!resReclamation) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <CircularProgress />
            </div>
        );
    }
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title={resReclamation.fiscal_file.cin_or_fiscal_number} />
            <div className="py-12">
                <h1 className='p-4 text-4xl'>Dossier Fiscal N°{resReclamation.fiscal_file.id}</h1>
                <div className="p-7 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">

                    <Typography className="pb-4">
                        <span className='text-gray-400'>CIN/Num Fiscal:</span> {resReclamation.fiscal_file?.cin_or_fiscal_number}<br />
                    </Typography>

                    <Typography className="pb-4">
                        <span className='text-gray-400'>Nom:</span> {resReclamation.fiscal_file?.name}
                    </Typography>

                    <Typography variant="h6" component="h3" className="mb-2">
                        Attributes and Reasons
                    </Typography>
                    <List className="mb-4">
                        {resReclamation.att_res.map((attr) => (
                            <ListItem key={attr.id}>
                                <ListItemText primary={<><span className='text-gray-400'>{attr.attribute}:</span> {attr.value}</>} />
                            </ListItem>
                        ))}
                    </List>

                    <Typography variant="h6" component="h3" className="mb-2">
                        Documents
                    </Typography>
                    <Lightbox
                        open={lightboxOpen}
                        close={closeLightbox}
                        currentIndex={currentImageIndex}
                        slides={images.map((image) => ({ src: image.src, caption: image.alt }))}
                        plugins={[Captions, Fullscreen, Zoom]}
                    />
                    <List className="mb-4">
                        {resReclamation.repo_res.map((report, index) => {
                            const name = report.file_path.replace(/\//g, ' ');
                            const fileUrl = `/files/${name}`;
                            const fileType = name.split('.').pop().toLowerCase(); // Get file extension
                            if (['jpg', 'jpeg', 'png', 'gif'].includes(fileType)) {
                                // For image files, embed the image directly
                                return (
                                    <div key={index} className="mt-4 lg:mt-0 cursor-pointer" onClick={() => openImageLightbox(index)}>
                                        <img src={fileUrl} alt={`Rapport ${index}`} style={{ width: '490px', height: '450px', border: '1px solid #ccc', objectFit: 'contain' }} />
                                    </div>
                                );
                            } else if (fileType === 'pdf') {
                                // For PDF files, embed using iframe
                                return (
                                    <div key={index} className="mt-4 lg:mt-0">
                                        <iframe src={fileUrl} width="490px" height="450px" title={`Rapport ${index}`} />
                                    </div>
                                );
                            } else {
                                // For other file types, provide a download link with an icon
                                return (
                                    <div key={index} className="flex items-center gap-2 border border-gray-300 rounded p-2 dark:border-gray-600 mt-4 lg:mt-0" style={{ width: '490px', height: '450px' }}>
                                        <a href={fileUrl} download={name} className="dark:text-gray-300">
                                            <span className="text-xl">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                            </span>
                                            {report.desc}
                                        </a>
                                    </div>
                                );
                            }
                        })}
                    </List>

                    <div className="mt-4">
                        <Button
                            className="dark:bg-red-700 dark:text-white rounded-full px-4 py-2 flex items-center gap-2 transition-colors duration-300 ease-in-out hover:bg-purple-500 hover:text-white"
                            startIcon={<ArrowBackIcon />}
                            component={Link}
                            href="/dashboard/fiscalFilesList"
                            style={{ borderRadius: '2em' }}
                        >
                            Notifications
                        </Button>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ReclamationDetails;

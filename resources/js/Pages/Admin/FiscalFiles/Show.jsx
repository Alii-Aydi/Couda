// components/FiscalFileShow.js
import React from 'react';
import { Link } from '@inertiajs/react';
import { Button, CardContent, Paper, Typography, Card } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import { useEffect, useState } from 'react';
import { FiAlertCircle, FiPenTool } from 'react-icons/fi';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid';
import { Archive } from '@mui/icons-material';

const FiscalFileShow = ({ auth, file }) => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const imageFiles = [];
        const pdfFiles = [];

        file.reports.forEach((report, index) => {
            const name = report.file_path.replace(/\//g, " ");
            const fileUrl = `/files/${name}`;
            const fileType = name.split(".").pop().toLowerCase();

            if (["jpg", "jpeg", "png", "gif"].includes(fileType)) {
                imageFiles.push({ src: fileUrl, alt: `Report ${index}` });
            }
        });

        setImages(imageFiles);
    }, [file.reports]);

    const openImageLightbox = (index) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setCurrentImageIndex(null);
        setLightboxOpen(false);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={file.cin_or_fiscal_number} />
            <div className="py-12">
                <h1 className='p-4 text-4xl'>Fiscal File N°{file.id}</h1>
                <div className="p-7 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="container mx-auto mt-8">
                        <Paper elevation={3} className="p-4 dark:bg-gray-800">
                            <div className="flex justify-between">
                                <Typography variant="h4" gutterBottom className="dark:text-white">{file.name}</Typography>
                                <div className="flex justify-between p-2">
                                    <Link href="/dashboard/fiscalFiles/reclamation" className="block p-2">Archiver <Archive className="inline-block text-gray-500 size-5" /></Link>
                                    <Link href="/dashboard/fiscalFiles/reclamation" className="block p-2">Edit <PencilSquareIcon className="inline-block text-blue-500 size-5" /></Link>
                                    <Link href={`/dashboard/fiscalFiles/${file.id}/reclamation`} className="block p-2">Reclamation <FiAlertCircle className="inline-block text-red-500 size-5" /></Link>
                                </div>
                            </div>
                            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-4">
                                <Card>
                                    <CardContent>
                                        <Typography variant="body1" className="dark:text-gray-300">CIN/Fiscal Number:</Typography>
                                        <Typography variant="body2" className="dark:text-gray-400">{file.cin_or_fiscal_number}</Typography>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent>
                                        <Typography variant="body1" className="dark:text-gray-300">Taxation Date:</Typography>
                                        <Typography variant="body2" className="dark:text-gray-400">{file.taxation_date}</Typography>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent>
                                        <Typography variant="body1" className="dark:text-gray-300">Tax Center:</Typography>
                                        <Typography variant="body2" className="dark:text-gray-400">{file.tax_center}</Typography>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent>
                                        <Typography variant="body1" className="dark:text-gray-300">Tax Amount:</Typography>
                                        <Typography variant="body2" className="dark:text-gray-400">{file.tax_amount}</Typography>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent>
                                        <Typography variant="body1" className="dark:text-gray-300">Theme:</Typography>
                                        <Typography variant="body2" className="dark:text-gray-400">{file.theme}</Typography>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent>
                                        <Typography variant="body1" className="dark:text-gray-300">Issuing Organism:</Typography>
                                        <Typography variant="body2" className="dark:text-gray-400">{file.issuing_organism}</Typography>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent>
                                        <Typography variant="body1" className="dark:text-gray-300">Delivery Date to Admin:</Typography>
                                        <Typography variant="body2" className="dark:text-gray-400">{file.delivery_date_to_admin}</Typography>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent>
                                        <Typography variant="body1" className="dark:text-gray-300">Receipt Date:</Typography>
                                        <Typography variant="body2" className="dark:text-gray-400">{file.receipt_date}</Typography>
                                    </CardContent>
                                </Card>
                            </div>
                            <Typography variant="h6" className="mt-4 dark:text-white">Reports:</Typography>
                            <div className="flex flex-wrap justify-between">
                                <Lightbox
                                    open={lightboxOpen}
                                    close={closeLightbox}
                                    currentIndex={currentImageIndex}
                                    slides={images.map((image) => ({ src: image.src, caption: image.alt }))}
                                    plugins={[Captions, Fullscreen, Zoom]}
                                />
                                {file.reports.map((report, index) => {
                                    const name = report.file_path.replace(/\//g, ' ');
                                    const fileUrl = `/files/${name}`;
                                    const fileType = name.split('.').pop().toLowerCase(); // Get file extension
                                    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileType)) {
                                        // For image files, embed the image directly
                                        return (
                                            <div key={index} className="mt-4 lg:mt-0 cursor-pointer" onClick={() => openImageLightbox(index)}>
                                                <img src={fileUrl} alt={`Report ${index}`} style={{ width: '490px', height: '450px', border: '1px solid #ccc', objectFit: 'contain' }} />
                                            </div>
                                        );
                                    } else if (fileType === 'pdf') {
                                        // For PDF files, embed using iframe
                                        return (
                                            <div key={index} className="mt-4 lg:mt-0">
                                                <iframe src={fileUrl} width="490px" height="450px" title={`Report ${index}`} />
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
                            </div>

                        </Paper>
                        <div className="mt-4">
                            <Button
                                className="dark:bg-red-700 dark:text-white rounded-full px-4 py-2 flex items-center gap-2 transition-colors duration-300 ease-in-out hover:bg-purple-500 hover:text-white"
                                startIcon={<ArrowBackIcon />}
                                component={Link}
                                href="/dashboard/fiscalFilesList"
                                style={{ borderRadius: '2em' }}
                            >
                                Back to list
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default FiscalFileShow;

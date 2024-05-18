import React, { useState } from 'react';
import { Avatar, IconButton, LinearProgress, Typography } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import axios from 'axios';

const ProfilePictureInput = ({ initialImage, userId }) => {
    const [image, setImage] = useState(initialImage);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                uploadImage(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadImage = async (file) => {
        setUploading(true);
        setUploadProgress(0);
        setUploadStatus('');

        const formData = new FormData();
        formData.append('profile_pic', file);

        try {
            const response = await axios.post(`/profile/${userId}/savepic`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                },
            });

            if (response.status === 200) {
                setUploadStatus('Saved successfully');
            } else {
                setUploadStatus('Failed to save');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            setUploadStatus('Failed to save');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-start">
            <div className="relative group">
                <Avatar
                    src={image}
                    alt="Profile Picture"
                    className="rounded-full"
                    style={{ height: "5rem", width: "5rem" }}
                />
                <input
                    accept="image/*"
                    className="hidden"
                    id="icon-button-file"
                    type="file"
                    onChange={handleImageChange}
                />
                <label htmlFor="icon-button-file" className="absolute bottom-0 right-0">
                    <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        className="bg-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ height: "5rem", width: "5rem" }}
                    >
                        <AddAPhotoIcon />
                    </IconButton>
                </label>
            </div>
            {uploading && (
                <div className="w-full mt-2">
                    <LinearProgress variant="determinate" value={uploadProgress} />
                    <Typography variant="caption" display="block" align="center">
                        Uploading {uploadProgress}%
                    </Typography>
                </div>
            )}
            {uploadStatus && (
                <Typography variant="body2" align="center" className={`mt-2 ${uploadStatus === 'Saved successfully' ? 'text-green-500' : 'text-red-500'}`}>
                    {uploadStatus}
                </Typography>
            )}
        </div>
    );
};

export default ProfilePictureInput;

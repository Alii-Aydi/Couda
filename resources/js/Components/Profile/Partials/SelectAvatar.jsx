import React, { useState } from 'react';
import { Avatar } from '@mui/material';

const SelectAvatar = ({ handleProfilePicChange, profilePic }) => {
    return (
        <div className="relative rounded-full"
            style={{ width: '120px', height: '120px', overflow: "hidden" }}
        >
            <label htmlFor="profilePicInput" className="cursor-pointer">
                <div className="group" style={{ width: '120px', height: '120px' }}>
                    <Avatar sx={{ width: 120, height: 120 }}>
                        <img src={profilePic} alt="Profile" />
                    </Avatar>
                    <input
                        type="file"
                        id="profilePicInput"
                        accept="image/*"
                        onChange={handleProfilePicChange}
                        className="hidden"
                    />
                    <div className="absolute inset-0 p-10 text-center justify-center items-center bg-black bg-opacity-50 hidden group-hover:flex">
                        <span className="text-white">Taille maximal: 20MB</span>
                    </div>
                </div>
            </label>
        </div>
    );
};

export default SelectAvatar
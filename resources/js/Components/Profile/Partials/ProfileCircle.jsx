import React from 'react';

const ProfileCircle = ({ src, alt }) => {
    return (
        <img
            src={src}
            alt={alt}
            className="w-10 h-10 rounded-full border-2 border-gray-300 shadow-sm object-cover"
        />
    );
};

export default ProfileCircle;

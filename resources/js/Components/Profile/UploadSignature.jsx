import React from 'react';

const SignatureUploadInput = ({ handleImageChange, image }) => {
    return (
        <div className="flex flex-col items-start">
            <div className="relative group">
                <div
                    className="border-2 border-dashed border-gray-400 rounded-lg p-4 w-full text-center"
                    style={{ height: "10rem", width: "20rem" }}
                    onDrop={(e) => {
                        e.preventDefault();
                        handleImageChange(e);
                    }}
                    onDragOver={(e) => e.preventDefault()}
                >
                    {image ? (
                        <img
                            src={image}
                            alt="Signature"
                            className="h-full w-full object-contain"
                        />
                    ) : (
                        <p className='text-center translate-y-12'>Télécharger Signature</p>
                    )}
                    <input
                        accept="image/*"
                        className="hidden"
                        id="signature-upload-input"
                        type="file"
                        onChange={handleImageChange}
                    />
                    <label htmlFor="signature-upload-input" className="cursor-pointer">
                        <div className="absolute inset-0 opacity-0 rounded-md group-hover:opacity-100 transition-opacity flex items-center justify-center bg-gray-100 bg-opacity-75">
                            <p className="text-gray-700">Clicker pour selectioner un fichier</p>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default SignatureUploadInput;

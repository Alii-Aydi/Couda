import React, { useState, useEffect } from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import ShowPaper from '@/Components/ShowPaper';

const SousPv = ({ fiscal_files, filesErrors, decisions, setDecisions }) => {
    const [openModalIndex, setOpenModalIndex] = useState(-1); // State for open modal index

    const handleDecisionChange = (index, value) => {
        const newDecisions = [...decisions];
        newDecisions[index] = {
            ...newDecisions[index],
            id: fiscal_files[index].id, // Add fiscal file ID to the object
            decisions: value
        };
        setDecisions(newDecisions);
    };

    const handleNotesChange = (index, value) => {
        const newDecisions = [...decisions];
        newDecisions[index] = {
            ...newDecisions[index],
            id: fiscal_files[index].id, // Add fiscal file ID to the object
            notes: value
        };
        setDecisions(newDecisions);
    };

    const handleOpenModal = (index) => {
        setOpenModalIndex(index);
    };

    const handleCloseModal = () => {
        setOpenModalIndex(-1);
    };

    return (
        <div>
            {fiscal_files.map((fiscalFile, index) => (
                <div key={index} className="my-10">
                    <div className="flex items-center gap-2 mb-4">
                        {/* Open modal when clicking on the div */}
                        <div className='hover:underline hover:cursor-pointer' onClick={() => handleOpenModal(index)}>{`${index + 1}) ${fiscalFile.name}/N°${fiscalFile.cin_or_fiscal_number}`}</div>
                        <FormControl variant="outlined" className="w-40">
                            <InputLabel id={`decision-label-${index}`}>Decision</InputLabel>
                            <Select
                                labelId={`decision-label-${index}`}
                                label="Decision"
                                value={decisions[index]?.decisions || ''} // Use decisions state for value
                                onChange={(e) => handleDecisionChange(index, e.target.value)}
                                style={{ height: '55px' }}
                                error={filesErrors[index]?.decisions} // Apply error state based on the filesErrors array
                            >
                                <MenuItem value="accepted">Accepter</MenuItem>
                                <MenuItem value="delayed">Renvoier</MenuItem>
                                <MenuItem value="rejected">Rejecter</MenuItem>
                            </Select>
                            {/* Render error message using FormHelperText */}
                            {filesErrors[index]?.decisions && <FormHelperText error>Decision est obligatoire</FormHelperText>}
                        </FormControl>
                    </div>
                    <TextField
                        id={`notes-${index}`}
                        label="Notes"
                        multiline
                        fullWidth
                        rows={4}
                        variant="outlined"
                        value={decisions[index]?.notes || ''} // Use notes state for value
                        onChange={(e) => handleNotesChange(index, e.target.value)}
                        error={filesErrors[index]?.notes} // Apply error state based on the filesErrors array
                    />
                    {/* Render error message using FormHelperText */}
                    {filesErrors[index]?.notes && <FormHelperText error>Notes sont obligatoire</FormHelperText>}
                </div>
            ))}

            {/* Modals */}
            {fiscal_files.map((fiscalFile, index) => (
                <Dialog
                    key={index}
                    open={openModalIndex === index}
                    onClose={handleCloseModal}
                    fullWidth
                    maxWidth="md"
                    PaperProps={{
                        style: {
                            overflowY: 'scroll',
                            maxHeight: 'calc(100vh - 64px)' // Adjust according to your header height
                        },
                    }}
                >
                    <DialogTitle>{`${fiscalFile.name}/N°${fiscalFile.cin_or_fiscal_number}`}</DialogTitle>
                    <DialogContent>
                        <ShowPaper flag={false} file={fiscalFile}></ShowPaper>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            ))}
        </div>
    );
}

export default SousPv;

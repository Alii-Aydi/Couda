import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';

const MemberSelectList = ({ selectedMembers, setSelectedMembers }) => {
    const [users, setUsers] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [selectedChips, setSelectedChips] = useState([])

    useEffect(() => {
        // Replace this with your actual API call to fetch users
        const fetchUsers = async () => {
            try {
                const response = await fetch('/users');
                const data = await response.json();
                const options = data.map(user => ({
                    value: user.id,
                    name: user.name,
                }));
                setUsers(options);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleInputChange = (event, newValue) => {
        setInputValue(newValue);
    };

    const handleSelect = (event, newValue) => {
        const members = newValue.map(member => member.value)
        setSelectedMembers(members);
        setSelectedChips(newValue)
    };

    return (
        <Autocomplete
            multiple
            value={selectedChips}
            onChange={handleSelect}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            options={users}
            getOptionLabel={(option) => option.name}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip
                        key={index}
                        label={option.name}
                        {...getTagProps({ index })}
                    />
                ))
            }
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Search"
                    style={{ width: '100%' }} // Set the width to 100% for full width
                    className="mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                />
            )}
        />
    );
};

export default MemberSelectList;

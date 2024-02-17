// ThemeToggler.jsx
import React from 'react';
import Switch from '@mui/material/Switch';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { useThemeMode } from '../Contexts/ThemeContext';

const ThemeToggler = () => {
    const { mode, toggleTheme } = useThemeMode();

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <LightModeIcon />
            <Switch
                checked={mode === 'dark'}
                onChange={toggleTheme}
                inputProps={{ 'aria-label': 'theme toggler' }}
            />
            <DarkModeIcon />
        </Stack>
    );
};

export default ThemeToggler;

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { createTheme, ThemeProvider as MUIThemeProvider, CssBaseline } from '@mui/material';

const ThemeModeContext = createContext();

export const useThemeMode = () => useContext(ThemeModeContext);

export const ThemeProvider = ({ children }) => {
    const [mode, setMode] = useState(() => localStorage.getItem('theme') || 'light');

    useEffect(() => {
        localStorage.setItem('theme', mode);
        document.documentElement.classList.toggle('dark', mode === 'dark');
    }, [mode]);

    const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

    const toggleTheme = () => setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));

    return (
        <ThemeModeContext.Provider value={{ mode, toggleTheme }}>
            <MUIThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MUIThemeProvider>
        </ThemeModeContext.Provider>
    );
};

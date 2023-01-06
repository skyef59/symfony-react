import React, {useEffect, useState } from 'react';
import { UserContext } from './context/UserContext';
import { ThemeContext } from './context/ThemeContext';
import Login from './views/Login';
import Dashboard from './Dashboard';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default function App() {
    const [mode, setMode] = useState(localStorage.getItem('mode_theme') ?? 'light');
    const [user, setUser] = useState(false);
    const token = localStorage.getItem('jwt_token') ?? false;
    const theme = React.useMemo(() => createTheme({
        palette: {
            mode,
            primary: {
                light: '#ff94c2',
                main: '#f06292',
                dark: '#ba2d65',
                contrastText: '#fff',
              },
            secondary: {
                light: '#ff7961',
                main: '#f44336',
                dark: '#ba000d',
                contrastText: '#000',
            },
        }
    }), [mode]);

    const switchTheme = () => {
        let newMode = mode === 'dark' ? 'light' : 'dark';
        localStorage.setItem('mode_theme', newMode);
        setMode(newMode);
    }

    const getPayload = () => {
        if (!token) {
            return '';
        }

        return JSON.parse(atob(token.split('.')[1]));
    }
    
    useEffect(() => {
        setUser(getPayload());
    }, [])

    return  <ThemeProvider theme={theme}>
        {token && typeof user === 'object' ? <>
            <ThemeContext.Provider value={{mode: mode, set: switchTheme}}>
                <UserContext.Provider value={user}>
                    <Dashboard />
                </UserContext.Provider>
            </ThemeContext.Provider>
        </> : <Login />}
    </ThemeProvider>;
}
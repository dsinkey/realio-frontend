import React, { useState, ChangeEvent } from 'react';
import Staking from './components/staking';

import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import NavBar from './components/NavBar';

function App() {
    let [darkMode, setDarkMode] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDarkMode(event.target.checked);
    };

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
        },
    });
    return (
        <ThemeProvider theme={theme}>
            <Paper style={{ height: '100vh' }}>
                <NavBar handleChange={handleChange} darkMode={darkMode} />
                <Container style={{ marginTop: 15 }}>
                    <Box>
                        <Staking />
                    </Box>
                </Container>
            </Paper>
        </ThemeProvider>
    );
}

export default App;

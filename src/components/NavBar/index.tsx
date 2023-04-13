import React, { FC, ChangeEvent } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

interface NavBarProps {
    darkMode: boolean;
    handleChange(event: ChangeEvent): void;
}

const NavBar: FC<NavBarProps> = ({ handleChange, darkMode }) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar
                    style={{
                        backgroundColor: 'rgba(63,63,64,0.85)',
                        height: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <img
                        style={{ height: 80, marginLeft: 15 }}
                        src="https://www.realio.fund/hs-fs/hubfs/raw_assets/public/Realio_May2022/images/NewLogoUpdated.png?width=500&name=NewLogoUpdated.png"
                        alt="realio"
                    />
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    onChange={handleChange}
                                    checked={darkMode}
                                />
                            }
                            label="Dark Mode"
                            style={{ color: 'white' }}
                        />
                    </FormGroup>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavBar;

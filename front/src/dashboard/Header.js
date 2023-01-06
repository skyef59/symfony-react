import React, {useContext, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { UserContext } from '../context/UserContext';
import {Menu, MenuItem, ListItemIcon, Divider} from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Header(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(false)
    const user = useContext(UserContext);

    return <>
        <Box sx={{ flexGrow: 1, position: 'sticky', top: 0, zIndex: 999}}>
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => props.setOpenMenu()}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        The site
                    </Typography>
                    <Button color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>{user.username ?? 'JUL'}</Button>
                </Toolbar>
            </AppBar>
        </Box>
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={!!anchorEl}
            onClose={() => setAnchorEl(false)}
            PaperProps={{
                sx: {
                    width: 200
                }
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={() => navigate('/account')} selected={location.pathname === '/account'}>
                <ListItemIcon>
                    <AccountBoxIcon fontSize="small" />
                </ListItemIcon>
                Profile
            </MenuItem>
            <MenuItem onClick={() => {localStorage.removeItem('jwt_token'); window.location.reload();}}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>
            <Divider />
        </Menu>
    </>;
}
import * as React from 'react';
import {Drawer} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '@mui/material/Icon';
import SwitchTheme from '../components/SwitchTheme';

export default function Menu(props) {
    const location = useLocation();
    const navigate = useNavigate();

    return <Drawer
        variant="persistent"
        anchor={'left'}
        open={props.open}
        onClose={() => props.setOpenMenu()}
    >
        <List sx={{minWidth: 250}}>
            {props.list.map((item, index) => (
                <ListItem key={item.label + '_' + index} disablePadding>
                    <ListItemButton selected={location.pathname === item.to} onClick={() => navigate(item.to)}>
                        <ListItemIcon>
                            <Icon color={location.pathname === item.to ? 'primary' : 'inherit'}>{item.icon}</Icon>
                        </ListItemIcon>
                        <ListItemText primary={item.label} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
        <ListItem style={{position: 'absolute', bottom: 0}} disablePadding>
            <SwitchTheme />
        </ListItem>
    </Drawer>;
}
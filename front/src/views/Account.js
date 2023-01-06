import React, {useState, useContext, useEffect} from 'react';
import ApiManager from '../services/ApiManager';
import {Grid, TextField, Button, Typography} from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { UserContext } from '../context/UserContext';
import SwitchTheme from '../components/SwitchTheme';

export default function Account() {
    const [username, setUsername] = useState('')
    const user = useContext(UserContext);

    const fetchAccount = () => {
        ApiManager('users/' + user.id, 'GET', (res) => setUsername(res.data.email));
    }

    const putAccount = () => {
        let data = { email: username };
        ApiManager('users/' + user.id, 'PUT', (res) => fetchAccount(), data);
    }

    useEffect(() => {
        fetchAccount();
    }, []);

    return <Grid container spacing={2}>
        <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Typography variant='h3'>Mon profil</Typography>
            <AccountBoxIcon fontSize="large" />
        </Grid>
        <Grid item xs={12}>
            <TextField value={username} onChange={(e) => setUsername(e.target.value)} label="Modifier mon login" fullWidth></TextField>
        </Grid>
        <Grid item xs={12} md={6}>
            <TextField label="Nouveau mot de passe" type={'password'} fullWidth></TextField>
        </Grid>
        <Grid item xs={12} md={6}>
            <TextField label="Confirmer le mot de passe" type={'password'} fullWidth></TextField>
        </Grid>
        <Grid item xs={12} md={6}>
            <SwitchTheme />
        </Grid>
        <Grid item xs={12}>
            <Button variant="outlined" onClick={() => putAccount()} color="success">Enregistrer</Button>
        </Grid>
    </Grid>;
}
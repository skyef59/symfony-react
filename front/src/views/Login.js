import React, {useState} from 'react';
import {Checkbox, Grid, TextField, FormControlLabel, Paper, Button} from '@mui/material';
import Auth from '../services/Auth';

const Login = (props) => {
    const [login, setLogin] = useState('test@live.fr');
    const [password, setPassword] = useState('test');
    const [connectionError, setConnectionError] = useState(false);
    const [checked, setChecked] = useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <div style={{ padding: 30 }}>
            <Paper style={{ padding: 30 }}>
                <Grid
                    container
                    spacing={3}
                    direction={'column'}
                    justify={'center'}
                    alignItems={'center'}
                >
                <Grid item xs={12}>
                    <TextField error={connectionError} value={login} label="Login" onChange={(e) => {setLogin(e.target.value); setConnectionError(false)}}></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField error={connectionError} value={password} label="Mot de passe" type={'password'} onChange={(e) => {setPassword(e.target.value); setConnectionError(false)}}></TextField>
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                            checked={checked}
                            onChange={handleChange}
                            label={'Keep me logged in'}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        }
                        label="Rester connecté"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button 
                        fullWidth 
                        variant='contained'
                        onClick={() => Auth(login, password)}
                    >
                        Me connecter
                    </Button>
                </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default Login;

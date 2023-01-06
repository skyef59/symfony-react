import React from "react"
import {Card, CardContent, Typography, Grid} from '@mui/material';
import { useTheme } from '@mui/material/styles'
import Icon from '@mui/material/Icon';
import CircularProgress from '@mui/material/CircularProgress';

function CardKpi(props) {
    const theme = useTheme();

    return <Grid item xs={12} md={3}>
        <Card sx={{background: theme.palette.primary.main, position: 'relative'}}>
            <CardContent sx={{color: 'white'}}>
                <Typography variant='button'>
                    {props.title}
                </Typography>
                <Icon style={{position: 'absolute', bottom: -5, right: -35, fontSize: 150}}>{props.icon}</Icon>

                <Typography variant='h2' >
                    {props.value ? props.value : <CircularProgress style={{color: 'white'}} />}
                </Typography>
            </CardContent>
        </Card>
    </Grid>
}

export default CardKpi;
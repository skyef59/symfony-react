import React, {useState} from 'react';
import {Grid} from '@mui/material';
import CardKpi from '../components/CardKpi';
import ApiManager from '../services/ApiManager';

export default function Home() {
    const [countArticles, setCountArticles] = useState(null);

    ApiManager('count/articles', 'GET', (res) => setCountArticles(res.data ?? false))

    return <Grid container spacing={2}>
        <CardKpi icon='chair' value={countArticles} title="Nombre d'articles"/>
        <CardKpi icon='apple' value={countArticles} title="Nombre d'articles"/>
        <CardKpi icon='church' value={countArticles} title="Nombre d'articles"/>
    </Grid>;
}
import React, {useEffect, useState} from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {Button, IconButton, Stack, TextField, Chip} from '@mui/material';
import {DialogTitle, Dialog, DialogContent, DialogActions} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ApiManager from '../services/ApiManager';

export default function ArticlesTable() {
    const [rows, setRows] = useState([]);
    const [open, setOpen] = useState(false);
    const [dataValues, setDataValues] = useState({name: '', price: '', ref: ''});

    const fetchRows = () => {
        ApiManager('articles', 'GET', (res) => setRows(res.data));
    }

    const addArticle = () => {
        ApiManager('articles', 'POST', (res) => fetchRows(), dataValues);
    }

    const deleteArticle = (id) => {
        ApiManager('articles/' + id, 'DELETE', (res) => fetchRows());
    }

    useEffect(() => {
        fetchRows();
    }, []);

    return <>
        <TableContainer>
            <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Identifiant</TableCell>
                    <TableCell>Nom</TableCell>
                    <TableCell align="right">Prix</TableCell>
                    <TableCell>Référence</TableCell>
                    <TableCell>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row, index) => (
                <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="right">
                        <Chip label={row.price + ' €'} color="primary" size="small"/>
                    </TableCell>
                    <TableCell>{row.ref}</TableCell>
                    <TableCell>
                        <IconButton color="error" aria-label="upload picture" component="label" onClick={() => deleteArticle(row.id)}>
                            <DeleteForeverIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>

        <Button variant="outlined" sx={{marginTop: 1}} onClick={() => setOpen(true)}>Ajouter un article</Button>

        <Dialog onClose={() => setOpen(false)} open={open} maxWidth={'sm'} fullWidth>
            <DialogTitle>Ajouter un nouvel article</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{paddingTop: 1}}>
                    <TextField id="outlined-basic" value={dataValues.name} label="Nom" variant="outlined" onChange={(e) => setDataValues(Object.assign({}, dataValues, {name: e.target.value}))}/>
                    <TextField id="outlined-basic" value={dataValues.price} label="Prix" type="number" variant="outlined" onChange={(e) => setDataValues(Object.assign({}, dataValues, {price: e.target.value}))}/>
                    <TextField id="outlined-basic" value={dataValues.ref} label="Référence" variant="outlined" onChange={(e) => setDataValues(Object.assign({}, dataValues, {ref: e.target.value}))}/>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={() => setOpen(false)} color="error">Annuler</Button>
                <Button variant="outlined" onClick={() => {addArticle(); setOpen(false); setDataValues({name: '', price: '', ref: ''})}} color="success">Ajouter</Button>
            </DialogActions>
        </Dialog>
    </>;
}
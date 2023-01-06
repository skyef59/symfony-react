import React, {useState } from 'react';
import { Routes, Route } from "react-router-dom";
import ArticlesTable from './views/ArticlesTable';
import Home from './views/Home';
import Account from './views/Account';
import Header from './dashboard/Header';
import Menu from './dashboard/Menu';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Confetti from 'react-confetti'

export default function Dashboard() {
    const [openMenu, setOpenMenu] = useState(true);

    const listMenuItems = [
        {label: 'Accueil', to: '/', icon: 'home'},
        {label: 'Articles', to: '/articles', icon: 'article'},
    ];

    return <>   
        <Menu 
            list={listMenuItems} 
            open={openMenu}
            setOpenMenu={() => setOpenMenu(!openMenu)}
        />
    
        <Box sx={{paddingLeft: openMenu ? '250px' : 0, position: 'relative'}}>
            <Header setOpenMenu={() => setOpenMenu(!openMenu)}/>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Paper elevation={5} sx={{padding: 2}}>
                    <Routes>
                        <Route path="/" element={<Home />}/>
                        <Route path="/articles" element={<ArticlesTable />}/>
                        <Route path="/account" element={<Account />}/>
                        <Route path="*" element={<h1>404 la page demandée n'existe pas</h1>} />
                    </Routes>
                </Paper>
            </Box>
        </Box>

        <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
        />
    </>
}
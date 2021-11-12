import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import ListaPropietarios from './components/ListaPropietarios';

import Xd from './components/xd';

export default function App() {
    return (

        <Router>
            <Routes>
                <Route exact path="/Lista" Component={Xd}/>
            </Routes>
        </Router>
    )
};
import React from 'react'
import './Toolbar.css'
import NavigationItems from '../NavigationItems/NavigationItems'
import Logo from '../../Logo/Logo'

const Toolbar = (props) => (

    <header className="Toolbar">
        <Logo />       
        <nav>
        <NavigationItems />
        </nav>
    </header>
);

export default Toolbar
import React from 'react'
import './Layout.css'
import Aux from '../../hoc/Auxiliary'
import  Toolbar from '../Navigation/Toolbar/Toolbar'

const Layout = (props) => (

    <Aux>
        <Toolbar/>             
        <main className="Layout">{props.children}</main>        
    </Aux>
);

export default Layout
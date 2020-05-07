import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends Component {

    componentDidMount() {

        console.log("componentDidMount [logout]")
        localStorage.removeItem("username");
        localStorage.removeItem("token");

        console.log("localStorage" +localStorage.getItem("token"))
    }
 

    render () {

        localStorage.removeItem("username");
        localStorage.removeItem("token");
        return <Redirect to="/"/>;
    }
}


export default Logout;
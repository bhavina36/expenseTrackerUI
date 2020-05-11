import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../Store/actions/index';

class Logout extends Component {

    componentDidMount() {

        this.props.onLogout()

        console.log("componentDidMount [logout]")
        

        console.log("localStorage:" +localStorage.getItem("token"))
    }
 

    render () {       
        return <Redirect to="/"/>;
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    };
};

export default connect(null, mapDispatchToProps)(Logout);
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import './Login.css'
import {Button,Form} from 'react-bootstrap'
import { connect } from 'react-redux';
import * as actions from '../../Store/actions/index';

class Login extends React.Component {

    loginClicked(event) {

        console.log("LOGIN CLICKED")
        
       // event.preventDefault();                 
        this.props.onAuth(this.emailId, this.password);     

        console.log("this.props.authRedirectPath---->"+this.props.authRedirectPath)
        console.log("this.props.isAuthenticated [Login.js]"+this.props.isAuthenticated +"[authRedirectPath]"+ this.props.authRedirectPath)

    }

    render() {

         var messagelabel = null;
          if(this.props.message) {
            messagelabel = <h6 className="MessageLabel">{this.props.message}</h6>
          }
          console.log("ErrorMEssage--->"+this.props.message)

        //console.log("this.props.isAuthenticated [Login.js]"+this.props.isAuthenticated +"[authRedirectPath]"+ this.props.authRedirectPath)
        let authRedirect = null;
        if (this.props.isAuthenticated) {            
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

    return (
        <div>
            {authRedirect}
           <form className="Form">
            
            <h2 className="PurpleLable">Expense Tracker</h2>
            <br/>
            
            <h3 className="PurpleLable">Sign In </h3>
            
            <Form.Group>           
            <Form.Control type="email" placeholder="Enter email" name="emailId" onChange={(event=>this.emailId= event.target.value)} />
            </Form.Group>

            <Form.Group>
            <Form.Control type="password" placeholder="Enter Password" name="password" onChange={(event=>this.password= event.target.value)} />
            </Form.Group>           
            
            <Button variant="primary" onClick={this.loginClicked.bind(this)}>Login</Button> <br/>
   
            <Link variant="link" to='/registerUser'>Create Account </Link>
            <br/>
            {messagelabel}

            </form>            
    
        </div>
    )
    }


}

const mapStateToProps = state => {
    return {
        message: state.errorMessage, 
        authRedirectPath:state.authRedirectPath,
        isAuthenticated: state.token  !== null

    };
  };

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email,password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);


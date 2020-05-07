import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import './Login.css'
import {Button,Form} from 'react-bootstrap'

class Login extends React.Component {

    state = { 
        redirect: null,
    message: null };
    

    loginClicked(event) {

        event.preventDefault();

        const data = {
            "email":this.emailId,
            "password":this.password
        }
        
        axios.post('http://localhost:8080/auth/login', data)
        .then(res=>{

            console.log("login data"+JSON.stringify(res.data.response));

            this.setState({ redirect: "/home",
                            message :null }); 
                            
            localStorage.setItem("username",this.emailId);           
            localStorage.setItem("token",res.data.response);
                    
            
        })
        .catch(error=> {     
            
            this.setState({ redirect: "/",
                message : error.response.data.message}); 

            console.log(error.response.data.message);
        })

        

    }

    render() {

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }  

        var messagelabel = null;
          if(this.state.message) {
            messagelabel = <h6 className="MessageLabel">{this.state.message}</h6>
          }

    return (
        <div>
           
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

export default Login


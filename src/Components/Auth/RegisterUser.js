import React from 'react'
import axios from 'axios';
import {Redirect,Link } from 'react-router-dom';
import {Button,Form} from 'react-bootstrap'

class RegisterUser extends React.Component {

    state = {
        redirect : null,
        message: null
    }

    registerClicked(event) {

        event.preventDefault();

        const data = {
            id:this.id,
            name:this.userName,
            email : this.emailId,
            password : this.password
            
        }           

        axios.post('http://localhost:8080/auth/addUser',data)
        .then(res=>{

            console.log(res.data.message);

            this.setState({ redirect: "/login" ,
            message: null});             
                    
            
        }).catch(error =>{

            console.log(error);
            this.setState({ redirect: null,
                message: error.response.data.message }); 
        })
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          } 

          var messagelabel = null;
          if(this.state.message) {

            messagelabel = <h7 className="MessageLabel">{this.state.message}</h7>
          }

        return(
            <div>
            

            <form className="Form">

            <h2 className="PurpleLable">Create Account</h2>

            <Form.Group>           
            <Form.Control type="text" placeholder="Enter userId" name="id" onChange={(event=>this.id= event.target.value)} />
            </Form.Group>

            <Form.Group>
            <Form.Control type="text" placeholder="Enter Name" name="userName" onChange={(event=>this.userName= event.target.value)} />
            </Form.Group>

            <Form.Group>           
            <Form.Control type="email" placeholder="Enter email" name="emailId" onChange={(event=>this.emailId= event.target.value)} />
            </Form.Group>

            <Form.Group>
            <Form.Control type="password" placeholder="Enter Password" name="password" onChange={(event=>this.password= event.target.value)} />
            </Form.Group>  
           
            <Button variant="primary" onClick={this.registerClicked.bind(this)}>Register</Button> <br/>
            <Link variant="link" to='/login'>Already Account?</Link>
            <br/>
            {messagelabel}
            </form>
            </div>
        )
    }


}

export default RegisterUser;
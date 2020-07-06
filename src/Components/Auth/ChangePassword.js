import React from 'react';
import {Redirect } from 'react-router-dom';
import {Button,Form} from 'react-bootstrap'
import axios from 'axios';

class ForgetPassword extends React.Component {

    state = {
        redirect :null,
        message:null
    }


    changePasswordClicked() {
        
      let email = localStorage.getItem("username")  
      
      let password = this.password;
      let rePassword = this.rePassword;

      console.log(password +"..email"+rePassword+"---"+email)

        if((password === rePassword) &&
          (password && rePassword &&email) ) {

        //Here, We remove the username beacuse we saved for forgetpassword only 
        //permanent username will save when user login successfully.
        localStorage.removeItem("username")

         const data = {
            email: email,
            password: this.password
        };

        axios.post('/auth/changePassword',data)
        .then(res=>{
 
         console.log(res.data);  
             
        this.setState({
        redirect:"/login",
        message:null
        })
                
             
         }).catch(error => {
 
             console.log(error.response.data.message);
             this.setState({
                redirect:"/forgetPassword",
                message:null
             })
         })

        }
        else
        {
            this.setState({
                ...this.state,
                message:"Password and Re-password doesn't match, Please try again !"
            })
        }
        
     }


    render() {

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
          } 
       
        return ( 
        <form className="Form">
        
        <h2 className="PurpleLable">Expense Tracker</h2>
        <br/>
        
        <h3 className="PurpleLable">Change Password</h3> 
            
            <Form.Group>
            <Form.Control type="password" placeholder="Enter Password" name="password" onChange={(event=>this.password= event.target.value)}/>
            </Form.Group>            
            <Form.Group>
            <Form.Control type="password" placeholder="Re-Enter Password" name="rePassword" onChange={(event=>this.rePassword= event.target.value)}/>
            </Form.Group>

            <Button variant="primary" onClick={this.changePasswordClicked.bind(this)} >Change Password</Button> <br/>

            <h6 className="MessageLabel">{this.state.message}</h6>
         </form>
        );
    }
}

export default ForgetPassword
import React from 'react';
import {Redirect } from 'react-router-dom';
import {Button,Form} from 'react-bootstrap'
import axios from 'axios';

class ForgetPassword extends React.Component {

    state ={
        isEmailExist : false,
        securityQuestion :null,
        securityAnswer:null,
        errorMessage: null,
        redirect :null
    }

    nextClicked() {

        if(!this.state.isEmailExist) {
       
        const data = {             
            email : this.emailId             
        }          
       
        axios.post('/auth/forgetpassword',data)
        .then(res=>{

            console.log(res.data);     
            this.setState({isEmailExist:true,
                securityQuestion:res.data.response.securityQuestion,
                securityAnswer:res.data.response.securityAnswer,
                errorMessage:null,
                redirect :null
            })              
                    
            
        }).catch(error =>{

            console.log(error.response.data.message);
            this.setState({
                 isEmailExist: false,
                 errorMessage:error.response.data.message,
                securityQuestion: null,
                securityAnswer: null,
                redirect :null
             }); 
        })
    }
    else {

        
        var serverAnswer = this.state.securityAnswer.toLowerCase()
        var userAnswer = this.securityAnswer.toLowerCase()
        if(serverAnswer === userAnswer) {
           
            this.setState({
                ...this.state,
                errorMessage:null,
                redirect :"/changePassword"
            })

            //we temporarily save username and 
            //once we successfully saved passworfd we removed it 
            localStorage.setItem("username", this.emailId); 
        }
        else {

           var message = "Security answer is wrong, Please try again !"
            this.setState({
                 ...this.state,
                errorMessage:message
            })
        }

    }
   }

    render() {

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
          } 
        
        var securityQuestionForm = ( 
            <Form.Group>           
            <Form.Control type="email" placeholder="Enter email" name="emailId" onChange={(event=>this.emailId= event.target.value)} />
            </Form.Group>);
        
        if(this.state.isEmailExist) {
            
            securityQuestionForm = ( 
            <div>
            <Form.Group>           
            <Form.Control type="email" name="emailId" defaultValue = {this.emailId} readOnly />
            </Form.Group>
       
             <Form.Group>           
            <Form.Control type="text" name="securityQuestion" defaultValue= {this.state.securityQuestion} readOnly/>
            </Form.Group> 
            <Form.Group>
            <Form.Control type="password" placeholder="Enter security answer" name="securityAnswer" onChange={(event=>this.securityAnswer= event.target.value)}/>
            </Form.Group>
            </div>
            )

        }  
        var messagelabel = <h6 className="MessageLabel">{this.state.errorMessage}</h6>

        return ( 
        <form className="Form">
            
        <h2 className="PurpleLable">Expense Tracker</h2>
        <br/>
        
        <h3 className="PurpleLable">Forget Password</h3>     
              
         {securityQuestionForm}      
        
        <Button variant="primary" onClick={this.nextClicked.bind(this)}>Next</Button> <br/>
       
        <br/>
        {messagelabel}

        </form> 
         );
    }
}

export default ForgetPassword
import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import {Form,Row, Col,Button} from 'react-bootstrap'
import  Layout from '../Layout/Layout'

class UpdateExpense extends React.Component {    

    state = {
        expenseData:{
            id:null,
            email:null,
            amount: null,
            transactionDate: null,
    
            merchant: {            
            name : null,
            description : null
            },
            category : null,
            categoryLabel :null         
        },
          
        redirect : null
    }

    componentDidMount() {
        
        const AUthStr = 'Bearer '.concat(localStorage.getItem("token"))
        axios.get('/expense/updateExpense/'+this.props.match.params.id,
        { headers: {  
       
            'Authorization' : AUthStr
        }
        })
        .then(res=> {     
                                            
            this.setState({ expenseData :{
                id: res.data.response.id,
                email:res.data.response.email,
                amount: res.data.response.amount,
                transactionDate: res.data.response.transactionDate,
        
                merchant: {            
                name :  res.data.response.merchant.name,
                description : res.data.response.merchant.description
                },
                category : res.data.response.category,
                categoryLabel:res.data.response.category
            }})
           
        })
        .catch(err => {
            console.log(err)
            this.setState({ expenseData: null})
        })

    }

    updateExpenseClicked(event) {

        event.preventDefault();

        console.log(this.state.expenseData)
        
        const AUthStr = 'Bearer '.concat(localStorage.getItem("token"))
        axios.post('/expense/updateExpense/'+this.props.match.params.id,this.state.expenseData,
        { headers: {  
       
            'Authorization' : AUthStr
        }
        })
        .then(res=>{
    
            console.log(res.data.message);    
            this.setState({ redirect: '/listExpense' });           
              
            
        }).catch(error =>{
    
            console.log(error);
            this.setState({ redirect: null }); 
        })

    }
   
    handleChanged(evt) {  

        console.log("Inside handle change"+evt.target.value)

        evt.preventDefault();
        this.setState({expenseData :{
          ...this.state.expenseData,
          [evt.target.name]: evt.target.value
        }});

      }

      handleMerchantChanged(evt) {       

        evt.preventDefault();
        this.setState({expenseData :{
          ...this.state.expenseData,
          merchant :{
              ...this.state.expenseData.merchant,
              [evt.target.name]: evt.target.value
          }
          
        }});

      }
    
    render() {

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          } 

         
        return(
            <Layout>
                
                <form className="Form">
                <h3 className="PurpleLable">Update Expense</h3>   
                <Form.Group as={Row}>
                        <Form.Label column sm="2">
                        Merchant Name
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control type="text" name="name" defaultValue={this.state.expenseData.merchant.name} onChange={this.handleMerchantChanged.bind(this)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                        Expense Description
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control as="textarea" name="description" rows="4" cols="50" defaultValue={this.state.expenseData.merchant.description} onChange={this.handleMerchantChanged.bind(this)} />
                        </Col>
                    </Form.Group>               
            
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                        Amount
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control type="number" name="amount" defaultValue={this.state.expenseData.amount} onChange={this.handleChanged.bind(this)} />
                        </Col>
                    </Form.Group>
                    
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                        Date
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control type="date" name="transactionDate" defaultValue={this.state.expenseData.transactionDate} onChange={this.handleChanged.bind(this)} />
                        </Col>
                    </Form.Group>         
                 <Form.Group as={Row}>
                        <Form.Label column sm="2">
                        Choose a category
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control as="select" name="category" onChange={this.handleChanged.bind(this)}>
                        <option value="HOME_UTILITIES" selected={this.state.expenseData.category === "HOME_UTILITIES"} >HOME_UTILITIES</option>
                        <option value="DINING" selected={this.state.expenseData.category === "DINING"}>DINING</option>
                        <option value="GROCERIES" selected={this.state.expenseData.category === "GROCERIES"}>GROCERIES</option>
                        <option value="SHOPPING" selected={this.state.expenseData.category === "SHOPPING"}>SHOPPING</option>
                        <option value="ENTERTAINMENT" selected={this.state.expenseData.category === "ENTERTAINMENT"}>ENTERTAINMENT</option>
                        <option value="TRAVEL" selected={this.state.expenseData.category === "TRAVEL"}>TRAVEL</option>
                        <option value="MISC" selected={this.state.expenseData.category === "MISC"}>MISC</option>
                        </Form.Control>
                        </Col>
                    </Form.Group>                             
     
            <Button variant="primary" onClick={this.updateExpenseClicked.bind(this)}>Update Expense</Button>
            
            </form>
            </Layout>
        )
    }


}

export default UpdateExpense

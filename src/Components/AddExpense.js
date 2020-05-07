import React from 'react'
import axios from 'axios'
import  Layout from './Layout/Layout'
import {Form,Row, Col,Button} from 'react-bootstrap'

class AddExpense extends React.Component {    

    state = {
        msg : null
    }

AddExpenseClicked(event) {

    event.preventDefault();

    console.log("username--->"+localStorage.getItem("username"))

    const data= {
        
        email:localStorage.getItem("username"),
        amount: this.amount,
        transactionDate: this.date,

        merchant: {            
        name : this.merchantName,
        description : this.description        
        },
        category : this.category.value
    }

  const AUthStr = 'Bearer '.concat(localStorage.getItem("token"))
   // const Token = localStorage.getItem("token")
   console.log("AUthStr--->"+AUthStr)
    axios.post('/expense/addExpense',data,
    { headers: {        
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Header': '*',
        'Content-Type': 'application/json',
        'Authorization' : AUthStr
         }    
    })
    .then(res=>{

        console.log(res.data.message);          
        
        this.setState({msg: res.data.message})
          
        
    }).catch(error =>{

        console.log(error.data);
        this.setState({msg:null})
        
    })
    
}

    render() {

        var label = null;
        if(this.state.msg !== null)
         label = (<h6>Successfully expense added.</h6>)

        return(
              <Layout>                  
          
                <Form className="Form">
                <h3 className="PurpleLable">Add Expense</h3> 
                <Form.Group as={Row}>
                        <Form.Label column sm="2">
                        Merchant Name
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control type="text" name="merchantName" onChange={(event=>this.merchantName= event.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                        Expense Description
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control as="textarea" name="description" rows="4" cols="50" onChange={(event=>this.description= event.target.value)} />
                        </Col>
                    </Form.Group>  
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                        Amount
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control type="number" onChange={(event=>this.amount= event.target.value)} />
                        </Col>
                    </Form.Group>                    
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                        Date
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control type="date" onChange={(event=>this.date= event.target.value)} />
                        </Col>
                    </Form.Group> 
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                        Choose a category
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control as="select" name="category" defaultValue="MISC" ref = {(input)=> this.category = input}>
                        <option value="HOME_UTILITIES">HOME_UTILITIES</option>
                        <option value="DINING">DINING</option>
                        <option value="GROCERIES">GROCERIES</option>
                        <option value="SHOPPING">SHOPPING</option>
                        <option value="ENTERTAINMENT">ENTERTAINMENT</option>
                        <option value="TRAVEL">TRAVEL</option>
                        <option value="MISC">MISC</option>
                        </Form.Control>
                        </Col>
                    </Form.Group>                     

                    <Button variant="primary" onClick={this.AddExpenseClicked.bind(this)}>Add Expense</Button>
                    <br/>
                 {label}
                </Form>           
            
            
            </Layout>
           
        )
    }


}

export default AddExpense
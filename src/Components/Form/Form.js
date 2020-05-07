
import React from 'react'
import Aux from '../../hoc/Auxiliary'
import {Form,Row, Col} from 'react-bootstrap'

const form =(props) => (
     
     <Aux>
   
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
                        <Form.Control type="text" onChange={(event=>this.date= event.target.value)} />
                        </Col>
                    </Form.Group>                   
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
                        Choose a category
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control as="select" name="category" defaultValue="MISC" onChange={(event=>this.category= event.target.value)}>
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

                    </Aux>

)

export default form
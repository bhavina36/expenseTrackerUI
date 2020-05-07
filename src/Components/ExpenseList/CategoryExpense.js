import React from 'react'
import axios from 'axios'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import {Button} from 'react-bootstrap'
import TableDisplay from '../TableGenerate/TableDisplay'
import './CategoryExpense.css'


class CategoryExpense extends React.Component {


    state = {
        expenseData:[],  
        selectedCategory: null      
   
    }

    handleClicked(category) {
        
        console.log("Category--->"+ category)
        const AUthStr = 'Bearer '.concat(localStorage.getItem("token"))
        axios.get('/expense/listCategoryExpense/category/'+category,{ headers: {  
       
            'Authorization' : AUthStr
             }    
        }).then( res=> {

            const expenseList = res.data.response           
              
            this.setState({expenseData :expenseList,
                selectedCategory:category}) 
           // console.log("categoryExpense from CategoryExpense--->"+JSON.stringify(this.state.expenseData))

    
            }).catch(error =>{
    
                console.log(error);
                this.setState({expenseData :null,selectedCategory:null})                    
            })
    }

    deletehandleChanged(id) {

        //evt.preventDefault();
       console.log('ID----------->'+JSON.stringify(id));   
       
       axios.delete('http://localhost:8080/expense/deleteExpense/'+id)
        .then(res=> {                
            console.log(res.data.message)      
            
            const expenseData = this.state.expenseData.filter(data => data.id !== id);
            this.setState({ expenseData: expenseData });
        })
        .catch(err =>{
            console.log(err)           
        })   
       
    }

    render() {

        let length = (this.state.expenseData)? this.state.expenseData.length :0;
        
        let tableDisplay = (<h3> {this.state.selectedCategory} Data not available </h3>)
        
        if(length > 0) {          
            
            tableDisplay = <TableDisplay item={this.state.expenseData}  />               
                 
        }

        return (

            <div>
                <br/>
                
            <MDBContainer>
            <MDBRow>
            <MDBCol md="4">
            <Button className="button" variant="link" onClick={this.handleClicked.bind(this,"HOME_UTILITIES")}>HOME UTILITIES</Button>               
            </MDBCol>
            <MDBCol md="4">
            <Button className="button" variant="link" onClick={this.handleClicked.bind(this,"DINING")}>DINING</Button>               
            </MDBCol>   
            <MDBCol md="4">
            <Button className="button" variant="link" onClick={this.handleClicked.bind(this,"GROCERIES")}>GROCERIES</Button>               
            </MDBCol>          
            </MDBRow>
            <MDBRow>
            <MDBCol md="4">
            <Button className="button" variant="link" onClick={this.handleClicked.bind(this,"SHOPPING")}>SHOPPING</Button>               
            </MDBCol>
            <MDBCol md="4">
            <Button  className="button"variant="link" onClick={this.handleClicked.bind(this,"ENTERTAINMENT")}>ENTERTAINMENT</Button>               
            </MDBCol>   
            <MDBCol md="4">
            <Button className="button" variant="link" onClick={this.handleClicked.bind(this,"TRAVEL")}>TRAVEL</Button>               
            </MDBCol>          
            </MDBRow>
            <MDBRow>
            <MDBCol md="12">
            <Button className="button" variant="link" onClick={this.handleClicked.bind(this,"MISC")}>MISC</Button>
            </MDBCol>
            </MDBRow>
            </MDBContainer>            
        
            {tableDisplay}               

            </div>
            
        )

    }

}


export default CategoryExpense
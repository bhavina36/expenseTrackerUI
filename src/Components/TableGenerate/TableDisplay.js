import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import { MDBDataTable} from 'mdbreact';
import './TableDisplay.css'

const COLUMNS = [
  {
      label: 'Merchant Name',
      field: 'merchant_name',
     
    },
    {
      label: 'Merchant Description',
      field: 'merchant_description',
     
    },
    {
      label: 'Purchase Date',
      field: 'transactionDate',
     
    },
    {
      label: 'Category',
      field: 'category',
     
    },
    {
      label: 'Amount',
      field: 'amount',
     
    },
    {
      label: 'Update',
      field: 'update',
     
    },
    {
      label: 'Delete',
      field: 'delete',
     
    }
]

class TableDisplay extends React.Component {

    state = {
        expenseData: this.props.item        
    }

    componentDidMount() {

      this.dataFunction()
    }

    componentDidUpdate(prevProps) {

      console.log("Inside componentDidUpdate [TableDisplay]")
      
      // Typical usage (don't forget to compare props):
      if (this.props.item !== prevProps.item) {
        
        console.log("componentDidUpdate [TableDisplay]")

        this.dataFunction();
       
         
      }
    }

    dataFunction() {
      var expenseList = this.props.item
  
      for(var expense in expenseList) {

          var merchantInfo = expenseList[expense].merchant;
  
          expenseList[expense].merchant_name = merchantInfo.name;
          expenseList[expense].merchant_description = merchantInfo.description;    
          expenseList[expense].update =<Link to ={'/updateExpense/'+expenseList[expense].id}>Update</Link> 
          expenseList[expense].delete =<Button variant="danger" onClick={this.deletehandleChanged.bind(this,expenseList[expense].id)}>Delete</Button>   
      }

      this.setState({expenseData :expenseList})
    }

      

    deletehandleChanged(id) {

        //evt.preventDefault();
       console.log('ID----------->'+JSON.stringify(id));   
       
       axios.delete('http://localhost:8080/deleteExpense/'+id)
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
            
    let data ={
        columns:COLUMNS,
        rows:this.state.expenseData       
            
    }    
    
    return (

      <div>
        <MDBDataTable   
        className ="MDBtable"              
          striped
          bordered
          small
          data={data}
          searching={false}         
        />
  
        </div>
      );


    }
}    

export default TableDisplay
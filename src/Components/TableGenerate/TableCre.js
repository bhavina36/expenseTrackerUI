import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import { MDBDataTable} from 'mdbreact';
import './TableDisplay.css'


const TableCre = (props) => {
   
    let expenseList = props.item;

        for(var expense in expenseList) {

            var merchantInfo = expenseList[expense].merchant;
    
            expenseList[expense].merchant_name = merchantInfo.name;
            expenseList[expense].merchant_description = merchantInfo.description;    
            expenseList[expense].update =<Link to ={'/updateExpense/'+expenseList[expense].id}>Update</Link> 
            expenseList[expense].delete =<Button variant="danger" onClick={this.deletehandleChanged.bind(this,expenseList[expense].id)}>Delete</Button>   
        }

    
    

  function deletehandleChanged(id){

        //evt.preventDefault();
       console.log('ID----------->'+JSON.stringify(id));   
       
       axios.delete('http://localhost:8080/deleteExpense/'+id)
        .then(res=> {                
            console.log(res.data.message)      
            
           const expenseData =expenseList.filter(data => data.id !== id);           
            
        })
        .catch(err =>{
            console.log(err)           
        })   
       
    }
         
    let data ={
        columns: [
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
        ],
        rows: expenseList       
            
    }    


    return (
        <MDBDataTable   
        className ="MDBtable"              
          striped
          bordered
          small
          data={data}
          searching={false}         
        />
      );

   
}    

export default TableCre
import React from 'react'
import TableDisplay from '../TableGenerate/TableDisplay'

const ExpenseList =(props) => {

        const length = (props.expenseData)?props.expenseData.length:0;

        var tableDisplay = null

        if(length > 0) {       
               
               tableDisplay = <TableDisplay item={props.expenseData}  />                  
        }  
        else {
            tableDisplay = (<h3> Data not available </h3>)
        }        
           

        return(
            <div>
 
            {tableDisplay}
 
            </div>
        )
    
} 

export default ExpenseList
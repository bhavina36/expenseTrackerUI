import React from 'react'
import './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (

    <div>
        <ul className="NavigationItems">
        <NavigationItem link="/home" exact>Home</NavigationItem>
            <NavigationItem link="/addExpense" exact>Add Expense</NavigationItem>
            <NavigationItem link="listExpense" exact>List Expense</NavigationItem>            
            <NavigationItem link="/logout" exact>Logout</NavigationItem>
            
        </ul> 
    
    </div>
)

export default navigationItems

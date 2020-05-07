import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom'
import  Home from './Components/Home'
import Login from './Components/Auth/Login'
import RegisterUser from './Components/Auth/RegisterUser'
import AddExpense from './Components/AddExpense'
import ListExpense from './Components/ExpenseList/ListExpense'
import UpdateExpense from './Components/ExpenseList/UpdateExpense'
import ExpensePercentage from './Components/ExpenseList/ExpensePercentageChart'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/registerUser" component={RegisterUser} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/addExpense" component={AddExpense} />
        <Route exact path="/listExpense" component={ListExpense} />        
        <Route exact path="/updateExpense/:id" component={UpdateExpense} />       
        <Route exact path="/expenseCategory/" component={ExpensePercentage} />   
        <Route exact path="/logout" component={Login} />
        
        </Switch>
      
    </div>
  );
}

export default App;

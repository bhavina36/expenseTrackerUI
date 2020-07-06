import React, {Component} from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom'
import  Home from './Components/Home'
import Login from './Components/Auth/Login'
import ForgetPassword from './Components/Auth/ForgetPassword'
import ChangePassword from './Components/Auth/ChangePassword'
import RegisterUser from './Components/Auth/RegisterUser'
import AddExpense from './Components/AddExpense'
import ListExpense from './Components/ExpenseList/ListExpense'
import UpdateExpense from './Components/ExpenseList/UpdateExpense'
import ExpensePercentage from './Components/ExpenseList/ExpensePercentageChart'
import Logout from './Components/Auth/Logout'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class App extends Component {
  
  render () {

  let routes = (
    <Switch>
      <Route exact path="/Login" component={Login} />
      <Route exact path="/registerUser" component={RegisterUser} />
      <Route exact path="/forgetPassword" component={ForgetPassword} />
      <Route exact path="/changePassword" component={ChangePassword} />
      <Route exact path="/" component={Login} />
      <Redirect to="/" />
    </Switch>
  );


  console.log("isAuthenticated [App.js]"+ this.props.isAuthenticated)

  if (this.props.isAuthenticated ) {

     routes = (
        <Switch>
          <Route exact path="/Login" component={Login} />
         <Route exact path="/registerUser" component={RegisterUser} />
         <Route exact path="/forgetPassword" component={ForgetPassword} />
         <Route exact path="/changePassword" component={ChangePassword} />
          <Route exact path="/" component={Login} />        
          <Route exact path="/home" component={Home} />
          <Route exact path="/addExpense" component={AddExpense} />
          <Route exact path="/listExpense" component={ListExpense} />        
          <Route exact path="/updateExpense/:id" component={UpdateExpense} />       
          <Route exact path="/expenseCategory/" component={ExpensePercentage} />   
          <Route exact path="/logout" component={Logout} />

    </Switch>
    );
  }
  return (
    <div className="App">
      {routes}
      
    </div>
  );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token  !== null
  };
};



export default connect(mapStateToProps)(App);

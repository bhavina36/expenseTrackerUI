import React from 'react'
import Layout from '../Layout/Layout'
import axios from 'axios'
import {Tabs,Tab} from 'react-bootstrap'
import ExpensePercentageChart  from '../ExpenseList/ExpensePercentageChart'
import CategoryExpense from './CategoryExpense'
import ListAllEXpense from './ExpenseAllList'

class ListExpense extends React.Component {

    state = {
       
        data: {},
        labels: {},
        listAllData :[]        
    }

    componentDidMount() {
        this.fetchPercentageData();
        this.fetchAllData();
    }

    expenseChartTabClicked =(key) => {
         
        if(key === "list all expense") {
            this.fetchAllData();
        }
        else if(key === "expenseChart") {               
            this.fetchPercentageData();     
        }
        
   }


   fetchPercentageData() {
    var label =[]
    var data =[]
    const AUthStr = 'Bearer '.concat(localStorage.getItem("token"))
        axios.get('/expense/percentageCategory',{ headers: {  
       
            'Authorization' : AUthStr
             }    
        }).then( res=> {
                 
            const resData = res.data.response        
                  
                for(var resp in resData) {
                    
                    label.push(resp)
                    data.push(resData[resp])
                 }         
          
                 this.setState({
                     ...this.state.listAllData,
                    labels:label,
                    data:data,
                   })  

                console.log(data)
                       
                })
                .catch(error => {
        
                    console.log(error);
                    
                })     
   }


   fetchAllData(){
    console.log("Inside fetchAllData [ListExpense]")        
        
    const AUthStr = 'Bearer '.concat(localStorage.getItem("token"))
    axios.get('/expense/listExpense',{ headers: {  
       
        'Authorization' : AUthStr
         }    
    }).then( res=> {

    const data = res.data.response                 
    this.setState({
                ...this.state.data,
                  ...this.state.labels,
                listAllData :data})

    }).catch(error =>{

        console.log(error);
        this.setState({ ...this.state.data,
                  ...this.state.labels,
                   listAllData: null }); 
    })
   }
      
    render() {    
        
        const length = (this.state.data)?this.state.data.length:0;

        let expensePercentageChart = (<h3> Data not available </h3>)
        if(length > 0) {        
               
            expensePercentageChart = <ExpensePercentageChart data={this.state.data} label={this.state.labels} />    
                 
        }

        const listDataLength = (this.state.listAllData)?this.state.listAllData.length:0;

        let listAllEXpense= (<h3> Data not available </h3>)
        if(listDataLength > 0) {        
               
            listAllEXpense = <ListAllEXpense expenseData={this.state.listAllData} />;                    
        } 
        

        return (
            <Layout>

            <Tabs defaultActiveKey="list all expense" id="uncontrolled-tab-example"  onSelect={this.expenseChartTabClicked}>

            <Tab eventKey="list all expense" title="List all expense">
                {listAllEXpense}               
            </Tab>
            <Tab eventKey="expense by category" title="Expense by category">
               <CategoryExpense />
            </Tab>
            <Tab eventKey="expenseChart" title="ExpenseChart">
                 {expensePercentageChart}
            </Tab>
            </Tabs>  
             
            </Layout>
        )
    }
    }

export default ListExpense
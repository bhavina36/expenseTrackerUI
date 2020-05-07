import React from 'react'

import {Bar} from 'react-chartjs-2';
import Layout from '../Layout/Layout';

const COLORS = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00','#0000FF','#2E2B5F' ,'#8B00FF']

const ExpenseCategoryChart  = (props) => {

    console.log(JSON.stringify(props.data) +"label"+ JSON.stringify(props.label))

        let data = {
            labels: props.label,
            datasets: [
              {
                  
                label: 'Expense by Percentage',
                fill: false,
                lineTension: 0.1,
                backgroundColor: COLORS,
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: props.data,
               
              }
            ]
          }  
                    
       return (          
           <Layout>
            
        <Bar data={data} width={50} height={10} options={{ maintainAspectRatio: true ,legend :{display: false}}} />      

        </Layout>   
   
        )      

}

export default ExpenseCategoryChart
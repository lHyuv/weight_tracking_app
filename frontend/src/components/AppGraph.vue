<template>
  <div>
    <form @submit.prevent = "compareWeight">
    <label class = 'form-label'> Compare </label>
    <input id = 'target_weight' class = 'form-control' type = 'number' required placeholder = "Enter target weight in kg..">
    <button class = 'btn btn-success float-right' id = 'check_btn' > Check</button>
    </form>
    <canvas id="this_chart"></canvas>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import Chart from 'chart.js';
import axios from 'axios';
import Env from '../assets/env.js';
import moment from 'moment';
let apiURL = Env.baseURL;
let labels = new Array();
let datasets = new Array();
let target_datasets = new Array();
axios.get(apiURL)
.then((res)=>{

  
    res.data.data.forEach((val)=>{
    labels.push(moment(val.createdAt).format('MMMM Do YYYY'));
    datasets.push(val.current_weight);
    target_datasets.push(0);
    console.log(val);
    })

})
.catch((err)=>{
  console.log(err);
})
const graphData = {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Current Weight",
          data: datasets,
          backgroundColor: "rgba(54,73,93,.5)",
          borderColor: "#36495d",
          borderWidth: 3
        },
    
        {
          label: "Target Weight",
          data: target_datasets,
          backgroundColor: "rgba(71, 183,132,.5)",
          borderColor: "#47b784",
          borderWidth: 3
        }
        
      ]
    },
    options: {
      responsive: true,
      lineTension: 1,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              padding: 25
            }
          }
        ]
      }
    }
  };

export default {
  name: 'AppGraph',
  created(){
    
  },
  data() {
    return {
     graphData: graphData
    }
  },
  mounted() {
    const ctx = document.getElementById('this_chart');
    new Chart(ctx, this.graphData);
  },
  methods:{
    compareWeight(){

        target_datasets.forEach((val,i)=>{
          target_datasets[i] = document.getElementById('target_weight').value;
        })
        const ctx = document.getElementById('this_chart');
        new Chart(ctx, this.graphData);
      
    }
  }

}
</script>



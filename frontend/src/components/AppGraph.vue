<template>
  <div>
    <form @submit.prevent = "compareWeight">
   

    <div class = "row">
      <div class = "col-md-12">
      <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseForm" role="button" aria-expanded="false" aria-controls="collapseExample">
    Compare
      </a>
      </div>
    </div>
      <div class="collapse" id="collapseForm">
      <div class = "row">
        <div class = "col-md-4">
   
    <input id = 'target_weight' class = 'form-control' type = 'number' required placeholder = "Enter target weight in kg..">
         </div>
        <div class = "col-md-3">
       <button class = 'btn btn-success float-right' id = 'check_btn' > Check</button>
        </div>
       
      </div>
  </div>
    </form>

    <hr>
    <canvas id="this_chart"></canvas>
  </div>
</template>

<script>
//
import "jquery/dist/jquery.min.js";
import "@popperjs/core";
import 'bootstrap/js/dist/collapse'; //collapse js
//
import "bootstrap/dist/css/bootstrap.min.css";
import Chart from 'chart.js';
import axios from 'axios';
import Env from '../assets/env.js';
import moment from 'moment';
let apiURL = Env.baseURL + '/active';
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
  //
  props : ["title"],
  //
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
<style>
a[role=button]{
  margin: 10px;
}
</style>



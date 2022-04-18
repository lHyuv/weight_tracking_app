<template>
  <div class="home">
    <AppHeader></AppHeader>
    <div class = "row">
      <div class = "col-md-4">
    <AppCard :title=title1 :value=value1></AppCard>
    </div>
       <div class = "col-md-4">
    <AppCard :title=title2 :value=value2></AppCard>
    </div>
      <div class = "col-md-4">
    <AppCard :title=title3 :value=value3></AppCard>
    </div>

    </div>
    <div class = "row">
     <div class = "col-md-4">
    <AppCard :title=title4 :value=value4></AppCard>
    </div>
            <div class = "col-md-4">
    <AppCard :title=title6 :value=value6></AppCard>
    </div>
        <div class = "col-md-4">
    <AppCard :title=title5 :value=value5></AppCard>
    </div>
    </div>

       <hr>
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
   
    <input id = 'target_weight' step = '0.01' class = 'form-control' type = 'number' required placeholder = "Enter target weight in kg..">
         </div>
        <div class = "col-md-3">
       <button class = 'btn btn-success float-right' id = 'check_btn' > Check</button>
        </div>
       
      </div>
          <AppProgressBar :value=progress :unit=unit :initial=initial_value  :target=target_value :key=progress_ctr></AppProgressBar>
          <div class="alert alert-primary" role="alert"><i> {{progress_msg}}</i></div>
  </div>
    </form>

 
    <AppGraph :graphData=graphData1 :chart_id=chart_id1 :key=graphResetCtr1></AppGraph>
     <AppGraph :graphData=graphData2 :chart_id=chart_id2></AppGraph>
     <AppGraph :graphData=graphData3 :chart_id=chart_id3></AppGraph>
  </div>
</template>

<script>
// @ is an alias to /src

import AppHeader from '@/components/AppHeader.vue'
import AppGraph from '@/components/AppGraph.vue'
import AppCard from '@/components/AppCard.vue'
import AppProgressBar from '@/components/AppProgressBar.vue'
import Env from '../assets/env.js';
import axios from 'axios';

//
import moment from 'moment';
import "bootstrap/dist/css/bootstrap.min.css";
import Chart from 'chart.js';

let apiURL = Env.baseURL + '/active';
let labels = new Array();
let datasets = new Array();
let target_datasets = new Array();
let month_datasets = new Array(); for(let i = 0; i < 12; i++){month_datasets.push(0);}
let month_labels = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","OCT","NOV","DEC"];
let status_arr = [0,0,0];

axios.get(apiURL)
.then((res)=>{

  
    res.data.data.forEach((val,i)=>{
    labels.push(moment(val.createdAt).format('MMMM Do YYYY'));
    datasets.push(val.current_weight);
    target_datasets.push(0);
    console.log(val);

    //
    if(new Date(val.createdAt).getFullYear() === new Date().getFullYear()){
    switch(new Date(val.createdAt).getMonth() + 1){
      case 1: month_datasets[0] += parseFloat(val.current_weight); break;
      case 2: month_datasets[1] += parseFloat(val.current_weight); break;
      case 3: month_datasets[2] += parseFloat(val.current_weight); break;
      case 4: month_datasets[3] += parseFloat(val.current_weight); break;
      case 5: month_datasets[4] += parseFloat(val.current_weight); break;
      case 6: month_datasets[5] += parseFloat(val.current_weight); break;
      case 7: month_datasets[6] += parseFloat(val.current_weight); break;
      case 8: month_datasets[7] += parseFloat(val.current_weight); break;
      case 9: month_datasets[8] += parseFloat(val.current_weight); break;
      case 10: month_datasets[9] += parseFloat(val.current_weight); break;
      case 11: month_datasets[10] += parseFloat(val.current_weight); break;
      case 12: month_datasets[11] += parseFloat(val.current_weight); break;
    }
    }
    //
    //
          if(i != 0){
          if(val.current_weight > res.data.data[i - 1].current_weight){

            status_arr[0]++;
          }else if(val.current_weight < res.data.data[i - 1].current_weight){
           status_arr[1]++;
          }else{
           status_arr[2]++;
          }
          }

       
    //
    });

    month_datasets.forEach((val,i)=>{
      month_datasets[i] = parseFloat(val/2);
    })

})
.catch((err)=>{
  console.log(err);
})
const graphData1 = {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Current Weight by Date",
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
  let graphData2 = {
    type: "bar",
    data: {
      labels: month_labels,
      datasets: [
        {
          label: "Current Weight by Month",
          data: month_datasets,
          backgroundColor: "rgba(54,73,93,.5)",
          borderColor: "#36495d",
          borderWidth: 3
        },
    

        
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

   let graphData3 = {
    type: "doughnut",
    data: {
      labels: [`Increased`,`Decreased`,`No change`],
      datasets: [
        {
          label: "Status",
          data: status_arr,
          backgroundColor: ["#1d7874","#f67e7d","b23a48"],
          borderColor: "#36495d",
          borderWidth: 3
        },
    

        
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
//
export default {
  name: 'Graph',
  components: {
    AppHeader,
    AppGraph,
    AppCard,
    AppProgressBar
  },
  data(){
    return {
      Weights: [],
      title1: "Current Weight",
      value1: "",
      title2: "Days weight increased",
      value2: "",
      title3: "Days weight decreased",
      value3: "",
      title4: "Total lost weight",
      value4: "",
      title5: "Rate",
      value5: "",
      graphData1: graphData1,
      graphData2: graphData2,
      graphData3: graphData3,
      chart_id1: "chart1",
      chart_id2: "chart2",
      chart_id3: "chart3",
      graphResetCtr1: 0,
      progress: 0,
      progress_ctr: 0,
      target_value: 0,
      unit: " kg",
      initial_value: 0,
      progress_msg: "Set a target weight to compare",
      title6: "Lost weight today",
      value6: "",
    }
  },
  mounted(){
    const apiURL = Env.baseURL + '/active';
      let increased = 0;
      let decreased = 0;
      let initial = 0;
      let current = 0;
      let lost = 0;
      let lost_today = 0;
    axios.get(apiURL)
    .then((res)=>{
      this.Weights = res.data.data;
       
       if(res.data.data.length > 0){
 current = this.Weights[this.Weights.length - 1].current_weight;
      res.data.data.map((val,i)=>{
        if(i != 0){
          if(val.current_weight > res.data.data[i - 1].current_weight){
            increased++;
          }else if(val.current_weight < res.data.data[i - 1].current_weight){
            decreased++;
          }
        }else{
          initial = val.current_weight;
        }
        
        if(res.data.data.length == i + 1 && 
        moment(val.createdAt).format('MMMM Do YYYY')
        ==
        moment(new Date()).format('MMMM Do YYYY')
        && res.data.data.length > 1){
               console.log(i)
           lost_today = val.current_weight - res.data.data[i - 1].current_weight
      
        }
        else{
          lost_today = 0;
        }
      })
       }
     
      lost = current - initial;

      this.value1 = current.toFixed(2) + " kg";
      this.value2 = increased;
      this.value3 = decreased;
      this.value4 = lost.toFixed(2) + " kg";
      if(lost && initial && lost_today){
      this.value5 = (lost / initial * 100).toFixed(2) + " %";
      this.progress_ctr=this.progress_ctr+1;
   
      this.initial_value = initial;

      this.target_value = current;
  
      this.value6 = lost_today.toFixed(2) + " kg";

      
      }else{
        
        this.value5 = (0).toFixed(2)  + " %";
        this.value6 = (0).toFixed(2) + " kg";
      }
         this.progress = current;
    })
    .catch((err)=>{
      this.$toast.error("Something went wrong");
      console.log(err);
    });


  },
  methods: {
        compareWeight(){

      //  this.progress = parseFloat(document.getElementById('target_weight').value) ;
        this.target_value = parseFloat(document.getElementById('target_weight').value) ;
        
        this.progress_ctr=this.progress_ctr+1;
        
            if(parseFloat(document.getElementById('target_weight').value) > this.progress ){
              this.progress_msg = `You need more ${parseFloat((document.getElementById('target_weight').value) - this.progress).toFixed(2)} kg to reach your target weight.`;
            } else if(parseFloat(document.getElementById('target_weight').value) < this.progress ){
               this.progress_msg = `You need to lose ${(this.progress - parseFloat(document.getElementById('target_weight').value)).toFixed(2)} kg to reach your target weight.`;
            }else{
              this.progress_msg = `Set a better target weight to compare`
            }
        target_datasets.forEach((val,i)=>{
          target_datasets[i] = document.getElementById('target_weight').value;
        })
        this.graphResetCtr1 = this.graphResetCtr1+1;
        const ctx = document.getElementById(graphData1);
        new Chart(ctx, graphData1);

    },

  }

}
</script>
<style>
a[role=button]{
  margin: 10px;
}
</style>
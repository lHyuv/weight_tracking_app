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
    <AppCard :title=title5 :value=value5></AppCard>
    </div>
    </div>
    <AppGraph></AppGraph>
 
  </div>
</template>

<script>
// @ is an alias to /src

import AppHeader from '@/components/AppHeader.vue'
import AppGraph from '@/components/AppGraph.vue'
import AppCard from '@/components/AppCard.vue'
import Env from '../assets/env.js';
import axios from 'axios';
export default {
  name: 'Graph',
  components: {
    AppHeader,
    AppGraph,
    AppCard
  },
  data(){
    return {
      Weights: [],
      title1: "Current Weight",
      value1: "",
      title2: "No of times weight increased",
      value2: "",
      title3: "No of times weight decreased",
      value3: "",
      title4: "Total lost weight",
      value4: "",
      title5: "Rate",
      value5: ""
    }
  },
  mounted(){
    const apiURL = Env.baseURL;
      let increased = 0;
      let decreased = 0;
      let initial = 0;
      let current = 0;
      let lost = 0;
    axios.get(apiURL)
    .then((res)=>{
      this.Weights = res.data.data;
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
      
      lost = current - initial;

      this.value1 = current.toFixed(2) + " kg";
      this.value2 = increased;
      this.value3 = decreased;
      this.value4 = lost.toFixed(2) + " kg";
      this.value5 = (lost / initial * 100).toFixed(2) + " %";
      })
    })
    .catch((err)=>{
      console.log(err);
    })
  }

}
</script>

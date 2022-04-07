<template>
<table class = 'table'>
<thead>
<tr>
<th>
Name
</th>
<th>
Date
</th>
<th>
Weight
</th>
<th>
Log
</th>
</tr>
</thead>
<tbody>
<tr v-for = "weight  in Weights.data" :key="weight._id">
<td>{{weight.name}}</td>
<td>{{weight.createdAt}}</td>
<td>{{weight.current_weight}}</td>
<td>{{weight.log}}</td>
</tr>
</tbody>
</table>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import Env from "../assets/env.js";
import axios from "axios";
export default {
  name: 'AppTable',
  data(){
    return {
      Weights: []
    }
  },
  created(){
    let apiURL = Env.baseURL;
    axios.get(apiURL)
    .then((res)=>{
      this.Weights = res.data // could be res, but the api returns this format: {error, data, message}
    })
    .catch((err)=>{
      console.log(err)
    })
  }
}
</script>



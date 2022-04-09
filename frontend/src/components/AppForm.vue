<script>
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Env from "../assets/env.js";

export default {
  name: 'AppForm',
  data(){
    return {
      weight : {
        name: '',
        current_weight: '',
        log: ''
      }
    }

  
  },
  methods : {
    submitForm(){
      const apiURL = Env.baseURL;
      axios.post(apiURL,this.weight)
      .then(()=>{
        this.$router.push('/table');
        this.weight = {
          name: '',
          current_weight: '',
          log: ''
        }
        console.log("Success")
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  }

}
</script>
<template>
<form @submit.prevent = "submitForm">
<label class = 'form-label'> Name </label>
<input  v-model = "weight.name" id = 'weight' class = 'form-control' type = 'text' required placeholder = "Enter name..">
<label class = 'form-label'> Weight <sub>( in kg )</sub> </label>
<input v-model = "weight.current_weight" id = 'weight' class = 'form-control' type = 'number' step = '0.01' required placeholder = "Enter weight..">
<label class = 'form-label'> Logs</label>
<textarea v-model = "weight.log" id = 'logs' rows = '3'  class = 'form-control' placeholder = "Enter activities, foods, or any details you want to share..">
</textarea>
<button class = 'btn btn-success float-right' id = 'submit_btn'> Submit </button>
</form>

</template>
<style>
.btn-success{
  float: right;
  margin: 10px;
}
</style>





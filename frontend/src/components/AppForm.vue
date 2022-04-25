<script>
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Env from "../assets/env.js";
import moment from "moment";

export default {
  name: 'AppForm',
  data(){
    return {
      weight : {
       // name: '',
        current_weight: '',
        log: '',
      }
    }

  
  },
  created(){
    let date_arr = new Array();
    const apiURL = Env.baseURL + "/weight/active";
    axios.get(apiURL)
    .then((res)=>{
      if(res.data.data.length != 0){
        res.data.data.forEach((val)=>{
          date_arr.push(moment(new Date(val.createdAt)).format("MMM Do YYYY"))
        })
      }
      if(date_arr.includes(moment(new Date()).format("MMM Do YYYY"))){
   
        this.$toast.info("You already have logged this day")

     
       this.$router.push('/table')
      }

    })
    .catch((err)=>{
      this.$toast.error("Something went wrong");
      console.log(err);
    })
  },
  methods : {
    submitForm(){
      const apiURL = Env.baseURL + '/weight';

    this.weight['user'] = sessionStorage.getItem('user_id');
    console.log(this.weight);
      axios.post(apiURL,this.weight)
      .then(()=>{
        this.$router.push('/table');
        this.weight = {
        //  name: '',
          current_weight: '',
          log: '',
        }
        this.$toast.success("Answer submitted")
      })
      .catch((err)=>{
        this.$toast.error("Something went wrong");
       console.log(err)
      })
    }
  }

}
</script>
<template>
<form @submit.prevent = "submitForm">
<!--
<label class = 'form-label'> Name </label>
<input  v-model = "weight.name" id = 'weight' class = 'form-control' type = 'text' required placeholder = "Enter name..">
-->
<label class = 'form-label'> Weight <sub>( in kg )</sub> </label>
<input v-model = "weight.current_weight" id = 'weight' class = 'form-control' type = 'number' step = '0.01' required placeholder = "Enter weight..">
<label class = 'form-label'> Logs</label>
<textarea v-model = "weight.log" id = 'logs' rows = '3'  class = 'form-control' placeholder = "Enter activities, foods, or any details you want to share..">
</textarea>
<button class = 'btn btn-success float-right' id = 'submit_btn'> Submit </button>
</form>

</template>
<style>
button{
 margin-bottom: 3px; 
}
#submit_btn{
  float: right;
  margin: 10px;
}

</style>





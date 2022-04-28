<script>
import AppHeader from '../components/AppHeader.vue';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Env from "../assets/env.js";


export default {
  name: 'Account',
  components: {
      AppHeader
  },
  data(){
    return {
      user : {
       // name: '',
        user_name: '',
      //  status: ''
      }
    }

  
  },

  methods : {
    changeUser(){
    if(this.user.user_name.length < 8){
        this.$toast.error("Username can't be less than 8 characters")
    }
    else if(this.user.user_name.indexOf(' ') >= 0){
        this.$toast.error("Username can't have whitespace")
    }else{
 sessionStorage.setItem('username', this.user.user_name);
    const apiURL = Env.baseURL  + '/user/' + sessionStorage.getItem('user_id');
    axios.put(apiURL, this.user)
    .then(()=>{
        this.user = {
            user_name: ''
        };
       
       this.$toast.info("Update successful");

       this.$router.push('/');

    })
    .catch((err)=>{
      this.$toast.error("Username already taken");
      console.log(err);
    })
       }
    },
     deleteAccount(){

    const apiURL = Env.baseURL  + '/user/' + sessionStorage.getItem('user_id');
    axios.delete(apiURL)
    .then(()=>{
 
       this.$toast.info("Delete successful");

         this.$router.push('/login');

    })
    .catch((err)=>{
      this.$toast.error("Something went wrong");
      console.log(err);
    })
 
  }
  },
 

}
</script>
<template>
<div>
<AppHeader></AppHeader>
<div class = "card card-primary">

<form @submit.prevent = "changeUser">


<label class = 'form-label'> Change Username</label>
<input v-model = "user.user_name" id = 'username' class = 'form-control' type = 'text'  required placeholder = "Enter new username..">

<button class = 'btn btn-success float-right' id = 'submit_btn'> Submit </button>

</form>
</div>
<button class = "btn btn-secondary" style = "float: right; margin-top: 10px;"
 data-bs-toggle = "modal" data-bs-target = "#confirmDelete">Delete account</button>
    <div class = "modal fade" id = "confirmDelete">
      <div class="modal-dialog">
      <div class="modal-content bg-light">
    <div class = "modal-header">
            Confirmation
                <button class="btn btn-close" data-bs-dismiss="modal" aria-label="Close">
            </button>
    </div>
    <div class = "modal-body">
      <p>Are you sure you want to delete your account?</p>
    </div>
    <div class = "modal-footer">
    </div>
    <div class = "row">
      <div class = "col-md-7">
          <span></span>
      </div>
       <div class = "col-md-2">
          <button type="button" class="btn btn-default" data-bs-dismiss="modal">Cancel</button>
       </div>
        <div class = "col-md-3">
            <button data-bs-dismiss="modal" class = "btn btn-primary" @click.prevent = "deleteAccount" > Delete</button>
        </div>
    </div>
    </div>
     </div>
</div>
</div>

</template>
<style>
button{
 margin-bottom: 3px; 
}
#submit_btn{
  float: right;
  margin: 10px;
}
.card-primary{
    padding: 25px;
}
</style>





<template>
<div class = "row">
<div class = "col-md-3">
</div>
<div class = "col-md-6 text-center">
<form @submit.prevent = "userForm">
  <h1>Weight Tracking App</h1>

<input type = 'text' v-model = "user.user_name" id = 'username' required class = 'form-control' placeholder = "Enter previous or new username..">

<button class = 'btn btn-success float-right'> Continue </button>
</form>
<div class = "col-md-3">
</div>
</div>
</div>
</template>
<script>
import axios from 'axios';
import Env from "../assets/env.js";
export default{
    name: "Login",

    data(){
        return {
            user: {
                username: ''
            }
        }
    },
    methods:{
        userForm(){
            let apiURL = Env.baseURL +'/user';

            sessionStorage.setItem('user_name', null);
            sessionStorage.setItem('user_id', null);
            if(this.user.user_name.length < 8){
            this.$toast.error("Username should be more than 8 characters");
            }else if(this.user.user_name.indexOf(' ') >= 0){
                this.$toast.error("Username can't have whitespace")
            }else{
            axios.get(apiURL + '/find/' + this.user.user_name)
            .then((res)=>{
                if(res.data.data.length == 0){
                    
                    this.$toast.success("User not found, registration successful");

                    axios.post(apiURL, this.user)
                    .then((res)=>{
            
                    sessionStorage.setItem('username', this.user.user_name);
                    sessionStorage.setItem('user_id', res.data.data._id);
          
              
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                }else{
                    sessionStorage.setItem('username', this.user.user_name);
                    sessionStorage.setItem('user_id', res.data.data[0]._id);
                    this.$toast.success("Login success");
                }


                    this.$router.push('/');
          
            })
            .catch((err)=>{
                this.$toast.error("Something went wrong");
                console.log(err)
            })
            }
        }
    }
    
}
</script>
<style scoped>
button{
 margin-bottom: 3px; 
  float: right;
  margin: 10px;
}
h1{
    margin-bottom: 15px;
}

</style>
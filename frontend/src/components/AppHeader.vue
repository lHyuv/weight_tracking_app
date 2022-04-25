<template>
  <div>
  <header class = "navbar navbar-light justify-content-between flex-nowrap flex-row">
  <h1>Weight Tracking App</h1>
    <ul class = "nav navbar-nav flex-row float-right">
  <li class = "nav-item">
  <router-link class = "nav-link pr-3" to = "/"> Home</router-link>
  </li>
  <li class = "nav-item">
  <router-link class = "nav-link" to = "/table"> Table</router-link>
  </li>
  <li class = "nav-item">
  <router-link class = "nav-link" to = "/graph"> Results</router-link>
  </li>
    <li class = "nav-item">
  <span class = 'nav-link' role = 'button' data-bs-toggle="modal" data-bs-target="#confirmLogout">Logout</span>
  </li>
  </ul>
  
  </header>
  <hr>

    <div class = "modal fade" id = "confirmLogout">
      <div class="modal-dialog">
      <div class="modal-content bg-light">
    <div class = "modal-header">
            Confirmation
                <button class="btn btn-close" data-bs-dismiss="modal" aria-label="Close">
            </button>
    </div>
    <div class = "modal-body">
      <p>Are you sure you want to logout?</p>
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
          <!--
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" id="changeStatus" @click.prevent="resetData">Ok</button>
          -->
            <button data-bs-dismiss="modal" class = "btn btn-primary" @click.prevent = "this.$router.push('/login')" > Logout</button>
        </div>
    </div>
    </div>
     </div>
      </div>
</div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
export default {
  name: 'AppHeader',
  created(){
     document.title = "Weight Tracking App";
     if(sessionStorage.getItem('user_name') == null){
       this.$router.push('/login');
     }
  }
}
</script>
<style>
li,label{
  margin: 10px;
}
</style>



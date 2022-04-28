<template>
  <div>
  <header class = "navbar navbar-light justify-content-between flex-nowrap flex-row">
      <h1>Weight Tracking App</h1>
     <nav class="main-header navbar navbar-expand navbar-white navbar-light">

    <ul class = "nav navbar-nav flex-row float-right">
  <li class = "nav-item">
  <router-link class = "nav-link pr-3" to = "/"> Home</router-link>
  </li>
  <li class = "nav-item">
  <router-link class = "nav-link" to = "/table"> History</router-link>
  </li>
  <li class = "nav-item">
  <router-link class = "nav-link" to = "/graph"> Results</router-link>
  </li>

       <li class="nav-item dropdown">
       <span class="nav-link" data-bs-toggle="dropdown" role="button">
         Settings&nbsp;<i class="fas fa-caret-down"></i>
         <!-- <span class="badge badge-warning navbar-badge">15</span> -->
     </span>
       <div class="dropdown-menu">
         <a class="dropdown-item d-flex align-items-center" tabindex="-1" href="javascript:void(0);">
           <div class="mr-3" style="width: 1.25rem">
             <i class="fas fa-user"></i>
         </div>
         <span>{{ username }}</span></a>
         <div class="dropdown-divider"></div>
         <a href = 'javascript:void(0);' tabindex="-1" 
         class="dropdown-item d-flex align-items-center" 
         data-bs-toggle="modal" data-bs-target="#confirmLogout" >
         <div class="mr-3" style="width: 1.25rem">
           <i class="fas fa-sign-out-alt"></i>
       </div>
         <span>Logout</span></a>
       </div>
     </li>
  </ul>
     </nav>
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
import "bootstrap/js/dist/dropdown";
export default {
  name: 'AppHeader',
  data(){
    return {
      username: sessionStorage.getItem('username')
    }
  },
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



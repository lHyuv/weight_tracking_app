<template>
  <div class="home">

    <AppHeader></AppHeader>
    <button class = 'btn btn-primary' role = 'button' data-bs-toggle="modal" data-bs-target="#confirmReset">Reset Progress</button>
     <AppTable :key="reset_key"></AppTable>
    <div class = "modal fade" id = "confirmReset">
      <div class="modal-dialog">
      <div class="modal-content bg-light">
    <div class = "modal-header">
            Confirmation
                <button class="btn btn-close" data-bs-dismiss="modal" aria-label="Close">
            </button>
    </div>
    <div class = "modal-body">
      <p>Are you sure you want to reset all data?</p>
    </div>
    <div class = "modal-footer">
    </div>
    <div class = "row">
      <div class = "col-md-8">
          <span></span>
      </div>
       <div class = "col-md-2">
          <button type="button" class="btn btn-default" data-bs-dismiss="modal">Cancel</button>
       </div>
        <div class = "col-md-2">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" id="changeStatus" @click.prevent="resetData">Ok</button>
        </div>
    </div>
    </div>
     </div>
      </div>
  </div>

</template>

<script>
// @ is an alias to /src

import AppHeader from '@/components/AppHeader.vue'
import AppTable from '@/components/AppTable.vue'
import axios from 'axios';
import Env from '../assets/env.js';
//
import 'bootstrap/js/dist/modal'; 
import $ from "jquery";

export default {
  name: 'Table',
  components: {
    AppHeader,
    AppTable
  },
  data(){
    return {reset_key: 0}
  },
  methods: {
    resetData(){

     
      let apiURL = Env.baseURL + '/reset';
      axios.delete(apiURL)
      .then(()=>{
      this.reset_key = this.reset_key+1;
     // this.$forceUpdate();
        console.log("Deleted");
        $('table').DataTable().destroy();
        this.$toast.success("Reset success")

      })
      .catch((err)=>{
        this.$toast.error("Something went wrong");
        console.log(err)
      })
    
    }
  }

}
</script>

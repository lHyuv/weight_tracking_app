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
Status
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
<td><b>{{weight.name}}</b></td>
<td>{{weight.createdAt}}</td>
<td><span :class = "weight.badge_class">{{weight.status}}</span></td>
<td>{{weight.current_weight.toFixed(2)}} kg </td>
<td width = "40%"><i>{{weight.log}}</i></td>
</tr>
</tbody>
</table>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import Env from "../assets/env.js";
import axios from "axios";
import moment from "moment";

//datatable
import "jquery/dist/jquery.min.js";
import "datatables.net-dt";
import $ from "jquery";

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
      console.log(res.data.data);
      res.data.data.map((val)=>{
      val['createdAt'] = moment(val['createdAt']).format('MMMM Do YYYY');
      })


      //add status
      res.data.data.forEach((val,i)=>{
        if(i == 0){
          res.data.data[i]['status'] = 'Initial weight';
          res.data.data[i]['badge_class'] = 'badge bg-info';
        }else{
          if(val.current_weight > res.data.data[i - 1].current_weight){

            res.data.data[i]['status'] = 'Increased +';
            res.data.data[i]['badge_class'] = 'badge bg-success';
          }else if(val.current_weight < res.data.data[i - 1].current_weight){
           res.data.data[i]['status'] = 'Decreased -';
           res.data.data[i]['badge_class'] = 'badge bg-warning';
          }else{
           res.data.data[i]['status'] = 'No change';
           res.data.data[i]['badge_class'] = 'badge bg-info';
          }
        }
      })
      console.log(res.data.data)
      this.Weights = res.data;
      
    })
    .then(()=>{
        $('table').DataTable().destroy();
        $('table').dataTable({
            "order": ["Status"],
            "responsive" : true,
            "autoWidth" : false,
            "pageLength" : 10,
            "bDestroy" : true,
            "destroy" : true,
            "serverSide" : false,
            "bInfo" : false,
            "info" : false,
            "bPaginate" : true,
            "bFilter" : true,
            "lengthChange":true
        });

        $('.paginate_button').css('margin','2px');
        $('.dataTables_filter').css('margin','2px')
        $('input[type=search]').css('margin','2px')
    })
    .catch((err)=>{
      console.log(err)
    })
  },

}
</script>



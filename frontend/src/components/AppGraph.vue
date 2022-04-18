<template>
  <div>

    <canvas v-bind:id=chart_id></canvas>
  </div>
</template>

<script>
//
import "jquery/dist/jquery.min.js";
import "@popperjs/core";
import 'bootstrap/js/dist/collapse'; //collapse js
import Chart from 'chart.js';
//




export default {
  name: 'AppGraph',

 
  props : ["title","graphData", "chart_id"],
  mounted(){
    const ctx = document.getElementById(this.chart_id);
    new Chart(ctx, this.graphData);
  }


}
</script>




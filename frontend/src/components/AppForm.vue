<script>
import "bootstrap/dist/css/bootstrap.min.css";
export default {
  name: 'AppForm',

}
</script>
<template>
<form>
<label class = 'form-label'> Name </label>
<input id = 'weight' class = 'form-control' type = 'text' required placeholder = "Enter name..">
<label class = 'form-label'> Weight </label>
<input id = 'weight' class = 'form-control' type = 'number' step = '0.01' required placeholder = "Enter weight..">
<label class = 'form-label'> Logs</label>
<textarea id = 'logs' rows = '3'  class = 'form-control' placeholder = "Enter activities, foods, or any details you want to share..">
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





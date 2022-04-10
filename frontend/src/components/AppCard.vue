<template>
<div>

 <section class = "card  col-lg-12">
 
    <div class="card-header">
      <h4 class="card-title">

         {{title}}
      </h4>

    </div>
    <!-- /.card-header -->
    <div class="card-body">

    {{value}}
    </div>
    

</section>
</div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  name: 'AppCard',
  props: ['title','value'],


}
</script>
<style>
.card{
    margin: 5px;
}
</style>



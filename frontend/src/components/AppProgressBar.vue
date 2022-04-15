<template>
    <div>

    <h5>Progress </h5>
    <div class="progress" style = "width:100%; height:50px">

        <div class="progress-bar" role="progressbar" v-bind:style=value_template v-bind:aria-valuenow=value v-bind:aria-valuemin=initial aria-valuemax="100"><i><small>{{value}} {{unit}}</small></i></div>
    </div>

    </div>
</template>
<script>

export default{
    name: "AppProgressBar",
    props: ["value","unit", "target","initial"],
    data(){
        return{
            value_template : this.value < this.target ? `width: ${(this.value / this.target) * 100}%` : `width: ${(this.target / this.value) * 100}%`,

        }
        
    },
    



}
</script>
<style>
h5{
    margin-top: 5px;
}
</style>
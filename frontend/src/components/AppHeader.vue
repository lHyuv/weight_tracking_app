<template>
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
  <router-link class = "nav-link" to = "/graph"> Graph</router-link>
  </li>
  </ul>
  </header>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
export default {
  name: 'AppHeader',

}
</script>
<style>
li,label{
  margin: 10px;
}
</style>



<template>
  <div class="home">
    <AppHeader></AppHeader>
    <AppForm> </AppForm>
  </div>
</template>

<script>
// @ is an alias to /src
import AppForm from '@/components/AppForm.vue'
import AppHeader from '@/components/AppHeader.vue'
export default {
  name: 'Home',
  components: {
    AppForm,
    AppHeader
  }
}
</script>

<template>
  <div class="home">
    <AppHeader></AppHeader>
    <AppGraph></AppGraph>
  </div>
</template>

<script>
// @ is an alias to /src

import AppHeader from '@/components/AppHeader.vue'
import AppGraph from '@/components/AppGraph.vue'
export default {
  name: 'Graph',
  components: {
    AppHeader,
    AppGraph
  }

}
</script>

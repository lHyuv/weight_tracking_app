<template>
  <div class="home">
    <AppHeader></AppHeader>
     <AppTable></AppTable>
  </div>
</template>

<script>
// @ is an alias to /src

import AppHeader from '@/components/AppHeader.vue'
import AppTable from '@/components/AppTable.vue'
export default {
  name: 'Table',
  components: {
    AppHeader,
    AppTable
  }

}
</script>

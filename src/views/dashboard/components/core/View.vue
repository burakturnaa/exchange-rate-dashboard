<template>
  <v-content>

    <router-view />

    <dashboard-core-footer absolute="true" />
  </v-content>
</template>

<script>
  export default {
    name: 'DashboardCoreView',

    components: {
      DashboardCoreFooter: () => import('./Footer'),
    },
  }
</script>

<style scope>
  
</style>

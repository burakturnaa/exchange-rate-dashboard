<template>
  <v-app>
    <dashboard-core-app-bar />
    <dashboard-admin-drawer  v-if="isAdmin && !isResetPassword"/>
    <dashboard-core-drawer  v-if="!isAdmin && !isResetPassword"/>
    <dashboard-core-view />

    <!-- <dashboard-core-settings /> -->
  </v-app>
</template>

<script>
  
  export default {
    name: 'DashboardIndex',

    components: {
      DashboardCoreAppBar: () => import('./components/core/AppBar'),
      DashboardCoreDrawer: () => import('./components/core/Drawer'),
      DashboardAdminDrawer: () => import('./components/core/DrawerAdmin'),
      // DashboardCoreSettings: () => import('./components/core/Settings'),
      DashboardCoreView: () => import('./components/core/View'),
    },

    data: () => ({
      expandOnHover: false,
      isAdmin : false,
      isResetPassword : false,
    }),
    created() {
       //
        // let token = this.$route.query.t;
        // localStorage.token = token;

         //  console.log(this.$route.path);
      //  console.log(this.$route.path);
       let path = this.$route.path.split('/')
      //  console.log(path[1]);

       if (path[1] == "admin") {
         this.isAdmin = true;
       }else{
        this.isAdmin = false;
       }
       if (path[1] == "reset_password") {
         this.isResetPassword = true;
       }
    }
  }
</script>

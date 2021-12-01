<template>
<body>

<div class="limiter">
		
</div>
</body>

</template>


<script>
  export default {
    name: 'Logout',

    data: () => ({
      BASE_URL:process.env.VUE_APP_BASE_URL,
      API_URL:process.env.VUE_APP_API_URL,

    }),

    beforeMount(){
        if (localStorage.token) {
          localStorage.token = "";
        }
        localStorage.token = "";
        window.location.href = this.BASE_URL + "/user/login"
    }
  }
</script>

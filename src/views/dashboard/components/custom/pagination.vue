<template>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="6"
    ></v-pagination>
  </div>
</template>

<script>
  export default {
    name:"pagination",

    data () {
      return {
        page: 0,
      }
    },
  }
</script>

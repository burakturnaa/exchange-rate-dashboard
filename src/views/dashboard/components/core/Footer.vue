<template>
  <v-footer
    id="dashboard-core-footer"
  >
    <v-container>
      <v-row
        align="center"
        no-gutters
      >
        <!-- <v-col
          v-for="(link, i) in links"
          :key="i"
          class="text-center mb-sm-0 mb-5"
          cols="auto"
        >
          <a
            :href="link.href"
            class="mr-0 grey--text text--darken-3"
            rel="noopener"
            target="_blank"
            v-text="link.text"
          />
        </v-col> -->

        <v-spacer class="hidden-sm-and-down" />

        <v-col
          cols="12"
          md="12"
        >
          <div class="row body-1 font-weight-light pt-6 pt-md-0 text-center text-white">
           <a href="https://www.dumanarge.com" target="_blank"><img class="float-left" width="100" src="@/assets/logo_w.svg" /></a>
          <span class="float-left" style="color:#000; margin-top:10px">   <label class="mx-1">—</label>   &copy; Copyright 2021</span>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>

  export default {
    name: 'DashboardCoreFooter',

    data: () => ({
      links: [
        {
          href: '#',
          text: 'Creative Tim',
        },
        {
          href: '#',
          text: 'About Us',
        },
        {
          href: '#',
          text: 'Blog',
        },
        {
          href: '#',
          text: 'Licenses',
        },
      ],
    }),
  }
</script>

<style lang="sass">
  #dashboard-core-footer
    
    a
      font-size: .825rem
      font-weight: 500
      text-decoration: none
      text-transform: uppercase
</style>

<style>
#dashboard-core-footer{
  top: 100%;
  height: 87px;
  position: absolute;
  bottom: 0px;

}
.ma-2{
  width: 200px;
  justify-content: center;
}
.v-content__wrap{
  /* display: grid; */
}
.v-application--wrap{
  min-height: 87vh ;
}
.v-footer .body-1 a {
    color: #fff !important;
    padding: 0;
    text-transform: inherit !important;
    font-size: 16px !important;
    font-weight: 300 !important;
}

.v-footer p { color:#fff;  }

.v-footer {
    position: relative;
    bottom : 0;
    width: 100%;
    display: flex;
    padding: 20px 0 20px 4px;
    border-top: 1px solid #ecb54e !important;
    background-color:#eab95e !important;
}

.theme--light.v-footer {
    background-color: #eab95e;
    color: #eab95e !important
}
.body-1{
  justify-content: center;
}
</style>

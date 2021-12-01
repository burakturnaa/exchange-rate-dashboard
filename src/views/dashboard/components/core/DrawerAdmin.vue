<template>

  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    mobile-break-point="960"
    app
    width="260"

    v-bind="$attrs"
  >
    <template v-slot:img="props">
      <v-img
        :gradient="`to bottom, ${barColor}`"
        v-bind="props"
      />
    </template>

    <v-list
      dense
      nav
    >
    
    
    <v-img style="margin:0px auto" max-width="150" src="@/assets/logo.png" ></v-img>
    </v-list>

    <v-divider class="mb-2" />

    <v-list
      expand
      nav
    >
      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />
      <!-- {{computedItems}} -->
      <template v-for="(item, i) in computedItems">
       
        <base-item-group
          v-if="item.children && item.children.title != '' "
          :key="`group-${i}`"
          :item="item"  
          
        >

        </base-item-group>

        <base-item
          v-else
          :key="`item-${i}`"
          :item="item"
          
        />
      </template>

      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />
    </v-list>

    

  </v-navigation-drawer>
</template>

<script>
  
</script>

<script>
  // Utilities
  import {
    mapState,
  } from 'vuex'

  export default {
    name: 'DashboardCoreDrawer',

    props: {
      expandOnHover: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      items: [
        {
          icon: 'devices',
          title: 'Cihazlar',
          to: '/devices',
        },
        {
          icon: 'mdi-account-multiple',
          title: 'Müşteriler',
          to: '/customers',
        },
        {
          icon: 'mdi-note-text-outline',
          title: 'Log Kayıtları',
          to: '/logs',
        },
        
        {
          icon: 'mdi-login',
          title: 'exit',
          to: '/exit',
        },
        
      ],
    }),

    computed: {
      ...mapState(['barColor', 'barImage']),
      drawer: {
        get () {
          // console.log(this.$store.state.drawer);
          return this.$store.state.drawer
        },
        set (val) {
          // console.log(this.$store.commit('SET_DRAWER', val));
          this.$store.commit('SET_DRAWER', val)
        },
      },
      computedItems () {
        // console.log(this.items.map(this.mapItem));
        return this.items.map(this.mapItem)
      },
      token(){
        return localStorage.token
      },
      profile () {
        return {
          avatar: true,
          title: this.$t('avatar'),
        }
      },
    },

    mounted() {
      // console.log(localStorage.auth)
      if(localStorage.auth == "teknik"){
        this.items.splice(2,1)
      }
    },

    methods: {
      mapItem (item) {
        //append token to each "to"
        // let token = this.$store.state.token
        //let token = localStorage.token // better than store to avoid vuex persistance plugning ...etc

        let len = (item.to).length
        
        // console.log("mapItem -> len", len)
        if(len < 21)
        {
          
          // console.log(item.to);
          if(item.to != '/login'){
            // item.to = item.to + "?t="+localStorage.token
            // item.to = "admin" + item.to
            item.to = "/admin" + item.to   
            
          }
          // console.log(localStorage.auth)
         
          if (item.href != "" && typeof(item.href) != "undefined") {
              // console.log(item);
            item.to = "/admin" + item.to   
            // item.to = "";
            // item.href = item.href + "?t="+localStorage.token
          }
          
          
          
        }
        
        // console.log(item);
        // console.log( item.children ? item.children.map(this.mapItem) : undefined);
        return {
          ...item,
          children: item.children && typeof(item.children) != "undefined" ? item.children.map(this.mapItem) : undefined,
          title: this.$t(item.title),
          target : "_self",
          
          
          
        }
      }
    },
  }
</script>

<style lang="sass">
  @import '~vuetify/src/styles/tools/_rtl.sass'

  #core-navigation-drawer
    .v-list-group__header.v-list-item--active:before
      opacity: .2
      color: #075f89

    .v-list-item
      &__icon--text,
      &__icon:first-child
        justify-content: center
        text-align: center
        width: 20px

        +ltr()
          margin-right: 24px
          margin-left: 12px !important

        +rtl()
          margin-left: 24px
          margin-right: 12px !important

    .v-list--dense
      .v-list-item
        &__icon--text,
        &__icon:first-child
          margin-top: 10px

    .v-list-group--sub-group
      .v-list-item
        +ltr()
          padding-left: 8px

        +rtl()
          padding-right: 8px

      .v-list-group__header
        +ltr()
          padding-right: 0

        +rtl()
          padding-right: 0

        .v-list-item__icon--text
          margin-top: 19px
          order: 0

        .v-list-group__header__prepend-icon
          order: 2

          +ltr()
            margin-right: 8px

          +rtl()
            margin-left: 8px
</style>


<style >

.v-navigation-drawer__content {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
   background: #fff;
   position:relative;
}

.v-application .primary {
    background-color: #ffffff !important;
    border-color: #ffffff !important;
}

.v-application--is-ltr #core-navigation-drawer div.v-list-item__icon:first-child {
    margin-left: 5px !important;
    margin-right: 18px;
    opacity: 100;

}

.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
    color: rgb(0 0 0 / 100%) !important;
}

.v-application--is-ltr #core-navigation-drawer div.v-list-item__icon:first-child {
    margin-left: 5px !important;
    margin-right: 18px;
    opacity: 107;
    color: #050a23;
}
.v-list-item{
  text-decoration: none !important;
}
.v-list-item--active{
  color : black !important
}
.v-list-item__icon{
  content : '*' !important;
}





</style>

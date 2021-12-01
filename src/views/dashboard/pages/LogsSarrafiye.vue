<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
      <!-- <v-col
        cols="12"
      >
        <base-material-card
          color="#1d1d1d"
          class="px-5 py-3"
          min-height="200px"
          style="display:flow-root; text-align:center"
        >
          <template v-slot:heading>
            <div @click="clickevent(0)" class="display-2 font-weight-light">
              İşlemler
            </div>
            <div class="subtitle-1 font-weight-light">
            </div>
          </template>
          <v-card-text >
              
          </v-card-text>
        </base-material-card>
      </v-col> -->
      <v-col
        cols="12"

        style="float:left"
      >
        <base-material-card
          color="#1d1d1d"
          class="px-5 py-3"
        >
          
          <template v-slot:heading>
            <div @click="clickevent(0)" class="display-2 font-weight-light">
              <p style="font-size:25px !important;color:#000">
                Sarrafiye Kayıtları
              </p>
            </div>
            
            <div class="subtitle-1 font-weight-light">
            </div>
          </template> 
          <v-card-text>
            <!-- <v-data-table
              :key="refresh_key"
              :items-per-page="pagination.rowsPerPage"
              :headers="headers_all_check_points"
              :items="logs"
              item-key="id"
              class="elevation-1 pt-2 text-center"
              :loading="loading"
              hide-default-footer
              @update:sort-by="updateSort('by', $event)"
              @update:sort-desc="updateSort('desc', $event)"
            > -->

            <v-data-table
              :headers="headers_doviz"
              :items-per-page="pagination.rowsPerPage"
              :items="doviz_logs"
              hide-default-footer
              item-key="id"
              class="elevation-1 pt-2 text-center"
              :loading="loading"
              :options.sync="pagination"
            >

              <template v-slot:top>

              <v-row class="mb-5 text-center justify-content-center">
                <v-card class="col-lg-10 col-xs-10 col-sm-10 col-md-10 m-5 d-inline-block" min-width="250px">

                    <v-card-title style="font-size:18px !important">Kayıtları Filtrele</v-card-title>
                    
                    <v-card-text class="m-0 pt-5">


                        <v-row>

                            <v-col
                            cols="12"
                            sm="6"
                            md="6"
                            >
                            <v-menu
                                v-model="first_menu"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                
                                    v-model="first_date"
                                    label="İlk Tarih"
                                    prepend-icon="mdi-calendar"
                                    outlined
                                    readonly
                                    v-bind="attrs"
                                    hide-details
                                    v-on="on"
                                    v-on:keyup.enter="filter()"
                                ></v-text-field>
                                </template>
                                <v-date-picker
                                locale="tr"
                                v-model="first_date"
                                color="blue"
                                @input="first_menu = false"
                                
                                ></v-date-picker>
                            </v-menu>
                            </v-col>
                        
                            <v-col
                            cols="12"
                            sm="6"
                            md="6"
                            >
                            <v-menu
                                v-model="second_menu"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="second_date"
                                    label="Son Tarih"
                                    prepend-icon="mdi-calendar"
                                    outlined
                                    readonly
                                    hide-details
                                    v-bind="attrs"
                                    v-on="on"
                                    v-on:keyup.enter="filter()"
                                ></v-text-field>
                                </template>
                                <v-date-picker
                                locale="tr"
                                v-model="second_date"
                                color="blue"
                                @input="second_menu = false"
                                ></v-date-picker>
                            </v-menu>
                            </v-col>
                      </v-row>


                    
                      <v-row>
                      <v-col cols="12" lg="4">
                     
                      <!-- <v-text-field
                        style="font-size: 18px !important"
                        v-model.trim="title"
                        label="Kur adı"
                        prepend-icon="mdi-subtitles-outline"
                        v-on:keyup.enter="filter()"
                        class="mt-5"
                        outlined
                      ></v-text-field> -->

                      <v-select
                      style="font-size: 18px !important"
                      class="mt-5"
                      v-model.trim="title"
                      :items="sarrafiye_titles"
                      label="Kur adı"
                      prepend-icon="mdi-subtitles-outline"
                      v-on:keyup.enter="get_doviz_logs_filter()"
                      outlined
                    ></v-select>
                      
                          
                      </v-col>
                      <v-col cols="12" lg="8" class="d-flex" style="margin:auto 0px !important">

                          <v-btn 
                            color="#eab95e"
                            style="color:#000"
                            @click="filter"
                          >
                            Arama
                          </v-btn>
                          <v-btn
                          color="#eab95e"
                          style="color:#000"
                          @click="sarrafiye_clear_filters"
                          >
                            Tüm Filtreleri Temizle
                          </v-btn>
                      
                          
                      </v-col>

                        <!-- <v-col cols="12" class="text-right">
                          <v-btn
                          color="#050a23"
                          @click="clear_filters"
                          >
                            Tüm Filtreleri Temizle
                          </v-btn>
                          <v-btn 
                          color="#050a23"
                          @click="filter"
                          >
                            Arama
                          </v-btn>
                        </v-col> -->
                      </v-row>
                    
                    </v-card-text>
                  </v-card>

              </v-row>

              </template>

            </v-data-table>
             
          </v-card-text> 
          
        <v-col cols="12" lg="12">
                <div style="text-align: center" >  {{pagination.totalItems}} {{_T("found")}} </div>
                 <v-col v-if="progress_bar" cols="12" sm="12" md="12">
                  <v-progress-linear indeterminate  color="#075f89"></v-progress-linear>
                </v-col>
        </v-col>          
        </base-material-card>
        <template>
            <div class="text-center">
                <v-container>
                <v-row justify="center">
                    <v-col cols="8">
                    <v-container class="max-width">
                        <v-pagination
                        color="blue"
                        @input="paginationChangeHandler"
                        :value="pagination.page"
                        :use-route="true" 
                        :total-visible="7" 
                        class="my-4"
                        :length="pages"
                        ></v-pagination>
                    </v-container>
                    </v-col>
                </v-row>
                </v-container>
            </div>
            </template>
        
      </v-col>

      <v-overlay :value="loading">
        <v-progress-circular
          indeterminate
          size="64"
        ></v-progress-circular>
      </v-overlay>
  </v-container>
</template>
<script>
  import "../../../../src/assets/loginpage/vendor/bootstrap/css/bootstrap.min.css";
  import { LogsAdminMixin } from './mixins/LogsAdmin'
  import { CommonAdminMixin } from './mixins/CommonAdmin'
  import 'sweetalert2/dist/sweetalert2.min.css';
  import 'vue-toast-notification/dist/theme-sugar.css';
import { validationMixin } from 'vuelidate'
  import { required,alpha, maxLength, minLength, email, numeric, helpers } from 'vuelidate/lib/validators'
  import moment from 'moment'

  const alphaNumAndDotValidator = helpers.regex('alphaNumAndDot', /^[\d.]*$/i);

  export default {
    name: 'LogsSarrafiye',
    mixins: [validationMixin,LogsAdminMixin],

    validations : {
      clear_date : {required},
      ip : {alphaNumAndDotValidator},
      // latest_date : {required},
    },
   

    data () {
      return {
        // token : "",
        BASE_URL:process.env.VUE_APP_BASE_URL,
        API_URL:process.env.VUE_APP_API_URL,

        search_checkpoint : "",
        check_point_exists : false,

        add_dialog : false,
        edit_dialog : false,

        updateButton : false,
        saveButton : false,

        first_date: "",
        first_menu: false,

        second_date: "",
        second_menu: false,

        sort_name :"",
        sort_status : "",

        loading : false,
        progress_bar : false,
        dataLoading : false,
        pagination: { totalItems: 50, rowsPerPage:100, page: 1 },
        refresh_key : 0,
        fitered : true,

        editFormSelected : "",

        clear_date : "",
        clear_date_text : "",
        clear_date_dialog : false,

        latest_date_text : "",
        start_date_text : "",
        limit : 500,
        latest_date : "",
        start_date : "",
        latest_date_dialog : false,
        start_date_dialog : false,
        ip : "",
        title : "",
        only_uid : "true",
        state : "",

        logs : [],

        sarrafiye_titles : [],

        customers : [],
        selected_customer : "",

        doviz_logs : [],
      }
    },

    computed: {

      pages() {
        if (
          this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) {
          return 0;
        }

        return Math.ceil(
          this.pagination.totalItems / this.pagination.rowsPerPage
        );
      },

      clearDateErrors () {
        const errors = []
        if (!this.$v.clear_date.$dirty) return errors
        !this.$v.clear_date.required && errors.push('Tarih alanı boş bırakılamaz')
        return errors
      },
      latestDateErrors () {
        const errors = []
        if (!this.$v.clear_date.$dirty) return errors
        !this.$v.clear_date.required && errors.push('Tarih alanı boş bırakılamaz')
        return errors
      },
      ipErrors () {
        const errors = []
        if (!this.$v.ip.$dirty) return errors
        !this.$v.ip.alphaNumAndDotValidator && errors.push('Lütfen geçerli bir IP Adresi giriniz')
        return errors
      },
     

      _T() { return this.$t }, // for i18 ;)
      headers_doviz(){
          let tbl_headers =  [
          // {
          //   sortable: true,
          //   text: "UID",
          //   value: 'uid',
          // },
        //   {
        //     sortable: false,
        //     text: "ID",
        //     value: 'id',
        //     align: 'left'
        //   },
          {
            sortable: false,
            text: "Kur",
            value: 'instance_kur',
            align: 'left'
          },
          {
            sortable: false,
            text: "Tarih",
            value: 'update_date',
            align: 'left'
          },
          {
            sortable: false,
            text: "Yeni Alış Fiyatı",
            value: 'yeni_alis',
            align: 'center'
          },
          {
            sortable: false,
            text: "Yeni Satış Fiyatı",
            value: 'yeni_satis',
            align: 'center'
          },
          {
            sortable: false,
            text: "Eski Alış Fiyatı",
            value: 'old_alis',
            align: 'center'
          },
          {
            sortable: false,
            text: "Eski Satış Fiyatı",
            value: 'old_satis',
            align: 'center'
          },
          // {
          //   sortable: true,
          //   text: "Kayıt Tarihi",
          //   value: 'req_date',
          //   align: 'center'
          // },
          // {
          //   sortable: false,
          //   text: "Saat",
          //   value: 'req_time',
          //   align: '',
          // },
          // {
          //   sortable: false,
          //   text: this.$t('status'),
          //   value: 'status',
          //   align: 'center',
          // },
          // {
          //   sortable: false,
          //   text: this.$t('description'),
          //   value: 'description',
          //   align: 'left',
          // },
        //   { text: this.$t('action'), value: "actions", align:"center", sortable: false }
        
        ]
        return tbl_headers ;
      },
    },

    methods: {
     
      async main(){

        this.loading = true;
        await this.get_sarrafiye_logs();
        await this.get_sarrafiye_titles();
        this.loading = false;

        // this.loading = true;
        // await this.get_customers();
        // await this.filter();        
        // this.loading = false;

      },

    },

    watch : {
      latest_date(){
        if (this.latest_date != "") {
          var today = new Date(this.latest_date);
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();

          today = yyyy + '-' + mm + '-' + dd;
          this.latest_date_text = today
        }
      
      },
      start_date(){
        if (this.start_date != "") {
          var today = new Date(this.start_date);
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();
          
          // console.log("WATCH");

          today = yyyy + '-' + mm + '-' + dd;
          this.start_date_text = today
        }
      
      },
      clear_date(val){
          if (typeof val != "undefined") {

            var d = new Date(val)
            // console.log(d);
                
            var day = "";
            
            if (d.getDate().toString().length == 1) {
              day = `0${d.getDate()}`;  
            }else{
              day = d.getDate();
            }

            var month = ""
            if (d.getMonth().toString().length == 1) {
              month = `0${d.getMonth() + 1}`;  
            }else{
              month = d.getMonth() + 1;
            }
            var year = d.getFullYear()
            var formatted = `${day}-${month}-${year}`

            // console.log(day);
            if (isNaN(day)) {
              this.clear_date_text = ""
            }else{
              this.clear_date_text = formatted
            }
        }else {
            this.clear_date_text = val
        }
      },
    //   first_date(){
    //       if (this.first_date != "") {
    //           this.first_date += "T:00:00:00"
    //       }
    //   },
    //   second_date(){
    //       if (this.second_date != "") {
    //           this.second_date += "T:00:00:00"
    //       }
    //   }
    },

    created(){

    },

    mounted()
    {       
      this.main();
    },
    created(){

    }

  }
</script>


<style scoped>
  .v-main__wrap section {
    max-width: 90%;
  }

</style>


<style>

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    font-size : 18px !important
  }
  .v-data-table > .v-data-table__wrapper > table > thead > tr > th {
    font-size : 15px !important
  }

.v-card .v-card--material__heading .display-2 {
    font-size: 20px !important;
    color: #fff;
    /* width: 327px; */
    /* height: 81.2px; */
    /* padding: 28px; */
}

.v-icon.v-icon {
    font-size: 20px;
    color: #000;
}

.v-alert .v-alert__wrapper .v-alert__content {
    font-weight: 300;
    color: #fff;
}

.v-alert  {
color:#000;
}



</style>


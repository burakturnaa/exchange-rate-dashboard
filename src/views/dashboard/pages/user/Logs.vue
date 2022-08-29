<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    
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
              Log Kayıtları
            </div>
            
            <div class="subtitle-1 font-weight-light">
            </div>
          </template> 
          <v-card-text>
            <v-data-table
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
            >

              <template v-slot:top>

              <v-row class="mb-5 text-center justify-content-center">
                <v-card class="col-lg-10 col-xs-10 col-sm-10 col-md-10 m-5 d-inline-block" min-width="250px">

                    <v-card-title>Kayıtları Filtrele</v-card-title>
                    
                    <v-card-text class="m-0">
                      <v-row>
                      <v-col cols="12" lg="4">
                     
                      <v-text-field
                        v-model.trim="title"
                        label="Başlık"
                        prepend-icon="mdi-subtitles-outline"
                        v-on:keyup.enter="filter()"
                        class="mt-5"
                      ></v-text-field>
                          
                      </v-col>

                      <v-col cols="12" lg="4">
                        <v-menu
                          v-model="start_date_dialog"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="start_date_text"
                              label="İlk Tarih"
                              clearable
                              prepend-icon="mdi-calendar"
                              persistent-hint
                              readonly
                              v-bind="attrs"
                              v-on:keyup.enter="filter()"
                              v-on="on"
                              class="mt-5"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                          color="#050a23"
                          class="m-0"
                          locale="tr"
                          v-model="start_date"
                          @input="start_date_dialog = false"
                          ></v-date-picker>
                        </v-menu>
                      
                      </v-col>

                      <v-col cols="12" lg="4">
                        <v-menu
                          v-model="latest_date_dialog"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="latest_date_text"
                              label="Son Tarih"
                              clearable
                              prepend-icon="mdi-calendar"
                              persistent-hint
                              readonly
                              v-bind="attrs"
                              v-on:keyup.enter="filter()"
                              v-on="on"
                              class="mt-5"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                          color="#050a23"
                          class="m-0"
                          locale="tr"
                          v-model="latest_date"
                          @input="latest_date_dialog = false"
                          ></v-date-picker>
                        </v-menu>
                      
                      </v-col>


                  <v-col cols="12" lg="4">
                    <v-col
                    class="d-flex pl-0"
                    cols="12"
                    sm="12"
                  >
                    <v-select
                    v-model="state"
                    prepend-icon="mdi-list-status"
                    :items="['0','1','2']"
                    label="Sonuç"
                    class="pl-0"
                    v-on:keyup.enter="filter()"
                    @change="filter"
                    >
                     <template slot="selection" slot-scope="data">
                      
                        <p v-if="data.item == '0'">Risksiz</p>
                        <p v-if="data.item == '1'">Riskli</p>
                        <p v-if="data.item == '2'">Yüksek Ateş</p>
                          <!-- <p v-else>{{data.item}}</p> -->
                      </template>
                      <template slot="item" slot-scope="data">
                        <p v-if="data.item == '0'">Risksiz</p>
                        <p v-if="data.item == '1'">Riskli</p>
                        <p v-if="data.item == '2'">Yüksek Ateş</p>
                        
                      </template>
                    </v-select>
                  </v-col>
                  </v-col>

                  

                  <v-col cols="12" lg="4">
                    <v-col
                    class="d-flex pl-0"
                    cols="12"
                    sm="12"
                  >
                    <v-select
                    v-model="pagination.rowsPerPage"
                    prepend-icon="mdi-format-list-numbered"
                    :items="[25,50,100]"
                    label="Kayıt sayısı"
                    class="pl-0"
                    v-on:keyup.enter="filter()"
                    @change="filter"
                    >
                     <!-- <template slot="selection" slot-scope="data">
                      
                         <p v-if="data.item == '0'">Tümü</p>
                        <p v-else>{{data.item}}</p>
                      </template>
                      <template slot="item" slot-scope="data">
                        <p v-if="data.item == '0'">Tümü</p>
                        <p v-else>{{data.item}}</p>
                        
                      </template> -->
                    </v-select>
                  </v-col>
                  </v-col>
                  
                  <v-col cols="12" class="text-right">
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
                  </v-col>
                      </v-row>
                         
                    </v-card-text>
                  </v-card>
              
              </v-row>

                
                
              </template>

            <template v-slot:item.risk="{ item }">
              
                <div class="text-center">
                  <v-chip
                    v-if="item.risk=='0'"
                    class="ma-2"
                    color="success"
                    text-color="white"
                    style="width:150px"
                  >
                    <v-avatar left>
                      <v-icon>mdi-shield-check</v-icon>
                    </v-avatar>
                    RİSKSİZ
                  </v-chip>

                  <v-chip
                    v-if="item.risk=='1'"
                    class="ma-2"
                    color="warning"
                    text-color="white"
                    style="width:150px"
                  >
                    <v-avatar left>
                      <v-icon>mdi-shield-alert</v-icon>
                    </v-avatar>
                    RİSKLİ
                  </v-chip>

                  <v-chip
                    v-if="item.risk=='2'"
                    class="ma-2"
                    color="error"
                    text-color="white"
                    style="width:150px"
                  >
                    <v-avatar left>
                      <v-icon>mdi-thermometer-alert</v-icon>
                    </v-avatar>
                    YÜKSEK ATEŞ
                  </v-chip>
                </div>
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
      <v-dialog
        v-model="dataLoading"
        hide-overlay
        persistent
        width="450"
      >
        <v-card
          color="white"                    
        >
          <v-card-text>
            Liste verileri alınıyor. Lütfen bekleyiniz.
            <v-progress-linear
              indeterminate
              color="blue"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
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
  import "../../../../../src/assets/loginpage/vendor/bootstrap/css/bootstrap.min.css";
  import { LogsMixin } from '../mixins/Logs'
  import { CommonMixin } from '../mixins/Common'
  import 'sweetalert2/dist/sweetalert2.min.css';
  import 'vue-toast-notification/dist/theme-sugar.css';
import { validationMixin } from 'vuelidate'
  import { required,alpha, maxLength, minLength, email, numeric, helpers } from 'vuelidate/lib/validators'
  import moment from 'moment'
  import { format, parseISO } from 'date-fns'

  const alphaNumAndDotValidator = helpers.regex('alphaNumAndDot', /^[\d.]*$/i);

  export default {
    name: 'Logs',
    mixins: [validationMixin,LogsMixin],

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

        sort_name :"",
        sort_status : "",

        loading : false,
        progress_bar : false,
        dataLoading : false,
        pagination: { totalItems: 50, rowsPerPage:50, page: 1 },
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
      headers_all_check_points(){
          let tbl_headers =  [
         
          {
            sortable: true,
            text: "Başlık",
            value: 'title',
            align: 'left'
          },
          {
            sortable: false,
            text: "Tarih",
            value: 'log_time',
            align: 'center'
          },
          {
            sortable: true,
            text: "Sonuç",
            value: 'risk',
            align: 'center'
          },
               
        ]
        return tbl_headers ;
      },
    },

    methods: {
     
      async main(){

        this.loading = true;
        await this.filter();
        this.loading = false;

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
          
          today = yyyy + '-' + mm + '-' + dd;
          this.start_date_text = today
        }
      
      },
      clear_date(val){
          if (typeof val != "undefined") {

            var d = new Date(val)
                
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

            if (isNaN(day)) {
              this.clear_date_text = ""
            }else{
              this.clear_date_text = formatted
            }
        }else {
            this.clear_date_text = val
        }
      }
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

.v-card .v-card--material__heading .display-2 {
    font-size: 18px !important;
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


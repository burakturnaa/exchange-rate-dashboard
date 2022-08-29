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
              <p style="font-size:25px;position:absolute;color:black">Kur Ayarları</p>
               <v-btn
                  class="mx-2 float-right"
                  fab
                  dark
                  small
                  color="#404040"
                  @click="open_add_rate_dialog"
                >
                  <v-icon dark>
                    mdi-plus
                  </v-icon>
                </v-btn>  

            </div>   

                   
            <div class="subtitle-1 font-weight-light">
              <!-- <p v-if="list_type===0">Tüm Kayıtlar Listeleniyor</p> -->
              <!-- <p v-else>Aktif Kayıtlar Listeleniyor</p> -->
            </div>
          </template>           
          <v-card-text> 


            <v-card
              elevation="2"
              width="80%"
              class="ml-auto mr-auto"
            >
              <v-card-title>
                <h2 class="mr-auto ml-auto mt-2 mb-2">DÖVİZ</h2>
                <!-- <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  color="indigo"
                  @click="open_add_rate_dialog"
                >
                  <v-icon dark>
                    mdi-plus
                  </v-icon>
                </v-btn> -->
              </v-card-title>

              <v-card-text>
                <template>
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">
                            Kur
                          </th>
                          <th class="text-left" style="width:200px">
                            Alış
                          </th>
                          <th class="text-left" style="width:200px">
                            Satış
                          </th>
                          <th class="text-center">
                            İşlem
                          </th>
                        </tr>
                      </thead>
                       <tbody>
                        <tr
                          v-for="item in rates"
                          :key="item.name"
                        >
                          <td><b>{{ item.kur }}</b></td>
                          <td>
                            <v-text-field
                            @keypress="isNumber(event)"
                            class="mt-5 mb-0"
                              outlined
                              v-model="item.alis"
                              type="number"
                              
                              
                              
                            ></v-text-field>
                            <!-- <template>
                              <CurrencyInput v-model="item.alis" :options="{ currency: 'EUR' }" />
                              
                            </template> -->

                           
                          </td>
                          <td>
                            <v-text-field
                            @keypress="isNumber(event)"
                            class="mt-5 mb-0"
                            outlined
                              v-model="item.satis"
                              type="number"
                              
                            ></v-text-field>
                          </td>
                          <td>
                            <center>
                              <v-btn
                              
                              color="#eab95e"
                              style=" margin-right:10px !important;color:black"
                              

                              @click="update_rate(item)"
                              :loading="loading_button"
                            >
                              Güncelle
                            </v-btn>

                            <!-- <v-btn
                              small
                              color="#df4759"
                              dark
                              @click="delete_rate(item)"
                              :loading="loading_button"
                            >
                              Sil
                            </v-btn> -->
                            </center>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </template>
              </v-card-text>
            </v-card>


            <v-card
              elevation="2"
              width="80%"
              class="ml-auto mr-auto"
            >
              <v-card-title>
                <h2 class="mr-auto ml-auto mt-2 mb-2">ALTIN</h2>
                <!-- <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  color="indigo"
                  @click="open_add_sarrafiye_dialog"
                >
                  <v-icon dark>
                    mdi-plus
                  </v-icon>
                </v-btn> -->
              </v-card-title>
              <v-card-text>
                <v-card>
                  <template>
                  <v-simple-table style="background-color:#77777717">
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">
                            Kur
                          </th>
                          <th class="text-left" style="width:300px" >
                            Alış
                          </th>
                          <th class="text-left" style="width:300px">
                            Satış
                          </th>
                          <th class="text-center">
                            İşlem
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                        >
                          <td><b>KGRTRY</b></td>
                          <td>
                            <v-text-field
                            @keypress="isNumber(event)"
                              outlined
                              class="mt-5 mb-0"
                              v-model="kgrtry_alis"
                              type="number"
                              
                            ></v-text-field>
                          </td>
                          <td>
                            <v-text-field
                            @keypress="isNumber(event)"
                              outlined
                              class="mt-5 mb-0"
                              v-model="kgrtry_satis"
                              type="number"
                              
                            ></v-text-field>
                          </td>
                          <td>
                            <center>
                              <v-btn
                              style="color:black"
                              color="#eab95e"
                              dark
                              @click="update_kgrtry()"
                              :loading="loading_button_kgrtry"
                            >
                              Güncelle
                            </v-btn>
                            </center>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </template>
                </v-card>


                <template>
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">
                            Kur
                          </th>
                          <th class="text-left"  style="width:200px">
                            Alış Milyem
                          </th>
                          <th class="text-left"  style="width:200px">
                            Satış Milyem
                          </th>
                          <th class="text-left" style="width:150px" >
                            Alış Fiyatı
                          </th>
                          <th class="text-left"  style="width:150px">
                            Satış Fiyatı
                          </th>
                          <th class="text-center" >
                            İşlem
                          </th>
                        </tr>
                      </thead>
                      <!-- <tbody> -->
                <tbody>
                  

                    <tr
                          v-for="item in sarrafiye"
                          :key="item.name"
                        >
                          <td><b>{{ item.kur }}</b></td>
                          <td>
                            <v-text-field
                            @keypress="isNumber(event)"
                              outlined
                              class="mt-5 mb-0"
                              v-model="item.alis"
                              type="number"
                            ></v-text-field>
                          </td>
                          <td>
                            <v-text-field
                            @keypress="isNumber(event)"
                              outlined
                              class="mt-5 mb-0"
                              v-model="item.satis"
                              type="number"
                            ></v-text-field>
                          </td>
                          <td>
                            <p><b>{{item.hesaplanan_alis}} ₺</b></p>
                          </td>
                          <td>
                            <p><b>{{item.hesaplanan_satis}} ₺</b></p>
                          </td>
                          <td>
                            <center>
                              <v-btn
                              color="#eab95e"
                              style=" margin-right:10px !important;color:black"
                              dark
                              @click="update_sarrafiye(item)"
                              :loading="loading_button"
                            >
                              Güncelle
                            </v-btn>

                            <!-- <v-btn
                              small
                              color="#df4759"
                              dark
                              @click="delete_sarrafiye(item)"
                              :loading="loading_button"
                            >
                              Sil
                            </v-btn> -->
                            </center>
                          </td>
                        </tr>
                  
                  
                </tbody>
                        
                      <!-- </tbody> -->
                    </template>
                  </v-simple-table>
                </template>

              </v-card-text>
            </v-card>

          </v-card-text>
           
        </base-material-card>
      </v-col>

      


      <template>
        <v-row justify="center">
          <v-dialog
            v-model="add_rate_dialog"
            persistent
            max-width="800px"
          >
            
            <v-card>
              <!-- <v-card-title>
                <span class="headline">Döviz Ekle</span>
              </v-card-title> -->
              <v-card-text >
                <v-container >
                  <v-row>


                    <v-col
                    cols="6"
                    >

                    <h4 style="margin-left:15px">Döviz İşlemleri</h4>
                    <!-- ---------DÖVİZ---------- -->

                     <v-col
                      cols="12"
                    >
                      <v-text-field
                        label="KUR KODU"
                         
                        required
                        persistent-hint
                        placeholder="Kur kodu giriniz"
                        outlined
                        v-model.trim="addRateForm.kur"
                        hide-details
                        
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                    >
                     
                        <v-text-field
                        @keypress="isNumber(event)"
                          v-model="addRateForm.alis"
                          label="ALIŞ FİYATI"
                          persistent-hint
                          placeholder="0.00"
                          outlined
                          type="number"
                          required
                          hide-details
                        ></v-text-field>
                     
                    </v-col>

                    <v-col
                      cols="12"
                    >
                        <v-text-field
                        @keypress="isNumber(event)"
                          label="SATIŞ FİYATI"
                          v-model="addRateForm.satis"
                          persistent-hint
                          placeholder="0.00"
                          outlined
                          type="number"
                          required
                          hide-details
                        ></v-text-field>
                      
                    </v-col>

                    <v-btn
                      small
                      color="#0275d8"
                      class="ml-auto d-flex"
                      style="margin-right : 15px"
                      dark
                      @click="add_rate()"
                      :loading="loading_button"
                    >
                      KAYDET
                    </v-btn>


                    <!-- ---------SARRAFİYE---------- -->
                    <h4 class="mt-2" style="margin-left:15px">Sarrafiye İşlemleri</h4>
                     <v-col
                      cols="12"
                    >
                      <v-text-field
                        label="SARRAFİYE KODU"
                        required
                        persistent-hint
                        placeholder="Sarrafiye kodu giriniz"
                        
                        outlined
                        v-model.trim="addSarrafiyeForm.kur"
                        hide-details
                        
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                    >
                    
                        <v-text-field
                        @keypress="isNumber(event)"
                          v-model="addSarrafiyeForm.alis"
                          label="ALIŞ FİYATI"
                          persistent-hint
                          placeholder="0.00"
                          outlined
                          type="number"
                          required
                          hide-details
                        ></v-text-field>
                    
                    </v-col>

                    <v-col
                      cols="12"
                    >
                      
                        <v-text-field
                        @keypress="isNumber(event)"
                          label="SATIŞ FİYATI"
                          v-model="addSarrafiyeForm.satis"
                          persistent-hint
                          placeholder="0.00"
                          outlined
                          type="number"
                          required
                          hide-details
                        ></v-text-field>
                     
                    </v-col>

                    <v-btn
                      small
                      color="#0275d8"
                      class="ml-auto d-flex"
                      style="margin-right : 15px"
                      dark
                      @click="add_sarrafiye()"
                      :loading="loading_button"
                    >
                      KAYDET
                    </v-btn>

                    </v-col>

                    <v-divider
                      vertical
                      style="background-color: #b9b0b0;"
                    ></v-divider>



                    <v-col cols="6">
                    <template>

                      <!-- ----------DÖVİZ----------- -->

                      <v-card
                        
                        class="overflow-y-auto"
                        style="margin-top:40px;margin-bottom:50px"
                        max-height="220px"
                        width="300px"
                        height="215px"
                        
                      >
                        <v-card-text>
                         
                         <template>
                          <v-simple-table>
                            <template v-slot:default>
                              <thead>
                                <!-- <tr>
                                  <th class="text-left">
                                    Name
                                  </th>
                                  <th class="text-left">
                                    Calories
                                  </th>
                                </tr> -->
                              </thead>
                             <draggable v-model="rates" tag="tbody"  style="margin-top:200px !important">
                                
                                  <tr
                                  
                                  v-for="item in rates"
                                  :key="item.kur"
                                >
                                  <td><v-icon>mdi-cursor-move</v-icon></td>
                                  <td>{{ item.kur }}</td>
                                  <td>
                                    <center>
                                      <v-btn
                                        small
                                        color="#df4759"
                                        dark
                                        @click="delete_rate(item)"
                                        :loading="loading_button"
                                      >
                                        Sil 
                                      </v-btn>
                                  </center>
                                </td>


                                </tr>

                              </draggable>

                              <!-- <draggable v-model="sarrafiye" tag="tbody"  style="position:fixed; margin-top:200px !important">

                                  <tr
                                  
                                  v-for="item in sarrafiye"
                                  :key="item.kur"
                                >
                                  <td><v-icon>mdi-cursor-move</v-icon></td>
                                  <td>{{ item.kur }}</td>
                                  <td>
                                    <center>
                                      <v-btn
                                        small
                                        color="#df4759"
                                        dark
                                        @click="delete_sarrafiye(item)"
                                        :loading="loading_button"
                                      >
                                        Sil 
                                      </v-btn>
                                  </center>
                                </td>


                                </tr>

                              </draggable> -->
                            </template>
                          </v-simple-table>
                        </template> 

                        </v-card-text>
                      </v-card>

                      <!-- ----------SARRAFİYE----------- -->


                       <v-card
                        
                        class="overflow-y-auto"
                        style="margin-top:90px"
                        max-height="220px"
                        width="300px"
                        height="215px"
                      >
                        <v-card-text>
                         
                         <template>
                          <v-simple-table>
                            <template v-slot:default>
                              <thead>
                                <!-- <tr>
                                  <th class="text-left">
                                    Name
                                  </th>
                                  <th class="text-left">
                                    Calories
                                  </th>
                                </tr> -->
                              </thead>
                              <draggable v-model="sarrafiye" tag="tbody"  style="margin-top:200px !important">
                                
                                  <tr
                                  
                                  v-for="item in sarrafiye"
                                  :key="item.kur"
                                >
                                  <td><v-icon>mdi-cursor-move</v-icon></td>
                                  <td>{{ item.kur }}</td>
                                  <td>
                                    <center>
                                      <v-btn
                                        small
                                        color="#df4759"
                                        dark
                                        @click="delete_sarrafiye(item)"
                                        :loading="loading_button"
                                      >
                                        Sil 
                                      </v-btn>
                                  </center>
                                </td>


                                </tr>

                              </draggable>

                            </template>
                          </v-simple-table>
                        </template> 

                        </v-card-text>
                      </v-card>

                    </template>
                      </v-col>

                  </v-row>
                </v-container>
               
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close_add_rate_dialog"
                >
                  Vazgeç
                </v-btn>
                <!-- <v-btn
                  color="blue darken-1"
                  text
                  @click="add_rate()"
                >
                  Kaydet
                </v-btn> -->
              </v-card-actions>
           
            </v-card>
          </v-dialog>
        </v-row>
      </template>



      <template>
        <v-row justify="center">
          <v-dialog
            v-model="add_sarrafiye_dialog"
            persistent
            max-width="600px"
          >
            
            <v-card>
              <v-card-title>
                <span class="headline">Sarrafiye Ekle</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    
                    <v-col
                      cols="12"
                    >
                      <v-text-field
                        label="KUR KODU"
                        required
                        persistent-hint
                        v-model.trim="addSarrafiyeForm.kur"
                        
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="6"
                    >
                      <td>
                        <v-text-field
                          v-model="addSarrafiyeForm.alis"
                          label="ALIŞ FİYATI"
                          persistent-hint
                          type="number"
                          required
                        ></v-text-field>
                      </td>
                    </v-col>

                    <v-col
                      cols="6"
                    >
                      <td>
                        <v-text-field
                          label="SATIŞ FİYATI"
                          v-model="addSarrafiyeForm.satis"
                          persistent-hint
                          type="number"
                          required
                        ></v-text-field>
                      </td>
                    </v-col>


                    <!-- <v-col
                      cols="6"
                    >
                      <v-text-field
                        label="Wifi IP Adresi"
                        required
                        persistent-hint
                        readonly
                        v-model.trim="editForm.wifi_ip"
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="6"
                    >
                      <v-text-field
                        label="Wifi MAC Adresi"
                        required
                        persistent-hint
                        readonly
                        v-model.trim="editForm.wifi_mac"
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="6"
                    >
                      <v-text-field
                        label="Ethernet IP Adresi"
                        required
                        persistent-hint
                        readonly
                        v-model.trim="editForm.ethernet_ip"
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="6"
                    >
                      <v-text-field
                        label="Ethernet MAC Adresi"
                        required
                        persistent-hint
                        readonly
                        v-model.trim="editForm.ethernet_mac"
                      ></v-text-field>
                    </v-col> -->

                  </v-row>
                </v-container>
               
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close_add_sarrafiye_dialog"
                >
                  Vazgeç
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="add_sarrafiye()"
                >
                  Kaydet
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </template>





      <v-overlay :value="loading">
        <v-progress-circular
          indeterminate
          size="64"
        ></v-progress-circular>
      </v-overlay>

  </v-container>
  
</template>
<script>
  import "../../../src/assets/loginpage/vendor/bootstrap/css/bootstrap.min.css";
  import { DashboardMixin } from './pages/mixins/Dashboard'
  import { CommonMixin } from './pages/mixins/Common'
  import 'sweetalert2/dist/sweetalert2.min.css';
  import 'vue-toast-notification/dist/theme-sugar.css';
  import { required, maxLength, minLength, email, numeric, helpers } from 'vuelidate/lib/validators'
  import draggable from 'vuedraggable';
  import CurrencyInput from "./components/custom/currency-input"; 

  


  const alphaNumAndDotValidator = helpers.regex('alphaNumAndDot', /^[a-z\d]*$/i);

  export default {
    name: 'Dashboard',
    mixins: [DashboardMixin],

    components: {
      CurrencyInput,
    },


    validations : {
      editForm : {
        name : { required },
      }
    },

    data () {
      return {
        // token : "",
        BASE_URL:process.env.VUE_APP_BASE_URL,
        API_URL:process.env.VUE_APP_API_URL,

        add_dialog : false,
        edit_dialog : false,

        updateButton : false,
        saveButton : false,

        loading : false,

        list_type : 0,

        req_date_dialog : false,

        addRateForm : {
          kur : "",
          alis : "",
          satis : "",
        },
        addSarrafiyeForm : {
          kur : "",
          alis : "",
          satis : "",
        },

        editForm :{
          id : "",
          name : "",
          serial : "",
        },

        rates : {},
        sarrafiye : {},
        calculated : {},

        calories : 0,

        kgrtry_alis : 0,
        kgrtry_satis : 0,

        loading_button : false,
        loading_button_kgrtry : false,

        add_rate_dialog: false,
        add_sarrafiye_dialog: false,

        update_sort : false,



        
        devices : [],
        devices_search : "",
      }
    },

    computed: {

      editNameErrors () {
        const errors = []
        if (!this.$v.editForm.name.$dirty) return errors
        !this.$v.editForm.name.required && errors.push('Cihaz adı alanı boş bırakılamaz')
        this.updateButton = false
        return errors
      },

      _T() { return this.$t }, // for i18 ;)
      headers_all_devices(){
          let tbl_headers =  [
          {
            sortable: true,
            text: "Cihaz adı",
            value: 'name',
          },
          {
            sortable: true,
            text: "Seri no",
            value: 'serial',
            align: 'left'
          },
          // {
          //   sortable: true,
          //   text: "Durum",
          //   value: 'status',
          //   align: 'left'
          // },
         
          { text: this.$t('action'), value: "actions", align:"center", sortable: false }
        
        ]
        return tbl_headers ;
      },

    },

    methods: {     
      async main(){
        await this.get_all_rate();
        await this.calculated_sarrafiye();
        await this.get_all_sarrafiye();
      },

      isNumber: function(evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
          evt.preventDefault();;
        } else {
          return true;
        }
      }

    },

    watch : {

      sarrafiye() {
      
        if (!this.update_sort) {
          this.update_sarrafiye_sort();
        }else{

          // this.$toast.error('İşleminiz gerçekleştirilemedi', {
          //   position: 'top-right',
          // })
          
        }
      },
      rates() {
        if (!this.update_sort) {
          this.update_rate_sort();
        }else{

          // this.$toast.error('İşleminiz gerçekleştirilemedi', {
          //   position: 'top-right',
          // })
          
        }
      },
      update_sort(){
        if (this.update_sort) {
            setTimeout(() => {
              this.loading = false;
            this.update_sort = false
          }, 1000);
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
  * {
    font-size: 20px ;
  }

  .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th{
    font-size:15px !important
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


@media (max-width: 476px) {
  .action-btn{
    width: 170px !important;
    height: 60px !important;
    font-size: 10px !important;
  }
  .action-btn .v-icon{
    width: 18px !important;
    font-size: 25px !important;
  }
}



</style>


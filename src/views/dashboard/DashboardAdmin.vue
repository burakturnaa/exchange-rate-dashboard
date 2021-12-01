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
          <v-card-text>            
               <v-col 
               cols="12" 
               sm="6"
               lg="4"
               style="float:left"
               >                
                 <template>
                   <v-btn
                      width="250"
                      elevation="2"
                      @click="getAllBtn"
                      fab
                      rounded
                      x-large
                      color="#237088"
                      class="action-btn"
                    >
                    <v-icon left>
                      mdi-format-list-bulleted
                    </v-icon>
                    Tüm Kayıtları Listele
                    </v-btn>                    
                 </template>                 
               </v-col>
                <v-col 
               cols="12" 
               sm="6"
               lg="4"
               style="float:left"
               >                
                 <template>
                   <v-btn
                      width="250"
                      elevation="2"
                      @click="getActiveBtn"
                      fab
                      rounded
                      x-large
                      color="#237088"
                      class="action-btn"
                    >
                    <v-icon left>
                      mdi-playlist-check
                    </v-icon>
                    Aktif Kayıtları Listele
                    </v-btn>                    
                 </template>                 
               </v-col>
               <v-col 
               cols="12" 
               sm="6"
               lg="4"
               style="float:left"
               >              
                 <template>
                   <v-btn
                      width="250"
                      elevation="2"
                      @click="addItem()"
                      fab
                      rounded
                      x-large
                      color="#237088"
                      class="action-btn"
                    >
                    <v-icon left>
                      mdi-playlist-plus
                    </v-icon>
                   Yeni Kayıt Ekle
                    </v-btn>
                 </template>
               </v-col>
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
              Cihazlar
            </div>              
            <div class="subtitle-1 font-weight-light">
              <p v-if="list_type===0">Tüm Kayıtlar Listeleniyor</p>
              <p v-else>Aktif Kayıtlar Listeleniyor</p>
            </div>
          </template>           
          <v-card-text>           
            <v-data-table
              :items-per-page="10"
              :headers="headers_all_devices"
              :items="devices"
              class="elevation-1"
              :search="devices_search"             
            >
            <template v-slot:top>
              <v-row>
                <v-col cols="12" sm="8">                  
                    <v-text-field
                      class="mx-5 mb-5"
                        v-model.trim="devices_search"
                        append-icon="mdi-magnify"
                        :label="_T('search')"
                        single-line
                        hide-details
                      ></v-text-field>                      
                </v-col>
                <!-- <v-col class="text-right" cols="12" sm="4">
                  <template>        
                    <downloadExcel
                      class="btn"
                      name="hescheck.xls"
                      worksheet="CheckPoints Sheet"                      
                      :fetch="get_all_devices"
                      :fields="json_fields"
                      :before-generate="startDownload"
                      :before-finish="finishDownload">
                      <v-btn
                        color="success"
                      >
                      <v-icon left>
                        mdi-microsoft-excel
                      </v-icon>
                        Excel'e Aktar
                      </v-btn>
                    </downloadExcel>                    
                  </template>
                </v-col> -->
              </v-row>             
            </template>
            <!-- SLOT -->
            <template v-slot:item.actions="{ item }">
              <!-- <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon color="rgb(5, 10, 35)" v-bind="attrs" v-on="on" small class="mr-2" @click="refreshTokenButton(item)">mdi-refresh</v-icon>
                </template>
                <span>Token Değiştir</span>
              </v-tooltip>               -->
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon color="rgb(5, 10, 35)" v-bind="attrs" v-on="on" small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                </template>
                <span>Düzenle</span>
              </v-tooltip>
              <!-- <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon color="red" v-bind="attrs" v-on="on" small class="mr-2" @click="deleteItem(item)">mdi-delete</v-icon>
                </template>
                <span>Sil</span>
              </v-tooltip>               -->
            </template>

            <template v-slot:item.token="{ item }">
              <p v-if="item.token.length > 25">{{item.token.substr(0,25) + "..."}}</p>
              <p v-else>{{item.token}}</p>
            </template>

            <!-- <template v-slot:item.serial="{ item }">
              <p v-if="item.serial.length > 25">{{item.serial.substr(0,25) + "..."}}</p>
              <p v-else>{{item.serial}}</p>
            </template> -->

            <!-- <template v-slot:item.status="{ item }">
              <p v-if="item.status == 0">{{item.status}} - Lisans Verilmemiş</p>
              <p v-if="item.status == 1">{{item.status}} - Sadece QR</p>
              <p v-if="item.status == 2">{{item.status}} - QR ve Role</p>
              <p v-if="item.status == 3">{{item.status}} - QR ve Klavye</p>
              <p v-if="item.status == 4">{{item.status}} - QR, Klavye ve Role</p>
            </template> -->

            <template v-slot:item.status="{ item }">
              <toggle-button :value="item.status === 1 ? true : false"
               :color="{checked : '#5cb85c', unchecked: '#d9534f '}"
               :width=60
               :font-size=11
               @change="changeDeviceStatus(item)"
               :sync="true"
               :labels="{checked: 'Aktif', unchecked: 'Pasif'}" />
            </template> 

            <!-- SLOT -->
            </v-data-table>
             <!-- <v-row width="40">
                <v-col cols="12" lg="12">
                        <v-col  v-if="progress_bar" cols="12" sm="12" md="12">
                          <v-progress-linear indeterminate  color="blue"></v-progress-linear>
                        </v-col>
                </v-col>
              </v-row> -->
              
          </v-card-text>
           
        </base-material-card>
      </v-col>

      <!-- <template>
        <v-row justify="center">
          <v-dialog
            v-model="add_dialog"
            persistent
            max-width="600px"
          >
            <v-card>
              <v-card-title>
                <span class="headline">Yeni Kontrol Noktası</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                    >
                      <v-text-field
                        label="UID *"
                        required
                        v-model.trim="addForm.uid"
                        hint="UID alanı daha sonradan değiştirilemez. Değiştirmek için kaydı silip yeniden eklemek gerekmektedir."
                        persistent-hint
                        :error-messages="uidErrors"
                        @input="$v.addForm.uid.$touch()"
                        @blur="$v.addForm.uid.$touch()"
                        @keydown.space="(event) => event.preventDefault()"
                      ></v-text-field>  
                    </v-col>
                    <v-col
                      cols="12"
                    >
                      <v-text-field
                        label="Seri No *"
                        required
                        v-model.trim="addForm.serial"
                        hint="Seri No alanı değiştirilemez. Değiştirmek için kaydı silip yeniden eklemek gerekmektedir."
                        persistent-hint
                        :error-messages="serialErrors"
                        @input="$v.addForm.serial.$touch()"
                        @blur="$v.addForm.serial.$touch()"
                        @keydown.space="(event) => event.preventDefault()"
                      ></v-text-field>  
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-text-field
                        label="Başlık *"
                        required
                        :error-messages="titleErrors"
                        hint="Başlık alanı müşteriye gösterilmez. Sadece teknik servis için kullanılır."
                        persistent-hint
                        v-model.trim="addForm.title"
                        @input="$v.addForm.title.$touch()"
                        @blur="$v.addForm.title.$touch()"
                      ></v-text-field>
                    </v-col>
                     <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-select
                        :items="['0','1', '2', '3', '4']"
                        label="Durum *"
                        required
                        :error-messages="statusErrors"
                        v-model.trim="addForm.status"
                        @input="$v.addForm.status.$touch()"
                        @blur="$v.addForm.status.$touch()"
                      >
                        <template slot="selection" slot-scope="data">
                          <!-- HTML that describe how select should render selected items 
                          <p v-if="data.item==0">{{data.item}} - Lisans Verilmemiş</p>
                          <p v-if="data.item==1">{{data.item}} - Sadece QR</p>
                          <p v-if="data.item==2">{{data.item}} - QR ve Role</p>
                          <p v-if="data.item==3">{{data.item}} - QR ve Klavye</p>
                          <p v-if="data.item==4">{{data.item}} - QR, Klavye ve Role</p>
                        </template>
                        <template slot="item" slot-scope="data">
                          <!-- HTML that describe how select should render items when the select is open 
                          <p v-if="data.item==0">{{data.item}} - Lisans Verilmemiş</p>
                          <p v-if="data.item==1">{{data.item}} - Sadece QR</p>
                          <p v-if="data.item==2">{{data.item}} - QR ve Role</p>
                          <p v-if="data.item==3">{{data.item}} - QR ve Klavye</p>
                          <p v-if="data.item==4">{{data.item}} - QR, Klavye ve Role</p>
                        </template>
                      </v-select>
                    </v-col>
                    <!-- <v-col cols="12">
                      <v-text-field
                        label="Token *"
                        required
                        v-model="addForm.token"
                        :error-messages="tokenErrors"
                        @input="$v.addForm.token.$touch()"
                        @blur="$v.addForm.token.$touch()"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close_add"
                >
                  Vazgeç
                </v-btn>d
                <v-btn
                  color="blue darken-1"
                  text
                  :disabled="saveButton"
                  @click="save()"
                >
                  Kaydet
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </template> -->


      <template>
        <v-row justify="center">
          <v-dialog
            v-model="edit_dialog"
            persistent
            max-width="600px"
          >
            
            <v-card>
              <v-card-title>
                <span class="headline">Cihaz Düzenle</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    
                    <v-col
                      cols="12"
                    >
                      <v-text-field
                        label="Seri No"
                        required
                        persistent-hint
                        readonly
                        v-model.trim="editForm.serial"
                      ></v-text-field>
                    </v-col>

                     <v-col
                      cols="6"
                    >
                      <v-text-field
                        label="Kayıt Tarihi"
                        required
                        persistent-hint
                        readonly
                        v-model.trim="editForm.created_at"
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="6"
                        v-if="editForm.customer != null && editForm.customer != '' && editForm.customer != -1 "
                    >
                      <v-text-field
                        label="Müşteri"
                        required
                        persistent-hint
                        readonly
                        v-model.trim="editForm.customer_name"
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="6"
                    >
                      <v-text-field
                        label="Cihaz adı"
                        required
                        persistent-hint
                        :error-messages="editNameErrors"
                        @input="$v.editForm.name.$touch()"
                        @blur="$v.editForm.name.$touch()"
                        v-model.trim="editForm.name"
                      ></v-text-field>
                    </v-col>

                    <!-- <v-col
                      v-if="editForm.customer != null && editForm.customer != '' && editForm.customer != -1 "
                      cols="6"
                    >
                    
                    </v-col> -->


                    <v-col
                      cols="6"
                    >
                    <label style="font-size:13px; margin-bottom: 0px"><b>Röle Modu:</b></label>
                      <v-radio-group
                        v-model="editForm.relay_mode"
                        row
                        style="margin-top:0px"
                      >
                        <v-radio
                          label="Hayır"
                          color="red"
                          value="No"
                        ></v-radio>
                        <v-radio
                        color="green"
                          label="Evet"
                          value="Yes"
                        ></v-radio>
                      </v-radio-group>
                    </v-col>

                    <!-- <v-col cols="6">

                    </v-col> -->


                    <v-col
                      cols="6"
                    >
                      <v-text-field
                        label="1. Röle Zamanı (Saat)"
                        v-if="editForm.relay_mode == 'Yes' "
                        required
                        persistent-hint
                        :error-messages="relay1Errors"
                        @input="$v.editForm.relay_time_1.$touch()"
                        @blur="$v.editForm.relay_time_1.$touch()"
                        @keydown.space="(event) => event.preventDefault()"
                        v-model.trim="editForm.relay_time_1"
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="6"
                    >
                      <v-text-field
                        label="2. Röle Zamanı (Saat)"
                        v-if="editForm.relay_mode == 'Yes' "
                        required
                        persistent-hint
                        :error-messages="relay2Errors"
                        @input="$v.editForm.relay_time_2.$touch()"
                        @blur="$v.editForm.relay_time_2.$touch()"
                        @keydown.space="(event) => event.preventDefault()"
                        v-model.trim="editForm.relay_time_2"
                      ></v-text-field>
                    </v-col>

                  </v-row>
                </v-container>
               
              </v-card-text>
              <v-card-actions>
                <v-btn
                color="red darken-1"
                left
                text
                @click="delete_device"
                >
                  Cihazı Sil
                </v-btn>
                <v-spacer></v-spacer>
                
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close_edit"
                >
                  Vazgeç
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  :disabled="updateButton"
                  @click="update()"
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
  import { DashboardAdminMixin } from './pages/mixins/DashboardAdmin'
  import { CommonAdminMixin } from './pages/mixins/CommonAdmin'
  import 'sweetalert2/dist/sweetalert2.min.css';
  import 'vue-toast-notification/dist/theme-sugar.css';
  import { required, maxLength, minLength, email, numeric, helpers } from 'vuelidate/lib/validators'
  


  const alphaNumAndDotValidator = helpers.regex('alphaNumAndDot', /^[a-z\d]*$/i);

  export default {
    name: 'Dashboard',
    mixins: [CommonAdminMixin,DashboardAdminMixin],

    validations : {
      editForm : {
        name : { required },
        relay_time_1 : { numeric },
        relay_time_2 : { numeric },
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

        editForm :{
          id : "",
          name : "",
          serial : "",
          created_at : "",
          customer : '',
          relay_mode : null,
          relay_time_1 : "",
          relay_time_2 : "",
          wifi_ip : "",
          wifi_mac : "",
          lan_mac : "",
          lan_ip : "",
          customer_name : "",

        },

      //   json_fields: {
      //   "UID": "uid",
      //   "Başlık": "title",
      //   "Seri No": "serial",
      //   "Kayıt Tarihi" : "register_date",
      //   "Token" : "token",
      //   "Durum": {
      //     field: "status",
      //     callback: (val) => {
      //       if (val == 0) {
      //         return `${val} - Lisans Verilmemiş`
      //       }else if (val == 1){
      //         return `${val} - Sadece QR` 
      //       }else if (val == 2){
      //         return `${val} - QR ve Role` 
      //       }else if (val == 3){
      //         return `${val} - QR ve Klavye` 
      //       }else{
      //         return `${val} - QR, Klavye ve Role` 
      //       }
      //     },
      //   },
      // },

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
      relay1Errors() {
        const errors = []
        if (!this.$v.editForm.relay_time_1.$dirty) return errors
        !this.$v.editForm.relay_time_1.numeric && errors.push('Lütfen geçerli bir değer giriniz')
        this.updateButton = false
        return errors
      },
      relay2Errors() {
        const errors = []
        if (!this.$v.editForm.relay_time_2.$dirty) return errors
        !this.$v.editForm.relay_time_2.numeric && errors.push('Lütfen geçerli bir değer giriniz')
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
        await this.get_all_devices();
      },

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


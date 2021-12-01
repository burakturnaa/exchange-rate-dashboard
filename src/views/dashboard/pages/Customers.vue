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
              Müşteriler
            </div>              
            <div class="subtitle-1 font-weight-light">
              <p v-if="list_type===0">Tüm Kayıtlar Listeleniyor</p>
              <p v-else>Aktif Kayıtlar Listeleniyor</p>
            </div>
          </template>           
          <v-card-text>           
            <v-data-table
              :items-per-page="10"
              :headers="headers_all_customers"
              :items="customers"
              class="elevation-1"
              :search="customers_search"             
            >
            <template v-slot:top>
              <v-row>
                <v-col cols="12" sm="8">                  
                    <v-text-field
                      class="mx-5 mb-5"
                        v-model.trim="customers_search"
                        append-icon="mdi-magnify"
                        :label="_T('search')"
                        single-line
                        hide-details
                      ></v-text-field>                      
                </v-col>
                <v-col class="text-right" cols="12" sm="4">
                  <template>
                    <v-row justify="end" class="my-2">
                      <v-dialog
                        v-model="add_customer_dialog"
                        persistent
                        max-width="600px"
                        
                      >
                        <template v-slot:activator="{ attrs }">
                          <v-btn
                            color="#050a23"
                            v-bind="attrs"
                            
                            class="mr-5"
                            @click="openAddForm"
                          >
                          <v-icon left>
                            mdi-account-plus
                          </v-icon>
                            Yeni Müşteri
                          </v-btn> 
                        </template>
                        <v-card>
                            <v-card-title>
                            <span class="text-h3">Yeni Müşteri Kartı</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                    <v-col
                                        cols="12"
                                        sm="6"
                                        md="4"
                                    >
                                        <v-text-field
                                        label="Adı*"
                                        required
                                        v-model="addForm.fname"
                                        :error-messages="addFnameErrors"
                                        @input="$v.addForm.fname.$touch()"
                                        @blur="$v.addForm.fname.$touch()"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        sm="6"
                                        md="4"
                                    >
                                        <v-text-field
                                        label="Soyadı*"
                                        required
                                        v-model="addForm.lname"
                                        :error-messages="addLnameErrors"
                                        @input="$v.addForm.lname.$touch()"
                                        @blur="$v.addForm.lname.$touch()"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        sm="6"
                                        md="4"
                                    >
                                        <v-text-field
                                        label="Ünvan*"
                                        required
                                        v-model="addForm.title"
                                        :error-messages="addTitleErrors"
                                        @input="$v.addForm.title.$touch()"
                                        @blur="$v.addForm.title.$touch()"
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="6">
                                        <v-text-field
                                        label="E-posta*"
                                        required
                                        v-model="addForm.email"
                                        :error-messages="addEmailErrors"
                                        @input="$v.addForm.email.$touch()"
                                        @blur="$v.addForm.email.$touch()"
                                        ></v-text-field>
                                    </v-col>
                                    

                                    <v-col cols="6">
                                        <v-text-field
                                        label="Telefon*"
                                        required
                                        v-model="addForm.phone"
                                        :error-messages="addPhoneErrors"
                                        hint="Telefon numarasını alan kodu ile birlikte giriniz."
                                        persistent-hint
                                        @input="$v.addForm.phone.$touch()"
                                        @blur="$v.addForm.phone.$touch()"
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="6">
                                        <v-text-field
                                        label="Cep Telefonu*"
                                        required
                                        v-model="addForm.mobile"
                                        hint="Cep telefonu numarası ülke kodu ile başlamalıdır. Örn: +90"
                                        persistent-hint
                                        :error-messages="addMobileErrors"
                                        @input="$v.addForm.mobile.$touch()"
                                        @blur="$v.addForm.mobile.$touch()"
                                        ></v-text-field>
                                    </v-col>

                                    <v-col
                                        cols="6"
                                    >
                                        <v-autocomplete
                                        :items="admins"
                                        v-model="admin"
                                        label="İlgili"
                                        :error-messages="addAdminErrors"
                                        @input="$v.admin_id.$touch()"
                                        @blur="$v.admin_id.$touch()"
                                        
                                        >
                                            <template slot="selection" slot-scope="data">
                                                <!-- HTML that describe how select should render selected items -->
                                                {{ data.item.fname }} {{ data.item.lname }}
                                            </template>
                                            <template slot="item" slot-scope="data">
                                                <!-- HTML that describe how select should render items when the select is open -->
                                                {{ data.item.fname }} {{ data.item.lname }}
                                            </template>
                                        </v-autocomplete>
                                    </v-col>
                                    
                                    <v-col cols="12">
                                        <v-text-field
                                        label="Adres*"
                                        required
                                        v-model="addForm.address"
                                        :error-messages="addAddressErrors"
                                        @input="$v.addForm.address.$touch()"
                                        @blur="$v.addForm.address.$touch()"
                                        ></v-text-field>
                                    </v-col>

                                    <v-col
                                        cols="12"
                                        
                                    >
                                        <v-autocomplete
                                        :items="devices"
                                        v-model="values"
                                        label="Cihazlar"
                                        multiple
                                        >
                                        
                                        </v-autocomplete>
                                    </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="close_addform"
                            >
                                KAPAT
                            </v-btn>
                            <v-btn
                                color="blue darken-1"
                                text
                                :loading="saveButton"
                                @click="save"
                            >
                                KAYDET
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-row>
                  </template>
                  <!-- <template>        
                      <v-btn
                        color="#050a23"
                        @click="add_customer_dialog = true"
                      >
                      <v-icon left>
                        mdi-account-plus
                      </v-icon>
                        {{_T('new')}}
                      </v-btn>                    
                  </template> -->
                </v-col>
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
                  <v-icon color="rgb(5, 10, 35)" v-bind="attrs" v-on="on" small class="mr-2" @click="refreshTokenButton(item)">mdi-refresh</v-icon>
                </template>
                <span>Token Değiştir</span>
              </v-tooltip>


              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon color="rgb(5, 10, 35)" v-bind="attrs" v-on="on" small @click="openEditForm(item)" class="mr-2">mdi-pencil</v-icon>
                </template>
                <span>Düzenle</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon color="red" v-bind="attrs" v-on="on" small class="mr-2" @click="deleteItem(item)">mdi-delete</v-icon>
                </template>
                <span>Sil</span>
              </v-tooltip>              
            </template>

            <!-- <template v-slot:item.created_at="{ item }">
                
              <p>{{ dateFormat(item.created_at,"dd-mm-yy h:MM:ss")}}</p>
            </template> -->

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
                </v-btn>
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
                <span class="text-h3">Müşteri Kartı Düzenle</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field
                            label="Adı*"
                            required
                            v-model="editForm.fname"
                            :error-messages="editFnameErrors"
                            @input="$v.editForm.fname.$touch()"
                            @blur="$v.editForm.fname.$touch()"
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field
                            label="Soyadı*"
                            required
                            v-model="editForm.lname"
                            :error-messages="editLnameErrors"
                            @input="$v.editForm.lname.$touch()"
                            @blur="$v.editForm.lname.$touch()"
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field
                            label="Ünvan*"
                            required
                            v-model="editForm.title"
                            :error-messages="editTitleErrors"
                            @input="$v.editForm.title.$touch()"
                            @blur="$v.editForm.title.$touch()"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="6">
                            <v-text-field
                            label="E-posta*"
                            required
                            v-model="editForm.email"
                            :error-messages="editEmailErrors"
                            @input="$v.editForm.email.$touch()"
                            @blur="$v.editForm.email.$touch()"
                            ></v-text-field>
                        </v-col>
                        

                        <v-col cols="6">
                            <v-text-field
                            label="Telefon*"
                            required
                            v-model="editForm.phone"
                            :error-messages="editPhoneErrors"
                            hint="Telefon numarasını alan kodu ile birlikte giriniz."
                            persistent-hint
                            @input="$v.editForm.phone.$touch()"
                            @blur="$v.editForm.phone.$touch()"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="6">
                            <v-text-field
                            label="Cep Telefonu*"
                            required
                            v-model="editForm.mobile"
                            hint="Cep telefonu numarası ülke kodu ile başlamalıdır. Örn: +90"
                            persistent-hint
                            :error-messages="editMobileErrors"
                            @input="$v.editForm.mobile.$touch()"
                            @blur="$v.editForm.mobile.$touch()"
                            ></v-text-field>
                        </v-col>

                        <v-col
                            cols="6"
                        >
                            <v-autocomplete
                            :items="admins"
                            v-model="admin_id"
                            label="İlgili"
                            :error-messages="editAdminErrors"
                            @input="$v.admin_id.$touch()"
                            @blur="$v.admin_id.$touch()"
                            
                            >
                                <template slot="selection" slot-scope="data">
                                    <!-- HTML that describe how select should render selected items -->
                                    {{ data.item.fname }} {{ data.item.lname }}
                                </template>
                                <template slot="item" slot-scope="data">
                                    <!-- HTML that describe how select should render items when the select is open -->
                                    {{ data.item.fname }} {{ data.item.lname }}
                                </template>
                            </v-autocomplete>
                        </v-col>
                        
                        <v-col cols="12">
                            <v-text-field
                            label="Adres*"
                            required
                            v-model="editForm.address"
                            :error-messages="editAddressErrors"
                            @input="$v.editForm.address.$touch()"
                            @blur="$v.editForm.address.$touch()"
                            ></v-text-field>
                        </v-col>

                        <v-col
                            cols="12"
                            
                        >
                            <v-autocomplete
                            :items="devices"
                            v-model="values"
                            label="Cihazlar"
                            multiple
                            >
                            
                            </v-autocomplete>
                        </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="close_edit"
                >
                    KAPAT
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    :loading="saveButton"
                    @click="update"
                >
                    KAYDET
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
  import "../../../../src/assets/loginpage/vendor/bootstrap/css/bootstrap.min.css";
  import { CustomersMixin } from './mixins/Customers'
  import { CommonAdminMixin } from './mixins/CommonAdmin'
  import 'sweetalert2/dist/sweetalert2.min.css';
  import 'vue-toast-notification/dist/theme-sugar.css';
  import { required, maxLength, minLength, email, numeric, helpers } from 'vuelidate/lib/validators'


  const alphaNumAndDotValidator = helpers.regex('alphaNumAndDot', /^[a-z\d]*$/i);
  const phoneValidator = helpers.regex('alphaNumAndDot', /^[0-9-) (]+/i);
  const mobileValidator = helpers.regex('alphaNumAndDot', /^\+[0-9-) (]+/i);

  export default {
    name: 'Dashboard',
    mixins: [CommonAdminMixin,CustomersMixin],

    validations : {
      editForm : {
        fname : { required },
        lname : { required },
        title : { required },
        email : { required, email },
        address : { required },
        phone : { required, phoneValidator, minLength : minLength(11) },
        mobile : { required, mobileValidator, minLength : minLength(13) },
      },
      addForm : {
        fname : { required },
        lname : { required },
        title : { required },
        email : { required, email },
        address : { required },
        phone : { required, phoneValidator, minLength : minLength(11) },
        mobile : { required, mobileValidator, minLength : minLength(13) },
      },
      admin_id : { required }
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

        add_customer_dialog : false,

        loading : false,

        list_type : 0,

        req_date_dialog : false,

        editForm :{
          id : "",
          fname : "",
          lname : "",
          title : "",
          phone : "0212",
          mobile : "+90",
          email : "",
          address : "",
        },
        addForm :{
          fname : "",
          lname : "",
          title : "",
          phone : "0212",
          mobile : "+90",
          email : "",
          address : "",
        },
        
        customers : [],
        admins : [],
        devices : [],
        values : [],
        admin : [],
        admin_id : "",
        customers_search : "",
      }
    },

    computed: {

        addFnameErrors(){
            const errors = []
            if (!this.$v.addForm.fname.$dirty) return errors
            !this.$v.addForm.fname.required && errors.push('Adı alanı boş bırakılamaz')
            this.updateButton = false
            return errors
        },
        addLnameErrors(){
            const errors = []
            if (!this.$v.addForm.lname.$dirty) return errors
            !this.$v.addForm.lname.required && errors.push('Soyadı alanı boş bırakılamaz')
            this.updateButton = false
            return errors
        },
        addTitleErrors(){
            const errors = []
            if (!this.$v.addForm.title.$dirty) return errors
            !this.$v.addForm.title.required && errors.push('Ünvan alanı boş bırakılamaz')
            this.updateButton = false
            return errors
        },
        addEmailErrors(){
            const errors = []
            if (!this.$v.addForm.email.$dirty) return errors
            !this.$v.addForm.email.required && errors.push('E-posta alanı boş bırakılamaz')
            !this.$v.addForm.email.email && errors.push('Lütfen geçerli bir email adresi giriniz')
            this.updateButton = false
            return errors
        },
        addAddressErrors(){
            const errors = []
            if (!this.$v.addForm.address.$dirty) return errors
            !this.$v.addForm.address.required && errors.push('Adres alanı boş bırakılamaz')
            this.updateButton = false
            return errors
        },
        addPhoneErrors(){
        const errors = []
        if (!this.$v.addForm.phone.$dirty) return errors
        !this.$v.addForm.phone.required && errors.push('Telefon alanı boş bırakılamaz')
        !this.$v.addForm.phone.phoneValidator && errors.push('Lütfen geçerli bir telefon numarası giriniz')
        !this.$v.addForm.phone.minLength && errors.push('Lütfen geçerli bir telefon numarası giriniz')
        this.updateButton = false
        return errors
        },
        addMobileErrors(){
        const errors = []
        if (!this.$v.addForm.mobile.$dirty) return errors
        !this.$v.addForm.mobile.required && errors.push('Cep telefonu alanı boş bırakılamaz')
        !this.$v.addForm.mobile.mobileValidator && errors.push('Lütfen geçerli bir cep telefonu numarası giriniz')
        !this.$v.addForm.mobile.minLength && errors.push('Lütfen geçerli bir cep telefonu numarası giriniz')
        this.updateButton = false
        return errors
        },
        addAdminErrors(){
        const errors = []
        if (!this.$v.admin_id.$dirty) return errors
        !this.$v.admin_id.required && errors.push('İlgili alanı boş bırakılamaz')
        this.updateButton = false
        return errors
        },



        editFnameErrors(){
            const errors = []
            if (!this.$v.editForm.fname.$dirty) return errors
            !this.$v.editForm.fname.required && errors.push('Adı alanı boş bırakılamaz')
            this.saveButton = false
            return errors
        },
        editLnameErrors(){
            const errors = []
            if (!this.$v.editForm.lname.$dirty) return errors
            !this.$v.editForm.lname.required && errors.push('Soyadı alanı boş bırakılamaz')
            this.saveButton = false
            return errors
        },
        editTitleErrors(){
            const errors = []
            if (!this.$v.editForm.title.$dirty) return errors
            !this.$v.editForm.title.required && errors.push('Ünvan alanı boş bırakılamaz')
            this.saveButton = false
            return errors
        },
        editEmailErrors(){
            const errors = []
            if (!this.$v.editForm.email.$dirty) return errors
            !this.$v.editForm.email.required && errors.push('E-posta alanı boş bırakılamaz')
            !this.$v.editForm.email.email && errors.push('Lütfen geçerli bir email adresi giriniz')
            this.saveButton = false
            return errors
        },
        editAddressErrors(){
            const errors = []
            if (!this.$v.editForm.address.$dirty) return errors
            !this.$v.editForm.address.required && errors.push('Adres alanı boş bırakılamaz')
            this.saveButton = false
            return errors
        },
        editPhoneErrors(){
        const errors = []
        if (!this.$v.editForm.phone.$dirty) return errors
        !this.$v.editForm.phone.required && errors.push('Telefon alanı boş bırakılamaz')
        !this.$v.editForm.phone.phoneValidator && errors.push('Lütfen geçerli bir telefon numarası giriniz')
        !this.$v.editForm.phone.minLength && errors.push('Lütfen geçerli bir telefon numarası giriniz')
        this.saveButton = false
        return errors
        },
        editMobileErrors(){
        const errors = []
        if (!this.$v.editForm.mobile.$dirty) return errors
        !this.$v.editForm.mobile.required && errors.push('Cep telefonu alanı boş bırakılamaz')
        !this.$v.editForm.mobile.mobileValidator && errors.push('Lütfen geçerli bir cep telefonu numarası giriniz')
        !this.$v.editForm.mobile.minLength && errors.push('Lütfen geçerli bir cep telefonu numarası giriniz')
        this.saveButton = false
        return errors
        },
        editAdminErrors(){
        const errors = []
        if (!this.$v.admin_id.$dirty) return errors
        !this.$v.admin_id.required && errors.push('İlgili alanı boş bırakılamaz')
        this.saveButton = false
        return errors
        },

      _T() { return this.$t }, // for i18 ;)
      headers_all_customers(){
          let tbl_headers =  [
          {
            sortable: true,
            text: "Adı",
            value: 'fname',
          },
          {
            sortable: true,
            text: "Soyadı",
            value: 'lname',
          },
          {
            sortable: true,
            text: "Kayıt Tarihi",
            value: 'created_at',
            align: 'center'
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

    watch : {
      admin(){
        console.log("ok");
        if (this.admins != "" && this.admins != null) {
          this.admin_id = this.admins.id
        }else{
          this.admin_id = ""
        }
      }
    },

    methods: {     
      async main(){
        await this.get_all_customers();
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


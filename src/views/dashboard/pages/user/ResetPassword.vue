<template>
  <v-container
    id="resetPassword"
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
              {{_T("settings")}}
            </div>

          </template> 
          <v-card-text>
              <template>
                <v-row>
                  <v-col cols="12">
                    
                    <template>
                      <v-card
                        class="mx-5"
                        outlined
                        elevation="1"
                      >
                        <v-card-title>
                          {{_T("new_password_card_title")}}
                        </v-card-title>
                        <v-card-text>

                          <v-alert
                          v-model="success_message"
                          dense
                          height="50"
                          type="success"
                          color="success"
                          style="padding:5px; font-size:15px"
                          >
                            {{_T('new_password_accepted')}}
                          </v-alert>
                          <v-alert
                          v-model="error_message"
                          dense
                          height="50"
                          type="error"
                          color="error"
                          style="padding:5px; font-size:15px"
                          >
                            {{_T('new_password_not_accepted')}}
                          </v-alert>
                          <!-- <p class="display-1 text--primary">asd</p> -->
                          <v-text-field
                            v-model="form.password"
                            :type="show_pass ? 'text' : 'password'"
                            name="input-10-2"
                            :label="_T('new_password')+' *'"
                            value="wqfasds"
                            class="input-group--focused"
                            :error-messages="passwordErrors"
                            @input="$v.form.password.$touch()"
                            @blur="$v.form.password.$touch()"
                            v-on:keypress.enter="send_new_password"
                          ></v-text-field>

                          <v-text-field
                            v-model="form.re_password"
                            :type="show_pass ? 'text' : 'password'"
                            name="input-10-2"
                            :label="_T('confirm_new_password')+' *'"
                            value="wqfasds"
                            class="input-group--focused"
                            :error-messages="rePasswordErrors"
                            @input="$v.form.re_password.$touch()"
                            @blur="$v.form.re_password.$touch()"
                            v-on:keypress.enter="send_new_password"
                          ></v-text-field>
                        </v-card-text>

                        <v-card-actions>
                          <v-btn
                            class="ml-auto"
                            @click="send_new_password"
                            rounded
                            color="#050a23"
                            :disabled="submit_button_status"
                          >
                            {{_T('reset_password')}}
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </template>
                  </v-col>
                </v-row>
              </template>
          </v-card-text>           
        </base-material-card>
      </v-col>
  </v-container>
</template>
<script>
  // import "../../src/assets/loginpage/vendor/bootstrap/css/bootstrap.min.css";
  // import { DashboardMixin } from './pages/mixins/Dashboard'
  // import { CommonMixin } from './pages/mixins/Common'
  import 'sweetalert2/dist/sweetalert2.min.css';
  import 'vue-toast-notification/dist/theme-sugar.css';

import '../../../../assets/loginpage/vendor/bootstrap/css/bootstrap.min.css';

  import { validationMixin } from 'vuelidate'
  // import { CommonMixin } from './pages/mixins/Common'
  import { required,alpha, maxLength, minLength, email, numeric, helpers, sameAs } from 'vuelidate/lib/validators'
  import jwt_decode from 'jwt-decode';
  const alphaNumAndDotValidator = helpers.regex('alphaNumAndDotValidator', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z+_)(&^%$#@!~}{|?><`'ıöüçşğÊéÂâêîÎûÛİÖ´ÜĞÇ*Ş€½£₺;,]*$/);

  export default {
    name: 'ResetPassword',
    // mixins: [CommonMixin,validationMixin,DashboardMixin],
    mixins: [],


    validations: {
      form : {
        password: { required, alphaNumAndDotValidator, maxLength: maxLength(32), minLength: minLength(8) },
        re_password : { required,
          sameAsPassword: sameAs(function() {
            return this.form.password;
          }) 
        }
      }
    },
    
    data () {
      return {
        // token : "",
        BASE_URL:process.env.VUE_APP_BASE_URL,
        API_URL:process.env.VUE_APP_API_URL,
        form: {
          password : "",
          re_password : "",
        },
        show_pass : false,
        submit_button_status : false, // True : disabled 

        user_type : "",

        success_message : false,
        error_message : false
       
      }
    },

    computed: {

      passwordErrors () {
        const errors = []
        if (!this.$v.form.password.$dirty) return errors
        !this.$v.form.password.required && errors.push(this.$t('new_password_required'))
        !this.$v.form.password.minLength && errors.push(this.$t('new_password_min'))
        !this.$v.form.password.maxLength && errors.push(this.$t('new_password_max'))
        !this.$v.form.password.alphaNumAndDotValidator && errors.push(this.$t('new_password_validate'))
        return errors
      },

      rePasswordErrors() {
        const errors = []
        if (!this.$v.form.re_password.$dirty) return errors
        !this.$v.form.re_password.required && errors.push(this.$t('re_new_password_required'))
        !this.$v.form.re_password.sameAsPassword && errors.push(this.$t('new_password_not_confirmed'))
        return errors
      },
      _T() { return this.$t }, // for i18 ;)
    },

    watch : {
      error_message (val) {
        if (val){
          setTimeout(() => {
            this.error_message = false;
            this.$router.push({path: '/user/login'});
          }, 3000);
        }
      },
      success_message (val) {
        if (val){
          setTimeout(() => {
            this.success_message = false;
              this.$router.push({path: `/user/login`});
          }, 3000);
        }
      },
    },

    methods: {
    /**
     * 
     * Check Email Token
     */
    check_token(){
      let e_token = this.$route.query.t;
      let decoded_e_token = jwt_decode(e_token);
      
      // console.log(decoded_e_token);

      if (Date.now() >= decoded_e_token.exp * 1000) {
        console.log("expired token..");
        this.$router.push({path: '/user/login'});
        
      }else{
        console.log("token is alive..");
        localStorage.e_token = e_token;
      }
    },
    async main(){
      this.check_token();
    },

    async send_new_password(){
      console.log('submit!')
      this.$v.form.$touch()
      console.log(this.$v.form.$invalid);
      if (this.$v.form.$invalid) {
        console.log("error");
        console.log(this.$v.form.$invalid);
        this.loading = false;
      }else{
        console.log("accepted");
        this.submit_button_status = true;

        // let token = localStorage.token;
        let form_data = {};
        form_data.new_password = this.form.password;

        var post_config = {
          method: 'put',
          url:   this.API_URL + `/customer/reset_password?t=` + this.$route.query.t,
          
          headers:{   
            // "x-email-token": this.$route.query.t
          },
          data : {
            new_password : this.form.password
          }
        };
        await this.axios(post_config)
        .then(response => {
          this.success_message = true;
          // console.log(response)
        })
        .catch( error => {
          this.error_message = true;
          if(error.response.status == 401){
            console.log('401 Auth!');
          }
          else{
            console.log(error);
          }
          this.loading = false;
        });

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
    max-width: 60%;
  }

  .v-card .v-card__title {
    color: #fff;
    background-color: #050a23;
    border-radius: 15px;
    padding-top: 10px;
    padding-bottom : 10px;
    margin-bottom: 25px;
    font-weight: 300;
  }

  @media (max-width: 992px) {
    .v-main__wrap section{
      max-width: 90%;
    }
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

.v-list-item .v-list-item__title{
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


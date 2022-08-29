<template>

<body v-if="sms_verification_page">

  <div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
			
				<form style="margin:0px auto" class="login100-form validate-form">
                <div class="text-center logo-mobil" style="display:none" >
					  <img width="200" style="margin-bottom:10%;" src="@/assets/logo_doviz.png" alt="IMG">
				</div>

                <div class="login100-pic js-tilt" data-tilt>
					<img src="@/assets/logo_doviz.png" alt="IMG">
				</div>
					<!-- <span style="color:#050a23;" class="login100-form-title">
						{{_T("panel")}}
					</span> -->
          <div class="row">
             <span v-if="smsCode_error" id="loginfail" class="fa fa-danger" >{{_T('sms_verification_fail')}}</span>
          </div>

          <div class="row">
             <span v-if="success" id="loginsuccess" class="fa fa-success" >Parola sıfırlama talebiniz için bir mail gönderdik! Lütfen gelen kutunuzu kontrol ediniz.</span>
          </div>

            <div class="form-group" :class="{ 'form-group--error': $v.sms_code.$error}">
                    <div class="wrap-input100 validate-input form__input" data-validate = "Valid email is required: ex@abc.xyz">
						<input class="input100" type="text" name="email" 
                        v-model.trim="sms_code"
                        :style="inputErrorStyle"
                        :error-messages="smsCodeErrors"
                        @input="$v.sms_code.$touch()"
                        @blur="$v.sms_code.$touch()" 
                        :placeholder="_T('sms_code')" 
                        v-on:keypress.enter="send_data">


						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="mdi mdi-lock" aria-hidden="true"></i>
						</span>

                        
					</div>
            </div>
                        <div class="error" v-if="!$v.sms_code.numeric"><span><i style="color:red; font-size:12px; margin-left:10px">Lütfen geçerli bir sms kodu giriniz.</i></span></div>
         
					<div class="container-login100-form-btn">
					 <v-btn @click="send_data_sms" elevation="2" :loading="loading_button"  class=" btn btn-block mybtn  text-white  turbg tx-tfm" style="background-color: #050a23; border-radius:30px" > Doğrula </v-btn>

					</div>         

				</form>
			</div>
		</div>
	</div>
</body>


<body v-else>

  <div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<div class="login100-pic js-tilt" data-tilt>
					<img style="margin-top:30%; margin-left:15%;" src="@/assets/logo_doviz.png" alt="IMG">
				</div>

        

				<form class="login100-form validate-form">
          <div class="text-center logo-mobil" style="display:none" >
					  <img width="200" style="margin-bottom:10%;" src="@/assets/logo_doviz.png" alt="IMG">
				  </div>
					<span style="color:#050a23;" class="login100-form-title">
						{{_T("panel")}}
					</span>
          <div class="row">
             <span v-if="username_pass_error" id="loginfail" class="fa fa-danger" >{{_T('login_fail')}}</span>
          </div>
         
					<div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input class="input100" type="text" name="email" v-model="username"  :placeholder="_T('user_name')" v-on:keypress.enter="send_data">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="mdi mdi-account" aria-hidden="true"></i>
						</span>
					</div>

					<div class="wrap-input100 validate-input" data-validate = "Password is required">
						<input class="input100" type="password" name="pass" v-model="password" :placeholder="_T('password')" v-on:keypress.enter="send_data">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="mdi mdi-lock" aria-hidden="true"></i>
						</span>
					</div>
<!-- 
          <div>
            <a class="float-right" href="/user/forgot-password">Şifremi Unuttum?</a>
          </div> -->
					
					<div class="container-login100-form-btn">
					 <v-btn @click="send_data" elevation="2" :loading="loading_button" class=" btn btn-block mybtn  text-white  turbg tx-tfm" style="background-color: #050a23; border-radius:30px" > {{_T('login_btn')}} </v-btn>
            <!--
           <div class="col-6  mx-auto  text-right  locale-switcher float-left" >
                <div class="row"  style="margin-top:10px;float:left">
                    <div class="col-12 col-md-4">
                      <span style="display:block; text-align:right; margin:0 10px; padding-top:5px;" id="metarial-icons" class="material-icons"> language</span>
                      </div>
                      <div class="col-12 col-md-3">
                      <select style="border:solid 1px #333; padding:5px; border-radius:5px; justift-content:ce" v-model="$i18n.locale"><i aria-hidden="true" id="v-icon" class="v-icon notranslate mdi mdi-login theme--dark" style="font-size: 20px; color:#000;"></i>
                      <option value="en"> English </option>
                      <option value="tr">Türkçe</option>
                      </select>
                      </div>
                </div>
            </div> -->
					</div>         

				</form>
			</div>
		</div>
	</div>
</body>

</template>


<script>

import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '../../../assets/loginpage/vendor/jquery/jquery-3.2.1.min.js';
import '../../../assets/loginpage/vendor/bootstrap/js/popper.js';

import '../../../assets/loginpage/vendor/bootstrap/css/bootstrap.min.css';
import '../../../assets/loginpage/vendor/animate/animate.css';
import '../../../assets/loginpage/vendor/css-hamburgers/hamburgers.min.css';
import '../../../assets/loginpage/vendor/select2/select2.min.css';
import {EventBus} from '../../../views/dashboard/components/custom/event-bus'
var jwt = require('jsonwebtoken');
import { required, numeric } from 'vuelidate/lib/validators'



  export default {
    name: 'Login',

    validations: {
        sms_code: {required, numeric}
    },

    props: {

    },

    data: () => ({
      BASE_URL:process.env.VUE_APP_BASE_URL,
      API_URL:process.env.VUE_APP_API_URL,

      username:"",
      password:"",
      username_pass_error    :  false,
      loading_button : false,

      sms_verification_page : false,

      sms_code:"",
      smsCode_error    :  false,
      success    :  false,
      loading_button : false,

      inputErrorStyle: {
          "border" : "1px solid red !important"
      }



    }),

    computed: {
      _T() { return this.$t; },
      lang() {return this.$t('lang') },

      smsCodeErrors(){
        const errors = []
        if (!this.$v.sms_code.$dirty) return errors
        !this.$v.sms_code.required && errors.push('Sms kodu alanı boş bırakılamaz.')
        !this.$v.sms_code.numeric && errors.push('Lütfen geçerli bir sms kodu giriniz.')
        // console.log(errors);
        if (errors == "") {
            this.inputErrorStyle.border = "1px solid green !important"
        }else{
            this.inputErrorStyle.border = "1px solid red !important"
        }
        return errors
      }

    },

    methods: {

      async send_data()
      {
        this.loading_button = true;
        this.login_button = true;
        let form_data = {}
        form_data.username = this.username
        form_data.password = this.password
        EventBus.$emit("login",form_data);
        
        await this.axios.post(this.API_URL+'/usrapp/token/',form_data).then((response) => {
            if (response.status === 200) {
                // let decoded = jwt_decode(response.data.a_token);
                // console.log(decoded);
                console.log("success ! redirecting to sms verification page");
                // let token = response.data.payload.token;
                // localStorage.token = token;

                // this.$router.push({path: '/sms-verification'});
                this.sms_verification_page = true
                this.loading_button = false

            }else{
                if(response.data.meta.errors){
                    console.log(response.data.meta.errors.msg);
                }else{
                    console.log(response.data.meta);
                }
                this.show_username_pass_error();
                this.loading_button = false;
            }
        
            }).catch(error => {
                
                this.loading_button = false;
                console.log(error);
                if (error.response.status == 401 ) {
                    console.log(error.response.data.meta);
                    this.show_username_pass_error();
                }
            })
         
      },
      show_username_pass_error(){
        this.username_pass_error = true
        setTimeout(() => {
          this.username_pass_error = false

        }, 5000);
      },
      check_token(){
      
        return new Promise((resolve,reject) =>{
          
          let formData = {};
          formData.token = localStorage.token;
          // start axios
          var post_config =
          {
            method: 'post',
            url:  this.API_URL+"/admin/check_token",
            headers: {
              'Content-Type': 'application/json'
            },
            data : formData
          };

          this.axios(post_config)
          .then(response => {
            if(response.data == undefined)   reject("no response")
            if (response.status === 401)
            {
              //invalid token
              console.log("check_token 200  -> invalid token")
              // localStorage.token = "";
              // window.location.href = this.BASE_URL + "/user/login"
              reject("invalid_token")
            }
            resolve(response.data)
          })
          .catch( e =>
            {
              console.log("horor:" + e);
              // localStorage.token = "";
              // window.location.href = this.BASE_URL + "/user/login"
              reject("invalid_token")
            });
        });

      }, 

      async send_data_sms()
      {
        console.log('submit!')
        this.$v.sms_code.$touch()
        console.log(this.$v.sms_code.$invalid);
        if (this.$v.sms_code.$invalid) {
            console.log("error");
            console.log(this.$v.sms_code.$invalid);
            this.loading = false;
        }else{
        this.loading_button = true;
        let form_data = {}
        form_data.code = this.sms_code
        form_data.username = this.username
        form_data.password = this.password
        
        await this.axios.post(this.API_URL+'/usrapp/login',form_data).then((response) => {
            if (response.status === 200) {
                // let decoded = jwt_decode(response.data.a_token);
                // console.log(decoded);
                console.log("success !");
                // let token = response.data.payload.token;
                // localStorage.token = token;
                EventBus.$off('login')
                localStorage.access = response.data.access
                localStorage.refresh = response.data.refresh
                this.$router.push({path: '/dashboard'});

                // this.show_success_message()
                this.loading_button = false;
                
            }else{ 
                console.log(response.data.meta);
                
                this.show_username_error();
            }
            }).catch(error => {
                setTimeout(() => {
                   this.login_button = false;
                }, 3000);

                console.log(error);
                if (error.response.status == 404 || error.response.status == 401 ) {
                    console.log(error.response.data.meta);
                    this.show_username_error();
                    this.loading_button = false;
                }
                this.username = "";
            })
        }
      },

      show_username_error(){
        this.smsCode_error = true
        setTimeout(() => {
          this.smsCode_error = false
          
        }, 5000);
      },
      show_success_message(){
          this.success = true;
          setTimeout(() => {
            this.success = false
          
        }, 5000);
      }


    },
    async mounted(){
    
    }

    //
  }
</script>

<style  scoped>

/*//////////////////////////////////////////////////////////////////
[ FONT ]*/

@font-face {
  font-family: Poppins-Regular;
  src: url('../../../assets/loginpage/fonts/poppins/Poppins-Regular.ttf'); 
}

@font-face {
  font-family: Poppins-Bold;
  src: url('../../../assets/loginpage/fonts/poppins/Poppins-Bold.ttf'); 
}

@font-face {
  font-family: Poppins-Medium;
  src: url('../../../assets/loginpage/fonts/poppins/Poppins-Medium.ttf'); 
}

@font-face {
  font-family: Montserrat-Bold;
  src: url('../../../assets/loginpage/fonts/montserrat/Montserrat-Bold.ttf'); 
}

/*//////////////////////////////////////////////////////////////////
[ RESTYLE TAG ]*/

* {
	margin: 0px; 
	padding: 0px; 
	box-sizing: border-box;
}

body, html {
	height: 100%;
	font-family: Poppins-Regular, sans-serif;
}

/*---------------------------------------------*/

a {
	font-family: Poppins-Regular;
	font-size: 14px;
	line-height: 1.7;
	color: #666666;
	margin: 0px;
	transition: all 0.4s;
	-webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
}

a:focus {
	outline: none !important;
}

a:hover {
	text-decoration: none;
  color: #57b846;
}

/*---------------------------------------------*/
h1,h2,h3,h4,h5,h6 {
	margin: 0px;
}

p {
	font-family: Poppins-Regular;
	font-size: 14px;
	line-height: 1.7;
	color: #666666;
	margin: 0px;
}

ul, li {
	margin: 0px;
	list-style-type: none;
}


/*---------------------------------------------*/
input {
	outline: none;
	border: none;
}

textarea {
  outline: none;
  border: none;
}

textarea:focus, input:focus {
  border-color: transparent !important;
}

input:focus::-webkit-input-placeholder { color:transparent; }
input:focus:-moz-placeholder { color:transparent; }
input:focus::-moz-placeholder { color:transparent; }
input:focus:-ms-input-placeholder { color:transparent; }

textarea:focus::-webkit-input-placeholder { color:transparent; }
textarea:focus:-moz-placeholder { color:transparent; }
textarea:focus::-moz-placeholder { color:transparent; }
textarea:focus:-ms-input-placeholder { color:transparent; }

input::-webkit-input-placeholder { color: #999999; }
input:-moz-placeholder { color: #999999; }
input::-moz-placeholder { color: #999999; }
input:-ms-input-placeholder { color: #999999; }

textarea::-webkit-input-placeholder { color: #999999; }
textarea:-moz-placeholder { color: #999999; }
textarea::-moz-placeholder { color: #999999; }
textarea:-ms-input-placeholder { color: #999999; }

/*---------------------------------------------*/
button {
	outline: none !important;
	border: none;
	background: transparent;
}

button:hover {
	cursor: pointer;
}

iframe {
	border: none !important;
}


/*//////////////////////////////////////////////////////////////////
[ Utility ]*/
#loginfail{
  background-color: red;
  color: #fff;
  padding: 10px 20px;
  margin: 10px;
  border-radius: 20px;
  width: 100%;
  font-size: 15px;
  opacity: 0.7;

}
.txt1 {
  font-family: Poppins-Regular;
  font-size: 13px;
  line-height: 1.5;
  color: #999999;
}

.txt2 {
  font-family: Poppins-Regular;
  font-size: 13px;
  line-height: 1.5;
  color: #666666;
}




/*//////////////////////////////////////////////////////////////////
[ login ]*/

.limiter {
  width: 100%;
  margin: 0 auto;
}

.container-login100 {
  width: 100%;  
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  /* background: linear-gradient(90deg, rgb(67, 58, 165) 12%, rgb(70, 70, 163) 43%, rgb(35, 41, 167,0.5) 93%); */

  /* background-image: radial-gradient(circle, #075f89, #016f91, #157f98, #2e8e9c, #479da0); */

  /* background-image: linear-gradient(to right top, #075f89, #056a9a, #0375ab, #0381bd, #058ccf, #058ccf, #058ccf, #058ccf, #0381bd, #0375ab, #056a9a, #075f89); */

  /*  background-image: linear-gradient(to bottom, #050a23, #1f1832, #38233f, #532e49, #6d3b51, #6d3b51, #6d3b51, #6d3b51, #532e49, #38233f, #1f1832, #050a23); */

  /* background-image: linear-gradient(to left top, #050a23, #201932, #3a2540, #55324c, #704055, #704055, #704055, #704055, #55324c, #3a2540, #201932, #050a23); */

  background-image: linear-gradient(to bottom, #1b293f, #202133, #1f1a27, #1b131b, #140c11, #140c11, #140c11, #140c11, #1b131b, #1f1a27, #202133, #1b293f);
}

.wrap-login100 {
  width: 960px;
  background: #fff;
  border-radius: 100px;
  overflow: hidden;

  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 100px 130px 100px 95px;
  box-shadow: 10px 10px 100px #335ea259 inset;
}

/*------------------------------------------------------------------
[  ]*/
.login100-pic {
  width: 316px;
}

.login100-pic img {
  max-width: 100%;
}


/*------------------------------------------------------------------
[  ]*/
.login100-form {
  width: 290px;
}

.login100-form-title {
  font-family: Poppins-Bold;
  font-size: 24px;
  color: #333333;
  line-height: 1.2;
  text-align: center;

  width: 100%;
  display: block;
  padding-bottom: 54px;
}


/*---------------------------------------------*/
.wrap-input100 {
  position: relative;
  width: 100%;
  z-index: 1;
  margin-bottom: 10px;
}

.input100 {
  font-family: Poppins-Medium;
  font-size: 15px;
  line-height: 1.5;
  color: #666666;

  display: block;
  width: 100%;
  background: #e6e6e6;
  height: 50px;
  border-radius: 25px;
  padding: 0 30px 0 68px;
}


/*------------------------------------------------------------------
[ Focus ]*/
.focus-input100 {
  display: block;
  position: absolute;
  border-radius: 25px;
  bottom: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  box-shadow: 0px 0px 0px 0px;
  color: rgba(70, 106, 184, 0.8);
}

.input100:focus + .focus-input100 {
  -webkit-animation: anim-shadow 0.5s ease-in-out forwards;
  animation: anim-shadow 0.5s ease-in-out forwards;
}

@-webkit-keyframes anim-shadow {
  to {
    box-shadow: 0px 0px 70px 25px;
    opacity: 0;
  }
}

@keyframes anim-shadow {
  to {
    box-shadow: 0px 0px 70px 25px;
    opacity: 0;
  }
}

.symbol-input100 {
  font-size: 15px;

  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  position: absolute;
  border-radius: 25px;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-left: 35px;
  pointer-events: none;
  color: #666666;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.input100:focus + .focus-input100 + .symbol-input100 {
  color: #4a47a3;
  padding-left: 28px;
}

/*------------------------------------------------------------------
[ Button ]*/
.container-login100-form-btn {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  padding-top: 20px;
}

.login100-form-btn {
  font-family: Montserrat-Bold;
  font-size: 15px;
  line-height: 1.5;
  color: #fff;
  text-transform: uppercase;

  width: 100%;
  height: 50px;
  border-radius: 25px;
  background: #4a47a3;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 25px;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.login100-form-btn:hover {
  background: #333333;
}



/*------------------------------------------------------------------
[ Responsive ]*/



@media (max-width: 992px) {
  .wrap-login100 {
    padding: 177px 90px 33px 85px;
  }

  .login100-pic {
    width: 35%;
  }

  .login100-form {
    width: 50%;
  }
  
}

@media (max-width: 768px) {
  .wrap-login100 {
    padding: 100px 80px 33px 80px;
  }
  


  .login100-pic {
    display: none;
  }

  .login100-form {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .wrap-login100 {
    padding: 100px 15px 33px 15px;
    min-height: 450px;
  }
  .login100-form .logo-mobil{
    display: block !important;
    
  }

  .container-login100-form-btn{
  justify-content: center !important;
  }
  .container-login100-form-btn button{
    width: 200px;
  }

}



/*------------------------------------------------------------------
[ Alert validate ]*/

.validate-input {
  position: relative;
}

.alert-validate::before {
  content: attr(data-validate);
  position: absolute;
  max-width: 70%;
  background-color: white;
  border: 1px solid #c80000;
  border-radius: 13px;
  padding: 4px 25px 4px 10px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 8px;
  pointer-events: none;

  font-family: Poppins-Medium;
  color: #c80000;
  font-size: 13px;
  line-height: 1.4;
  text-align: left;

  visibility: hidden;
  opacity: 0;

  -webkit-transition: opacity 0.4s;
  -o-transition: opacity 0.4s;
  -moz-transition: opacity 0.4s;
  transition: opacity 0.4s;
}

.alert-validate::after {
  content: "\f06a";
  font-family: FontAwesome;
  display: block;
  position: absolute;
  color: #c80000;
  font-size: 15px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 13px;
}

.alert-validate:hover:before {
  visibility: visible;
  opacity: 1;
}

@media (max-width: 992px) {
  .alert-validate::before {
    visibility: visible;
    opacity: 1;
  }
}
</style>


// =========================================================
// * Vuetify Material Dashboard - v2.1.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vuetify-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import {Howl, Howler} from 'howler';
import VueSweetalert2 from 'vue-sweetalert2';
import VueToast from 'vue-toast-notification';
import jwt from 'jsonwebtoken';
import JsonExcel from "vue-json-excel";
import Vuelidate from 'vuelidate'
import AxiosPlugin from 'vue-axios-cors';
import jwt_decode from "jwt-decode";
import ToggleButton from 'vue-js-toggle-button'
import VueResource from "vue-resource";
import VueMask from 'v-mask'
// import VueMoment from "vue-moment";
import moment from "moment-timezone";

moment.tz.guess();
// Vue.use(VueMoment, { moment });



// import { ToastProgrammatic as Toast } from 'buefy'

import Notifications from "./views/dashboard/component/NotificationPlugin";
Vue.use(VueMask)
//axios here //

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);
// Vue.use(AxiosPlugin);
// axios.defaults.withCredentials = true;
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.xsrfHeaderName = "X-CSRFToken";
// axios.defaults.xsrfCookieName = "csrftoken";

//axios here //

// const url = location.href;
// let domain = (new URL(url));
// console.log(domain.hostname);
// if (domain.hostname == "51.195.168.9") {
//   window.location.href = "https://it.xenonsmart.com";
// }


Vue.use(Notifications);

Vue.use(ToggleButton);
Vue.use(jwt);
Vue.use(VueSweetalert2);
Vue.use(VueToast);
Vue.use(Vuelidate);

// Vue.use(VueResource);

// window.EventBus = new Vue();

// Vue.component("map-wrapper", MapWrapper);


Vue.config.productionTip = false

Vue.component("downloadExcel", JsonExcel);

new Vue({
  router,
  store,
  Notifications,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')

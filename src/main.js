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
import moment from "moment-timezone";

moment.tz.guess();

import Notifications from "./views/dashboard/component/NotificationPlugin";
Vue.use(VueMask)

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);

Vue.use(Notifications);

Vue.use(ToggleButton);
Vue.use(jwt);
Vue.use(VueSweetalert2);
Vue.use(VueToast);
Vue.use(Vuelidate);

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

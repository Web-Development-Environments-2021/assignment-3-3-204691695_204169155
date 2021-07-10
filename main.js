import '@fortawesome/fontawesome-free/css/all.min.css'
import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";
import VueCookies from "vue-cookies";
import routes from "./routes";
import VueRouter from "vue-router";
var defaultPic = require("@/assets/defaultPic.png")
Vue.use(VueRouter);
const router = new VueRouter({
  routes
});

import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "mdbootstrap/css/mdb.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css";
//mdb
import "mdbvue/lib/css/mdb.min.css";
//import 'mdb-vue-ui-kit/css/mdb.min.css';
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin, 
  InputGroupPlugin,
  FormRadioPlugin,
  FormCheckboxPlugin,
  TablePlugin,
  FormDatepickerPlugin,
  FormTimepickerPlugin,
  PaginationPlugin,
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin, 
  InputGroupPlugin,
  FormRadioPlugin,
  FormCheckboxPlugin,
  FormDatepickerPlugin,
  FormTimepickerPlugin,
  TablePlugin,
  PaginationPlugin,
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);
Vue.use(VueCookies);
axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axios.defaults.withCredentials = true;
// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const shared_data = {
  server_url : "http://localhost:3000",
  username: undefined,
  pic: defaultPic,
  login(username, pic) {
    localStorage.setItem("username", username);
    localStorage.setItem("pic", pic);
    this.username = username;
    this.pic = pic;
    console.log("login", this.username);
  },
  logout() {
    localStorage.clear();
    this.username = undefined;
    console.log("logout");
    Vue.$cookies.remove("session");
  },
};

new Vue({
  router,
  data() {
    return {
      store: shared_data
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000
      });
    }
  },
  render: (h) => h(App)
}).$mount("#app");

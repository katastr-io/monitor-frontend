import d3 from "vue-d3";
import Vue from "vue";
import axios from "axios";
import App from "./App";

Vue.use(d3);

axios.defaults.baseURL = "https://monitor.katastr.io";

Vue.prototype.$http = axios;
// Vue.http.options.root = "https://monitor.katastr.io";

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
});

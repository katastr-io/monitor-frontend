import d3 from "vue-d3";
import Vue from "vue";
import axios from "axios";
import App from "./App";
import Vue2Leaflet from "vue2-leaflet";

Vue.component("v-map", Vue2Leaflet.Map);
Vue.component("v-marker", Vue2Leaflet.Marker);
Vue.component("v-poly", Vue2Leaflet.Polyline);
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer);
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

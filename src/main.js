import d3 from "vue-d3";
import Vue from "vue";
import App from "./App";

Vue.use(d3);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});

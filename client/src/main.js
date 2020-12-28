import * as Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import router from "./router";
import store from "./store";
import common from "./mixins/common";
import request from "./utilities/request";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

let app = Vue.createApp(App)
  .use(store)
  .use(router);
app.mixin(common);
app.config.globalProperties.$http = request;
app.use(Vuex);
app.mount("#app");
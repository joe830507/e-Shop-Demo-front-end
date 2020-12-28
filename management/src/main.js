import Vue from "vue";
import store from "./store";
import router from "./router";
import App from "./App.vue";
import common from "./mixins/common";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import "vue2-datepicker/index.css";

Vue.mixin(common);

let app = new Vue({
  render: (h) => h(App),
  router,
  store,
});
app.$mount("#app");

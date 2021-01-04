import Vue from "vue";
import Vuex from "vuex";
import customer from "./customer";
import product from "./product";
import loading from "./loading";
import purchaseRecord from "./purchaseRecord";

Vue.use(Vuex);
const allModules = {
  modules: {
    customer,
    product,
    loading,
    purchaseRecord,
  },
};
const store = new Vuex.Store(allModules);

export default store;

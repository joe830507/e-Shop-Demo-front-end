import Vue from "vue";
import Vuex from "vuex";
import customer from "./customer";
import product from "./product";
import employee from "./employee";
import supplier from "./supplier";
import loading from "./loading";

Vue.use(Vuex);
const allModules = {
  modules: {
    customer,
    product,
    employee,
    supplier,
    loading,
  },
};
const store = new Vuex.Store(allModules);

export default store;

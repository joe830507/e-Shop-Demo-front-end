import { createStore } from "vuex";
import customer from "./customer";
import product from "./product";

const store = createStore({
  modules: { customer, product },
});

export default store;

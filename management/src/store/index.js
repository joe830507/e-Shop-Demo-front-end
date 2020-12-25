import { createStore } from "vuex";
import customer from "./customer";
import product from "./product";
import employee from "./employee";

const store = createStore({
  modules: { customer, product,employee },
});

export default store;

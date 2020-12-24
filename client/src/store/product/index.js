import req from "../../requests/product";
const product = {
  state: {
    productTypes: [],
  },
  mutations: {
    fetchProductTypes(state, value) {
      state.productTypes = value;
    },
  },
  actions: {
    fetchProductTypes({ state }) {
      req.fetchProductTypes().then((res) => {
        state.productTypes = res;
      });
    },
  },
  getters: {
    productTypes: (state) => {
      return state.productTypes;
    },
  },
};
export default product;

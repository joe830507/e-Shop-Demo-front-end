import req from "../../requests/product";
import reqForProductType from "../../requests/productType";
const product = {
  state: {
    products: [],
    productPages: {
      totalCount: 0,
      pageSize: 10,
      currentPage: 1,
      totalPages: 1,
    },
    productTypes: [],
  },
  mutations: {
    products(state, value) {
      state.products = value;
    },
    productPages(state, value) {
      state.productPages = value;
    },
    productTypes(state, value) {
      state.productTypes = value;
    },
  },
  actions: {
    getProducts({ commit }, payload) {
      commit("displayLoading", false);
      req.getProducts(payload).then((res) => {
        commit("products", res.body);
        commit("productPages", res.pages);
        commit("productTypes", res.productTypes);
        commit("displayLoading", true);
      });
    },
    deleteProducts({ commit }, payload) {
      commit("displayLoading", false);
      return new Promise((resolve) => {
        req.deleteProducts(payload).then(() => {
          commit("displayLoading", true);
          resolve();
        });
      });
    },
    addProduct({ commit }, payload) {
      commit("displayLoading", false);
      return new Promise((resolve) => {
        req.addProduct(payload).then(() => {
          commit("displayLoading", true);
          resolve();
        });
      });
    },
    updateProduct({ commit }, payload) {
      commit("displayLoading", false);
      return new Promise((resolve) => {
        req.updateProduct(payload).then(() => {
          commit("displayLoading", true);
          resolve();
        });
      });
    },
    addProductType({ commit }, payload) {
      commit("displayLoading", false);
      return new Promise((resolve) => {
        reqForProductType
          .addProductType(payload)
          .then(() => {
            commit("displayLoading", true);
            resolve();
          })
          .catch((error) => {
            alert(error);
            commit("displayLoading", false);
          });
      });
    },
  },
  getters: {
    products: (state) => {
      return state.products;
    },
    productPages: (state) => {
      return state.productPages;
    },
    productTypes: (state) => {
      return state.productTypes;
    },
  },
};
export default product;

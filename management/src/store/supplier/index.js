import req from "../../requests/supplier";
const supplier = {
  state: {
    suppliers: [],
    supplierPages: {
      totalCount: 0,
      pageSize: 10,
      currentPage: 1,
      totalPages: 1,
    },
  },
  mutations: {
    suppliers(state, value) {
      state.suppliers = value;
    },
    supplierPages(state, value) {
      state.supplierPages = value;
    },
  },
  actions: {
    getSuppliers({ commit }, payload) {
      commit("displayLoading", false);
      req.getSuppliers(payload).then((res) => {
        commit("suppliers", res.body);
        commit("supplierPages", res.pages);
        commit("productTypes", res.productTypes);
        commit("displayLoading", true);
      });
    },
    addSupplier({ commit }, payload) {
      commit("displayLoading", false);
      return new Promise((resolve) => {
        req.addSupplier(payload).then(() => {
          commit("displayLoading", true);
          resolve();
        });
      });
    },
    updateSupplier({ commit }, payload) {
      commit("displayLoading", false);
      return new Promise((resolve) => {
        req.updateSupplier(payload).then(() => {
          commit("displayLoading", true);
          resolve();
        });
      });
    },
    deleteSupplier({ commit }, payload) {
      commit("displayLoading", false);
      return new Promise((resolve) => {
        req.deleteSuppliers(payload).then(() => {
          commit("displayLoading", true);
          resolve();
        });
      });
    },
  },
  getters: {
    suppliers: (state) => {
      return state.suppliers;
    },
    supplierPages: (state) => {
      return state.supplierPages;
    },
  },
};
export default supplier;

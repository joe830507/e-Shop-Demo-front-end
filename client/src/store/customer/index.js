import req from "../../requests/customer";
const customer = {
  state: {
    customers: [],
    custPages: {
      totalCount: 0,
      pageSize: 10,
      currentPage: 1,
      totalPages: 1,
    },
  },
  mutations: {
    customers(state, value) {
      state.customers = value;
    },
    custPages(state, value) {
      state.custPages = value;
    },
  },
  actions: {
    addCustomer({ commit }, payload) {
      commit("displayLoading", false);
      return new Promise((resolve) => {
        req.addCustomer(payload).then(() => {
          commit("displayLoading", true);
          resolve();
        });
      });
    },
    updateCustomer({ commit }, payload) {
      commit("displayLoading", false);
      return new Promise((resolve) => {
        req.updateCustomer(payload).then(() => {
          commit("displayLoading", true);
          resolve();
        });
      });
    },
    getCustomers({ commit }, payload) {
      commit("displayLoading", false);
      req.getCustomers(payload).then((res) => {
        commit("customers", res.body);
        commit("custPages", res.pages);
        commit("displayLoading", true);
      });
    },
    deleteCustomer({ commit }, payload) {
      commit("displayLoading", false);
      return new Promise((resolve) => {
        req.deleteCustomer(payload).then(() => {
          commit("displayLoading", true);
          resolve();
        });
      });
    },
  },
  getters: {
    customers: (state) => {
      return state.customers;
    },
    custPages(state) {
      return state.custPages;
    },
  },
};

export default customer;

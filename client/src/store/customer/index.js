import req from "../../requests/customer";
const customer = {
  state: {
    isLogin: false,
  },
  mutations: {
    isLogin(state, payload) {
      state.isLogin = payload;
    },
  },
  actions: {
    customerLogin({ commit }, payload) {
      commit("displayLoading", false);
      return new Promise((resolve) => {
        req.customerLogin(payload).then((res) => {
          const token = res.token;
          sessionStorage.setItem("token", token);
          commit("isLogin", token);
          commit("displayLoading", true);
          resolve();
        });
      });
    },
    customerLogout({ commit }) {
      commit("displayLoading", false);
      req.customerLogout().then(() => {
        let token = sessionStorage.getItem("token");
        sessionStorage.removeItem("token");
        commit("logout", !!token);
        commit("displayLoading", true);
        const location = window.location;
        if ("/home" === location.pathname) {
          location.reload();
        } else {
          document.location.href = `${location.protocol}//${location.hostname}:${location.port}/home`;
        }
      });
    },
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
  },
  getters: {
    isLogin: (state) => {
      return state.isLogin;
    },
  },
};

export default customer;

import req from "../../requests/customer";
const customer = {
  state: {
    isLogin: !!sessionStorage.getItem("token"),
  },
  mutations: {
    isLogin(state, value) {
      state.isLogin = value;
    },
  },
  actions: {
    custLogin(context, payload) {
      return req.custLogin(payload).then((res) => {
        const token = res.token;
        sessionStorage.setItem("token", token);
        context.commit("isLogin", true);
        return new Promise((resolve) => {
          resolve();
        });
      });
    },
    custRegister(context, payload) {
      return req.custRegister(payload);
    },
    custLogout(context) {
      sessionStorage.removeItem("token");
      let token = sessionStorage.getItem("token");
      context.commit("isLogin", !!token);
    },
  },
  getters: {
    isLogin: (state) => {
      return state.isLogin;
    },
  },
};

export default customer;

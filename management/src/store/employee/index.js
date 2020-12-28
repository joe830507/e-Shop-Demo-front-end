import req from "../../requests/employee";
const employee = {
  state: {
    isLogin: !!sessionStorage.getItem("token"),
    employees: [],
    empPages: {
      totalCount: 0,
      pageSize: 10,
      currentPage: 1,
      totalPages: 1,
    },
    empInfo: {
      account: null,
      role: null,
    },
  },
  mutations: {
    isLogin(state, value) {
      state.isLogin = true;
      let info = value.split(".")[1];
      info = atob(info);
      info = JSON.parse(info);
      state.empInfo.account = info.sub;
      state.empInfo.role = Number(info.Role);
      sessionStorage.setItem("empInfo", JSON.stringify(state.empInfo));
    },
    logout(state, value) {
      state.isLogin = value;
    },
    employees(state, value) {
      state.employees = value;
    },
    empPages(state, value) {
      state.empPages = value;
    },
  },
  actions: {
    employeeLogin({ commit }, payload) {
      commit("displayLoading", false);
      return req.employeeLogin(payload).then((res) => {
        const token = res.token;
        sessionStorage.setItem("token", token);
        commit("isLogin", token);
        commit("displayLoading", true);
        return new Promise((resolve) => {
          resolve();
        });
      });
    },
    addEmployee({ commit }, payload) {
      commit("displayLoading", false);
      return new Promise((resolve) => {
        req.addEmployee(payload).then(() => {
          commit("displayLoading", true);
          resolve();
        });
      });
    },
    updateEmployee({ commit }, payload) {
      commit("displayLoading", false);
      return new Promise((resolve) => {
        req.updateEmployee(payload).then(() => {
          commit("displayLoading", true);
          resolve();
        });
      });
    },
    getEmployees({ commit }, payload) {
      commit("displayLoading", false);
      req.getEmployees(payload).then((res) => {
        commit("employees", res.body);
        commit("empPages", res.pages);
        commit("displayLoading", true);
      });
    },
    employeeLogout(context) {
      sessionStorage.removeItem("token");
      let token = sessionStorage.getItem("token");
      context.commit("logout", !!token);
    },
    deleteEmployee({ commit }, payload) {
      commit("displayLoading", false);
      return new Promise((resolve) => {
        req.deleteEmployee(payload).then(() => {
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
    employees: (state) => {
      return state.employees;
    },
    empPages(state) {
      return state.empPages;
    },
    empInfo(state) {
      return state.empInfo;
    },
  },
};

export default employee;

import req from "../../requests/employee";
const employee = {
  state: {
    isLogin: !!sessionStorage.getItem("token"),
    employees: []
  },
  mutations: {
    isLogin(state, value) {
      state.isLogin = value;
    },
    employees(state, value) {
      state.employees = value;
    },
  },
  actions: {
    employeeLogin(context, payload) {
      return req.employeeLogin(payload).then((res) => {
        const token = res.token;
        sessionStorage.setItem("token", token);
        context.commit("isLogin", true);
        return new Promise((resolve) => {
          resolve();
        });
      });
    },
    addEmployee(context, payload) {
      return req.addEmployee(payload);
    },
    getEmployees(context, payload) {
      const res = req.getEmployees(payload)
      context.commit("employees", res);
    },
    employeeLogout(context) {
      sessionStorage.removeItem("token");
      let token = sessionStorage.getItem("token");
      context.commit("isLogin", !!token);
    },
  },
  getters: {
    isLogin: (state) => {
      return state.isLogin;
    },
    employees: (state) => {
      return state.employees;
    },
  },
};

export default employee;

import request from "../utilities/request";
const prefix = "/employee";
export default {
  employeeLogin: function(body) {
    return request.send(`${prefix}/login`, "POST", body);
  },
  addEmployee: function(body) {
    return request.send(`${prefix}`, "POST", body);
  },
  getEmployees: function(body) {
    return request.send(`${prefix}${body ?? ""}`, "GET");
  },
  updateEmployee: function(body) {
    return request.send(`${prefix}`, "PUT", body);
  },
  deleteEmployee: function(body) {
    return request.send(`${prefix}`, "DELETE", body);
  },
};

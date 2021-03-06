import request from "../utilities/request";
const prefix = "/customer";
export default {
  getCustomers: function(body) {
    return request.send(`${prefix}${body ?? ""}`, "GET");
  },
  addCustomer: function(body) {
    return request.send(`${prefix}`, "POST", body);
  },
  updateCustomer: function(body) {
    return request.send(`${prefix}`, "PUT", body);
  },
  deleteCustomer: function(body) {
    return request.send(`${prefix}`, "DELETE", body);
  },
};

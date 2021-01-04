import request from "../utilities/request";
const prefix = "/customer";
export default {
  customerLogin: function(body) {
    return request.send(`${prefix}/login`, "POST", body);
  },
  addCustomer: function(body) {
    return request.send(`${prefix}`, "POST", body);
  },
  updateCustomer: function(body) {
    return request.send(`${prefix}`, "PUT", body);
  },
  customerLogout: function() {
    return request.send(`${prefix}/logout`, "POST");
  },
};

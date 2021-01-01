import request from "../utilities/request";
const prefix = "/supplier";
export default {
  getSuppliers: function(body) {
    return request.send(`${prefix}${body ?? ""}`, "GET");
  },
  addSupplier: function(body) {
    return request.send(`${prefix}`, "POST", body);
  },
  updateSupplier: function(body) {
    return request.send(`${prefix}`, "PUT", body);
  },
  deleteSuppliers: function(body) {
    return request.send(`${prefix}`, "DELETE", body);
  },
};

import request from "../utilities/request";
const prefix = "/product";
export default {
  getProducts: function(query) {
    return request.send(`${prefix}${query ?? ""}`, "GET");
  },
  deleteProducts: function(body) {
    return request.send(`${prefix}`, "DELETE", body);
  },
  addProduct: function(body) {
    return request.send(`${prefix}`, "POST", body);
  },
  updateProduct: function(body) {
    return request.send(`${prefix}`, "PUT", body);
  },
};

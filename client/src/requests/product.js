import request from "../utilities/request";
const prefix = "/product";
export default {
  fetchProductTypes: function() {
    return request.send(`${prefix}/types`, "GET");
  },
};

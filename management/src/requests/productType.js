import request from "../utilities/request";
const prefix = "/productType";
export default {
  addProductType: function(body) {
    return request.send(`${prefix}`, "POST", body);
  },
};

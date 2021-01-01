import request from "../utilities/request";
const prefix = "/purchaseRecord";
export default {
  getPurchaseRecords: function() {
    return request.send(`${prefix}`, "GET");
  },
};

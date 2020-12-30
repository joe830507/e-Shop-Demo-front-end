import request from "../utilities/request";
const prefix = "/importRecord";
export default {
  addImportRecord: function(body) {
    return request.send(`${prefix}`, "POST", body);
  },
  getImportRecords: function(body) {
    return request.send(`${prefix}${body ?? ""}`, "GET");
  },
  updateImportRecord: function(body) {
    return request.send(`${prefix}`, "PUT", body);
  },
};

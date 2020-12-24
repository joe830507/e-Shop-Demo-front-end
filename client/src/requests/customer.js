import request from "../utilities/request";
const prefix = "/customer";
export default {
  custLogin: function(body) {
    return request.send(`${prefix}/login`, "POST", body);
  },
  custRegister: function(body) {
    return request.send(`${prefix}`, "POST", body);
  },
};

let myRequest = function() {};
myRequest.prototype.baseUrl = "https://localhost:5001/api";
myRequest.prototype.authorization = null;
myRequest.prototype.send = function(uri, method, body) {
  let requestBody = body == null ? null : JSON.stringify(body);
  let requestOptions = {
    method,
    body: requestBody,
    headers: {
      "content-type": "application/json",
      authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  let url = myRequest.prototype.baseUrl + uri;
  return fetch(url, requestOptions).then((res) => {
    if (res.status == 401) {
      const l = window.location;
      sessionStorage.removeItem("token");
      alert("抱歉，您未被授權使用該功能。");
      document.location.href = `${l.protocol}//${l.hostname}:${l.port}/home`;
    }
    if (res.status == 204) {
      alert("操作成功");
      return new Promise((resolve) => {
        resolve(res);
      });
    }
    return new Promise((resolve) => {
      res.json().then((res) => {
        resolve(res);
      });
    });
  });
};
const request = new myRequest();
export default request;

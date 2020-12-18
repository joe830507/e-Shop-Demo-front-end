let myRequest = function(){
}
myRequest.prototype.baseUrl = 'https://localhost:5001/api'
myRequest.prototype.authorization = null
myRequest.prototype.send = function(uri, method, body){
    let requestBody = body==null?null:JSON.stringify(body)
    let requestOptions = {
        method,
        body:requestBody,
        headers:{
            'content-type': 'application/json',
            'authorization': this.authorization
        }
    }
    let url = myRequest.prototype.baseUrl + uri
    return fetch(url, requestOptions)
}
const request = new myRequest() 
export default request
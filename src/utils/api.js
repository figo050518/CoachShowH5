import axios from 'axios'
var token = sessionStorage.getItem("token");
var obj = {
  baseURL: 'http://123.206.232.11:9090/coachFront/api/front/',
  auth: token
};
export  default{
  post: (url, param)=> {
    if (!token)
      delete obj.auth
    return new Promise((resolve, reject)=> {
      axios.post(url, param, obj).then((r)=> {
        if (r.data && r.data.businessCode == 100) {
          r.data.returnData = JSON.parse(r.data.returnData);
          return resolve({result: true, data: r.data.returnData})
        } else {
          return resolve({result: false, msg: r.data.returnMsg,code:businessCode})
        }
      })
    })
  }
}

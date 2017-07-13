import axios from 'axios'
axios.defaults.withCredentials = true;
var obj = {
  baseURL: 'http://123.206.232.11:6060/coachFront/api/front/',
};
export  default{
  post: (url, param)=> {
    return new Promise((resolve, reject)=> {
      obj.headers={'Content-Type':'application/json;charset=UTF-8'}
      axios.post(url, param, obj).then((r)=> {
        if (r.data && r.data.businessCode == 100) {
          r.data.returnData = JSON.parse(r.data.returnData);
          return resolve({result: true, data: r.data.returnData})
        } else {
          return resolve({result: false, msg: r.data.returnMsg, code: r.data.businessCode})
        }
      })
    })
  },
  upload: (url, param)=> {
    obj.headers={'Content-Type':'image/jpeg'}
    return new Promise((resolve, reject)=> {
      axios.post(url, param, obj).then((r)=> {
        if (r.data && r.data.businessCode == 100) {
          r.data.returnData = JSON.parse(r.data.returnData);
          return resolve({result: true, data: r.data.returnData})
        } else {
          return resolve({result: false, msg: r.data.returnMsg, code: r.data.businessCode})
        }
      })
    })
  }
}



let common = {
    // baseUrl: "",
    baseUrl: process.env.NODE_ENV === 'development' ? "http://localhost" : "",

    getCookie: (c_name) => {
        if (document.cookie.length > 0){
            let c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1){
                 c_start = c_start + c_name.length + 1;
                 c_end = document.cookie.indexOf(";", c_start);
                 if (c_end == -1){
                      c_end = document.cookie.length
                 }
                 return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return "";
    },
    setCookie: (c_name, value, expiredays) => {
       let exdate = new Date();
       exdate.setDate(exdate.getDate() + expiredays);
       document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : "; expires=" + exdate.toGMTString());
    },
    alert:(msg='错误提示',time=2000)=> {
      let dom = document.createElement('div');
      dom.className='alert';
      dom.id='alert';
      dom.innerHTML=msg;
      if(!document.querySelector('#id')){
          document.body.appendChild(dom);
          setTimeout(function(){
              document.body.removeChild(dom);
          },time) 
      }
    },
    isNotEmptyObj:(obj)=>{
       for(let key in obj){
           return true;
       }
       return true;
    }
}
export default common;
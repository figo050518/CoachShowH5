<template>
  <div class="page-field">
    <div class="header" @click="back">
      制作我的秀卡
    </div>
    <div class="banner">
      <img src="../assets/showBg.png">
    </div>
    <div class="form-wrap">
      <div>
          <label for="name">姓名</label>
          <input type="text" name="name" v-model="name">
      </div>
      <div class="phone">
          <label for="phone">电话</label>
          <input type="text" name="phone" v-model="phone">
          <span  v-show='!sendFlag'  class="msg-btn" @click="sendMsg">获取验证码</span>
          <span v-show='sendFlag' class="msg-btn-grey">剩余{{timeCount}}s</span>
      </div>
      <div>
          <label for="msgCode">验证码</label>
          <input type="text" name="msgCode" v-model="msgCode">
      </div>
      <div>
          <label for="school">驾校</label>
          <input type="text" name="school" v-model="school">
      </div>
      <div>
          <label for="court">训练场</label> 
          <input type="text" name="court" v-model="court">
      </div>
      <div class="submit" @click="submit">提交</div>
    </div>
  </div>
</template>

<script>
import common from '../utils/common.js'
import $http from '../utils/api.js'
export default {
  name: 'page-field',
  data(){
    return {
      name:"",
      phone:"",
      msgCode:"",
      school:"",
      court:"",
      phoneREG:/^1[3|4|5|8][0-9]\d{4,8}$/,
      sendFlag:false,
      timeCount:30,
      errMap:{
        name:'请填写姓名',
        phone:'请填写正确的手机号',
        msgCode:'请填写正确的校验码',
        school:'请填写驾校名称',
        court:'请填写训练场名称'
      }
    }
  },
  methods:{
    back(){
      // console.log(this.$route);
      this.$router.go(-1)
    },
    sendMsg(){ 
      if(this.phone && this.phoneREG.test(this.phone)){
        this.sendFlag = true;
        let count =  setInterval(()=>{
            if(this.timeCount==0){
              clearInterval(count);
              this.sendFlag=false;
              // this.timeCount = 30;
            }else{
              this.timeCount = this.timeCount - 1;
            } 
        },1000);
        let res = this.post('userInfo/sendMsg',{mobile:this.phone});
        if(res){
          common.alert('验证码发送成功，请查看短信确认',1000);
        };
      };
    },
    submit(){
      let err = this.checkForm();
      console.log(err);
      if(!err){
          let checkRes = this.post('userInfo/checkMobileCode',{mobile:this.phone,code:this.msgCode});
          if(checkRes){
            let submitRes = this.post('apply/save',{
              name:this.name,
              mobile:this.phone,
              school:this.school,
              trainingGround:this.court,
            });
            if(submitRes){
              console.log(true);
              this.$emit('submited');
            }
          }else{
            common.alert('网络异常',1000);
          };
      }else{
        common.alert(err,1000)
      };    
    },
    checkForm(){
      for(var key in this.errMap){
        if(key =='phone'){
          if(!this[key]||!this.phoneREG.test(this[key])){
            return this.errMap[key]
          }
        }else{
          if(!this[key]){
             return this.errMap[key]
          };
        }
      }
    },
    async post(url,params){
      let res = await $http.post(url,params);
      if(res){
         return res.result;
      }else{
         return false;
      }
    },
  }
};
</script>

<style scoped>

.page-field{
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background:#f7f8fd;
}
.banner {
  width: 100%;
  max-height: 200px;
  overflow: hidden;
}
.banner img{
  width: 100%
}
.header{
  line-height: 40px;
  background: #799ff8;
  font-size: 16px;
  color:#fff;
  text-align: center;
  position:relative;
}
.header::before{
   content:'';
   display: inline-block;
   width: 10px;
   height: 10px;
   border:1px solid #fff;
   transform: rotate(-45deg);
   border-right:none;
   border-bottom:none;
   position:absolute;
   left:10px;
   top:50%;
   margin-top: -5px;
}
.form-wrap{
  padding:10px 20px;
}
.form-wrap div{
  line-height: 40px;
  font-size: 14px;
  color:#333;
  background:#fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px #eee;
  margin-top: 10px;
  padding:0 20px;
}
.form-wrap .submit{
  text-align: center;
  background:linear-gradient(#70c4f9,#5692fd);
  color:#fff;
  margin-top:20px;
}
.form-wrap div input{
  border:none;
  outline: none;
  display: inline-block;
  width:78%;
  height:20px;
}
.form-wrap div label{
  width:20%;
  display: inline-block;
}
.form-wrap div.phone{
  position: relative;
}
.form-wrap div.phone input{
  width: 55%;
}
.form-wrap div.phone .msg-btn{
  position:absolute;
  right:5px;
  top:50%;
  margin-top: -15px;
  background:linear-gradient(#70c4f9,#5692fd);
  line-height: 30px;
  color: #fff;
  border-radius:2px;
  width:24%;
  text-align: center;
  font-size:12px;
}
.form-wrap div.phone .msg-btn-grey{
  background:linear-gradient(#eee,#ddd);
  position:absolute;
  right:5px;
  top:50%;
  margin-top: -15px;
  line-height: 30px;
  color: #fff;
  border-radius:2px;
  width:24%;
  text-align: center;
  font-size:12px;
}
</style>

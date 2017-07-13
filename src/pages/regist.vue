<template>
  <div>
    <div style="margin-top: 1.8rem;margin-bottom: 0.7rem;">
      <img src="../assets/logo@2x.png" style="margin: 0 auto; width: 5rem;"/>
      <div style="text-align: center;font-size: 0.8rem;color:#999;margin-top: 1rem">教练帮</div>
    </div>
    <div style=" margin-left: 1.1rem;
    margin-right: 1.1rem;">
      <input type="text" v-model="phone"
             style="margin:0 auto;display: inline-block;border:0;border-bottom:1px solid #c7c7cd;outline:none;width:11.2rem;padding:0.6rem 0.8rem;font-size: 0.7rem
              ;color:rgb(128, 128, 128);"
             placeholder="手机号"
      />
      <div style="margin: 0.4rem 0">
        <input type="text"  v-model="msgCode"
               style="margin:0 auto;display: inline-block;border:0;border-bottom:1px solid #c7c7cd;outline:none;width:6.6rem;padding:0.6rem 0.8rem;font-size: 0.7rem
              ;color:rgb(128, 128, 128);"
               placeholder="验证码"
        />
        <div @click="sendMsg" v-show='!sendFlag' style="display: inline-block;
        ;width: 4.4rem;background: #f3f3f3;padding:0.6rem 0;text-align: center;font-size: 0.7rem;color:#808080">获取校验码</div>
        <div v-show='sendFlag' style="display: inline-block;
        ;width: 4.4rem;background: #f3f3f3;padding:0.6rem 0;text-align: center;font-size: 0.7rem;color:#808080">剩余{{timeCount}}</div>
      </div>
      <img v-show="!checkRead" src="../assets/check-box-empty.png" @click="goCheck" style="    width: 0.7rem;
    float: left;
    margin-top: 0.1rem;">
      <img src="../assets/check-box-checked.png" v-show="checkRead" @click="goCheck" style="    width: 0.7rem;
    float: left;
    margin-top: 0.1rem;">
      <span style="color: #c7c7dc;font-size: 0.6rem;float: left">我已阅读,并同意《用户注册协议》</span>

      <div style="margin-top: 2.5rem;font-size: 0.7rem;color: #ffffff;background: #5692fd;text-align: center;    border-radius: 0.3rem;
    padding: 0.3rem;" @click="submit">保存</div>
    </div>


  </div>

</template>
<script>
  import common from '../utils/common.js'
  import http from '../utils/api.js'
  export default {
    name: 'regist',
    data(){
      return {
        phone : "",
        msgCode :"",
        sendFlag:false,
        timeCount:30,
        checkRead:true,
        phoneREG:/^1[3|4|5|8][0-9]\d{4,8}$/
      }
    },
    mounted(){
      this.setTitle();
    },
    methods:{
      setTitle(){document.title ='登录'},
      async  sendMsg(){
        if(this.phone && this.phoneREG.test(this.phone)){
          this.sendFlag = true;
          let count =  setInterval(()=>{
              if(this.timeCount==0){
                clearInterval(count);
                this.sendFlag=false;
                this.timeCount = 30;
              }else{
                this.timeCount = this.timeCount - 1;
              }
          },1000);
          var r = await http.post('userInfo/sendMsg',{mobile:this.phone});

            if(r.result){
              common.alert('验证码发送成功，请查看短信确认',1000);
            };

        }else{
          common.alert("手机号码格式错误",1000)
        };
      },
      goCheck(){
        this.checkRead = !this.checkRead;
      },
      async submit(){
        if(!this.checkRead){
          common.alert('请阅读并勾选注册需知',1000)
          return;
        }
        if(!(this.phone && this.phoneREG.test(this.phone))){
          common.alert('请填写正确的手机号',1000);
          return;
        }
        if(!this.msgCode){
          common.alert('请填写验证码',1000);
          return;
        }
        var r =  await http.post('userInfo/login',{mobile:this.phone,code:this.msgCode});
        if(r.result){
          localStorage.setItem('id',JSON.stringify(r.data.id));
          this.$router.push({
            path:'/profile'
          })
        }else{
          common.alert("服务异常请稍后再试",1000);
        }
      }
    }
  }
</script>
<style scoped>
  input::-webkit-input-placeholder {
    color: #adadb3;
    opacity: 1;
  }
</style>

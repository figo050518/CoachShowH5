<template>
    <!--<div class="form-wrap">-->
      <!--<div class="phone">-->
        <!--<input type="text" name="phone" v-model="phone" placeholder="新手机号">-->
      <!--</div>-->
      <!--<span  class="msg-btn" v-show='!sendFlag'  @click="sendMsg">获取验证码</span>-->
      <!--<span v-show='sendFlag' class="msg-btn-grey">剩余{{timeCount}}s</span>-->
      <!--<div style="    margin-top: 0.5rem;">-->
        <!--<input type="text" name="msgCode" v-model="msgCode" placeholder="验证码">-->
      <!--</div>-->
      <!--<div class="submit" style="font-size: 0.6rem" @click="submit">提交</div>-->
    <!--</div>-->
    <div style="margin-left: 1.1rem;margin-top: 2rem;
    margin-right: 1.1rem;">
      <input type="text" v-model="phone"
             style="margin:0 auto;display: inline-block;border:0;border-bottom:1px solid #c7c7cd;outline:none;width:11.2rem;padding:0.6rem 0.8rem;font-size: 0.7rem
                ;color:rgb(128, 128, 128);"
             placeholder="新手机号"/>
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
      <div style="margin-top: 1.7rem;font-size: 0.7rem;color: #ffffff;background: #38b1e0;text-align: center;    border-radius: 0.2rem;
    padding: 0.3rem;" @click="submit">更换手机号</div>
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
          phone:'请填写正确的手机号',
          msgCode:'请填写正确的校验码',
        }
      }
    },
    methods:{
      back(){
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
          this.post('userInfo/sendMsg',{mobile:this.phone},(res)=>{
            if(res.result){
            common.alert('验证码发送成功，请查看短信确认',1000);
          };
        });

        }else{
          common.alert("请输入手机号",1000)
        }
      },
      submit(){
        let err = this.checkForm();
        console.log(err);
        if(!err){
          this.post('uc/changeMobile',{mobile:this.phone,code:this.msgCode},checkRes=>{
            if(checkRes.result){
            this.$router.push({
              path:'/profile'
            })
          }else{
              common.alert('请输入正确的验证码',1000)
            }
        })
//          this.post('userInfo/checkMobileCode',{mobile:this.phone,code:this.msgCode},(checkRes)=>{
//            if(checkRes.result){
//            this.post('apply/save',{
//              name:this.name,
//              mobile:this.phone,
//              school:this.school,
//              trainingGround:this.court,
//            },(submitRes)=>{
//              if(submitRes.result){
//              console.log(true);
//              this.$emit('submited');
//            }
//          });
//          }else{
//            common.alert('网络异常',1000);
//          };
//        });

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
      async post(url,params,cb){
    let res = await $http.post(url,params);
    cb(res);
  },
  }
  };
</script>

<style scoped>


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
    height: 1rem;
    font-size: 0.7rem;
    margin-top: 0.2rem;

  }
  .form-wrap div label{
    width:20%;
    display: inline-block;
  }
  .form-wrap div.phone{
    position: relative;
    width: 8.2rem;
  }
  .form-wrap div.phone input{
    width: 8rem;
  }
  .form-wrap .msg-btn{
    position: absolute;
    right: 0.7rem;
    top: 1.27rem;
    margin-top: -15px;
    background: linear-gradient(#70c4f9,#5692fd);
    line-height: 1.5rem;
    color: #fff;
    border-radius: 2px;
    width: 24%;
    text-align: center;
    font-size: 0.5rem;
  }
  .form-wrap  .msg-btn-grey{
    background:linear-gradient(#eee,#ddd);
    position:absolute;
    right: 0.7rem;
    top: 1.27rem;
    margin-top: -15px;
    line-height: 1.5rem;
    color: #fff;
    border-radius:2px;
    width:24%;
    text-align: center;
    font-size: 0.5rem;
  }
  input::-webkit-input-placeholder {
    color: #adadb3;
    opacity: 1;
  }
</style>

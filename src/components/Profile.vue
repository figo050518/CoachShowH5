<template>
    <div id="views">
      <div class="wrap">
        <showImage :show="show" :img="img" v-on:changeShow="changShow"></showImage>
        <!--用户信息-->
        <div class="hd">
          <div class="avaterbox">
              <div class="r">
                <img :src="userInfo.logoUrl"  class="avater">
              </div>
          </div>
          <div class="namecard">
            <h2 class="tt">{{userInfo.nickname}}</h2>
            <!-- <span class="regist">注册</span><span class="login">登录</span> -->
          </div>
          <div class="editInfo">
            <span v-show="loginFlag && textFlag" to="/editUser">请完善您的信息</span>
            <router-link v-show="loginFlag && !textFlag" to="/editUser"><span>编辑</span></router-link>
            <router-link v-show="!loginFlag" to="/regist"><span>登录</span></router-link>
          </div>
        </div>

        <!--用户信息-->
        <ul class="modlist hasarrow">
          <router-link v-show="!loginFlag" to="/regist">
            <li><i class="icon vip"></i>我的会员</li>
          </router-link>
          <li @click="goVip" v-show="loginFlag"><i class="icon vip"></i>我的会员</li>
          <router-link v-show="!loginFlag" to="/regist"><li style="border-bottom: 0"><i class="icon post" ></i>我的秀卡</li></router-link>
          <li v-show="loginFlag" @click="showMyCard" style="border-bottom: 0" ><i class="icon post" ></i>我的秀卡</li>
        </ul>

        <!-- 招生信息 -->
        <ul class="modlist hasarrow">
          <router-link v-show="!loginFlag" to="/regist"><li><i class="icon class"></i>我的班型</li></router-link>
          <router-link v-show="loginFlag" to="/myClass"><li><i class="icon class"></i>我的班型</li></router-link>
          <router-link v-show="!loginFlag" to="/regist"><li><i class="icon photo"></i>我的相册</li></router-link>
          <router-link v-show="loginFlag" to="/photo"><li><i class="icon photo"></i>我的相册</li></router-link>
        </ul>

        <!--辅助信息-->
        <ul class="modlist hasarrow">
          <router-link to="/about"><li><i class="icon about"></i>关于我们</li></router-link>
          <!--<router-link to=""><li><i class="icon advice"></i>意见反馈</li></router-link>-->
        </ul>

        <!--退出按钮-->
        <!-- <input type="button" id="M_logout" class="logout" value="退出登录"> -->
      </div>
    </div>
</template>

<script>
import $http from '../utils/api.js'
import common from '../utils/common.js'
import showImage from '../components/showImage.vue'
export default {
  name: 'Profile',
  data () {
    return {
      userInfo: {},
      loginFlag:false,
      textFlag:false,
      show:false,
      img:''
    }
  },
  components: {
    showImage
  },
  mounted() {
    this.post("userInfo/goUc",{},res=>{
        if(res.result){
          this.loginFlag = true;
        }
    });
    this.setTitle();
    this.post('uc/getUserInfo',{},res=>{
      console.log(res);
      if(res.result){
        this.$set(this.userInfo,'logoUrl',res.data.logoUrl||this.$store.getters.getUserInfo.headimgurl);
        this.$set(this.userInfo,'nickname',res.data.name);
        this.$set(this.userInfo,'isMember',res.data.isMember);
        this.$set(this.userInfo,'imageUrl',res.data.imageUrl);
      };
      if(this.userInfo.logoUrl == this.$store.getters.getUserInfo.headimgurl){
        this.textFlag=true
      }
    })
  },
  methods:{
    showMyCard(){
      if(this.userInfo.imageUrl){
        this.img= this.userInfo.imageUrl
        this.show = true
      }else{
        common.alert('您暂无秀卡',1000);
      }

    },
    changShow(){
      this.show =!this.show
    },
    setTitle(){
      document.title = "教练秀场";
    },
    back(){
      this.$router.go(-1);
    },
//    async verifyUser(){
//      if(!localStorage.getItem('id')){
//        //this.$router.push({ path: '/regist' })
//        this.loginFlag = true;
//      }
//    },
    async post(url,params,cb){
      let res = await $http.post(url,params);
      cb(res);
    },
    goVip(){
      this.$router.push({
        name: 'ShowMember',
         params:{
           isMember:this.userInfo.isMember,
           imgUrl:this.userInfo.logoUrl
         }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap{
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background:#f7f8fd;
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
.wrap {
  color: #424242;
}

.hd {
  box-sizing: border-box;
  padding:0 10px;
  line-height: 60px;
  height: 60px;
  background-color: #fff;
  position: relative;
  margin-top: 18px;
  box-shadow: 0 2px 5px #eee;
}

.avaterbox {
  position: absolute;
  /*padding: 0 15px*/
  top:-10px;
}

.avaterbox .r {
  margin: 2px auto 0 auto;
  background-color: #f9f9f9;
  /*-webkit-border-radius: 50px;*/
  /*border-radius: 50px; */
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  overflow: hidden;
  width: 60px;
  height: 60px;
}

.avaterbox .avater {
  width: 100%;
  height: 100%;
}

.namecard {
 margin-left: 70px;
 display: inline-block;
}

.namecard .tt {
  font-size: 16px;
  color: #333;
}

.namecard .regist {font-size: 14px; color: #333; margin-bottom: 15px; margin-right: 15px; }
.namecard .login {font-size: 14px; color: #333; margin-bottom: 15px }

.editInfo {
  display: inline-block;
  float: right;
  margin-right: 10px;

}

.editInfo span {
  color: #666;
  padding-left: 30px;
}

.modlist {
  margin-top: 10px;
  /*border-top: 1px solid #d1d1d1;*/
  /*border-bottom: 1px solid #d1d1d1;*/
  background-color: #fff
}

.modlist li {
  margin-left: 14px;
  line-height: 1.5;
  padding: 12px 12px 12px 0;
  border-bottom: 1px solid #ddd;
}

.modlist li .icon {
  display:inline-block;
  height: 20px;
  width: 20px;
  margin-right: 5px;
  vertical-align: middle;
}


.modlist a:last-child li{
  border: none
}

.modlist li .info {
  float: right;
  margin-right: 7%;
  color: #999
}

.hasarrow li {
  background: url(http://s8.mogucdn.com/pic/140730/176rwo_ieygimrsmy4tezbvmiytambqgqyde_16x29.png) no-repeat 95% center;
  background-size: 8px
}

.modlist .operate {
  border-top: 1px solid #e5e5e5!important;
  background: 0 0;
  margin: -1px 0 0 0;
  background-color: #fff;
  padding: 0
}

.modlist .operate .ic {
  position: relative;
  float: left;
  display: block;
  width: 25%;
  text-align: center;
  color: #727272;
  font-size: 12px;
  padding: 9px 0 7px 0
}

.modlist .operate .icon {
  height: 20px
}

.modlist .operate .caution {
  position: absolute;
  right: 6px;
  top: 4px;
  max-width: 24px;
  color: #fff;
  background-color: #f5342f;
  -webkit-border-radius: 14px;
  border-radius: 14px;
  line-height: 1;
  padding: 3px 5px 2px 5px;
  text-overflow: ellipsis;
  overflow: hidden
}

.logout {
  display: block;
  width: 90.6%;
  height: 40px;
  line-height: 40px;
  margin: 0 auto 20px auto;
  color: #fff;
  background-color: #0099FF;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  border: none;
  font-size: 14px;
  outline: 0;
  -webkit-appearance: button;
  *overflow: visible
}
.vip{
  background: url(../assets/VIP.png) no-repeat center;
  background-size: 70%;
}
.post{
  background: url(../assets/post.png) no-repeat center;
  background-size: 90%;
}
.class{
  background: url(../assets/class.png) no-repeat center;
  background-size: 80%;
}
.photo{
  background: url(../assets/photo.png) no-repeat center;
  background-size: 80%;
}
.about{
  background: url(../assets/about.png) no-repeat center;
  background-size: 80%;
}
.advice{
  background: url(../assets/advice.png) no-repeat center;
  background-size: 80%;
}
</style>

<template>
  <div class="wrap">
    <div class="header" @click="back">
      教练主页
    </div>

    <div class="loading" v-if="loading" style="margin: auto; width:50%; text-align:center;">
      <mt-spinner type="snake" style="display:inline-block;"></mt-spinner> 加载中.....
    </div>

    <!-- 基本信息 -->
    <div class="coachBaseInfo" v-if="!loading">
      <div class="coachPoster"><img style="width: 6rem" :src="coachData.logoUrl"></div>
      <div class="coachInfo">
        <div class="coachName">{{coachData.name}} <img class="cron-img"style="margin-left: 0.2rem;" src="../assets/gold.png"/><span class="coachIsMember">认证会员</span></div>
        <div class="coachYear" style="font-size:0.48rem">{{coachData.workYear}}年教龄 <div v-for="s in star" style="display: inline-block;">
          <div v-show='s == 1' class="star"></div>
          <div v-show='s == 2' class="starHalf"></div>
          <div v-show='s == 3' class="starDisable"></div>
        </div></div>
        <div class="coachDriverSchool" style="font-size:0.48rem"><img src="../assets/school.png" class="cron-img" />{{coachData.schoolName}}</div>
        <div class="coachAddress" style="font-size:0.48rem"><img src="../assets/Location.png" class="cron-img" name="map"/>{{coachData.area}}</div>
      </div>
    </div>
    <!-- 学员印象 -->
    <div class="coachTags" v-if="!loading">
      <div class="coachTagTitle">学员印象</div>
      <div class="coachTagList"><span v-for="(tag, index) in coachData.tagList" class="coachTag"> {{tag.tagName}}</span></div>
    </div>
    <!-- 教练简介 -->
    <div class="coachDescription" v-if="!loading">
      <div class="coachDesTitle">教练简介</div>
      <div class="coachDesContent">{{coachData.description}}</div>
    </div>

    <div class="coachDescription" v-if="!loading">
      <div class="coachDesTitle">热门活动</div>
      <div class="commonContent">
          <div style="border-bottom: 1px solid #e0e2eb;">
            <div style="margin:  0.4rem 6rem 0.4rem 0.4rem ;display: inline-block">
              <span style="font-size: 0.5rem;
                color: #212121;margin-right: 0.4rem
               ">快速版龙泉驾校</span>
              <span style="font-size:0.48rem;color:#0cadff;">5500元</span>
              <div style="font-size:0.48rem;color:#797979;margin-top: 0.4rem ">c1,两人一车教练接送</div>
            </div>
            <div class="but"><a href="tel:188888888" style="color: #fff;">咨询</a></div>
          </div>
        <div style="border-bottom: 1px solid #e0e2eb;">
          <div style="margin:  0.4rem 6rem 0.4rem 0.4rem ;display: inline-block">
              <span style="font-size: 0.5rem;
                color: #212121;margin-right: 0.4rem
               ">快速版龙泉驾校</span>
            <span style="font-size:0.48rem;color:#0cadff;">5500元</span>
            <div style="font-size:0.48rem;color:#797979;margin-top: 0.4rem ">c1,两人一车教练接送</div>
          </div>
          <div class="but"><a href="tel:188888888" style="color: #fff;">咨询</a></div>
        </div>
      </div>
    </div>
    <div class="coachDescription" v-if="!loading">
      <div class="coachDesTitle">教学环境
        <a>
        <img src="../assets/right.png" style="width:0.3rem ;float: right;margin-top: 0.17rem;">
        <span style="font-size: 0.48rem;float: right;color: #666;margin-right: 0.1rem;">19张照片</span>
      </a>
      </div>
      <div class="coachDesContent">
        <div class="env">
        </div>
        <div class="env" ></div>
        <div class="env" >
        </div>
      </div>
    </div>
    <div style=" ;text-align: center;margin-bottom: 2rem;color: #b3b3b3">没有更多类容了</div>
    <router-link to="/new">
    <div class="addNewGroup" v-if="!loading">
   我是教练, 我也要申请个人主页
    </div>
    </router-link>
  </div>
</template>

<script>
  import http from '../utils/api.js'

  export default {
  name: 'Detail',

  data () {
    return {
      star:[],
      loading: true,
      coachData: {},
      mockData: {
      }
    }
  },

  created() {
    this.fetchData();
   // this.getAction();
   // this.getEnv();
  },

  methods: {
    back(){
      this.$router.go(-1)
    },

    isInteger(obj){
      return obj%1 === 0
    },
    async getAction(){
      var r = await http.post("userInfo/myClass",{userId:this.$route.params.id});
      console.log("aaaaa")
      console.log(r);
    },
    async getEnv(){
      var r = await http.post("userInfo/myPhoto",{userId:this.$route.params.id});
    console.log("eeeee")
      console.log(r);
    },
    async fetchData() {
      var r = await http.post("userInfo/coachIndex" ,{id:this.$route.params.id});
      console.log(r)
    if(r.data.score<0){
      this.star = [2,2,2,2,2]
    }else if(r.data.score>5){
      this.star = [1,1,1,1,1]
    }else{
      var score = parseInt(r.data.score);
      for(var i=0;i<score;i++){
        this.star.push(1);
      }
      if(!this.isInteger(r.data.score-score)){
        this.star.push(3);
      }
      var disable = 5-Math.ceil(r.data.score);
      if(disable){
        for(var i=0;i<disable;i++){
          this.star.push(2);
        }
      }
      console.log(this.star)
    }
      setTimeout(() => {
        if(r.result)
        this.coachData = r.data;
        this.loading = false;
      }, 1000);
    }


  }


};
</script>

<style scoped>
  .hidden{
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .env{
    width: 4.3rem;
    height: 5rem;
    border: 1px solid #3d3d3d;
    display: inline-block;
    margin: 0 0.13rem;
  }
.wrap {
  background-color: #F5F5F5;
}
.but{
  padding-top: 0.1rem;
  color: #fff;
  border-radius: 15px;
  vertical-align: super;
  margin-left: auto;
  margin-right: 0px;
  width: 2rem;
  height: 0.92rem;
  background: rgb(12, 173, 255);
  display: inline-block;
  text-align: center;
}
.cron-img{
  width: 0.5rem; display: inline-block;
  vertical-align: sub;
  margin-right: 0.3rem;
}
.star{background-image: url('../assets/star/starAction.png');background-size: 100% 100%;
  height: 0.5rem;
  width: 0.5rem;
  vertical-align: sub;
}
.starHalf{
  background-image: url('../assets/star/starHalf.png');background-size: 100% 100%;
  height: 0.5rem;
  width: 0.5rem;
  vertical-align: sub;
}
.starDisable{
  background-image: url('../assets/star/starDisable.png');background-size: 100% 100%;
  height: 0.5rem;
  width: 0.5rem;
  vertical-align: sub;
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
.coachBaseInfo {
  background: url("../assets/bgDetail.png");
  background-size: 100% 100%;
  padding: 1rem 0.8rem;
  border-bottom: 2px solid #F2F2F2;
  height:6rem
}
.coachBaseInfo:after {
  clear:both;
  content:'.';
  display:block;
  width: 0;
  height: 0;
  visibility:hidden;
}
.coachBaseInfo .coachPoster {
  float: left;
  width: 6rem;
  max-height: 6rem;
  overflow: hidden;
  margin-right: 1.08rem;
}
.coachBaseInfo .coachInfo {
  float: left;
}
.coachBaseInfo .coachInfo div {
  font-size: 14px;
  line-height: 20px;
}
.coachBaseInfo .coachInfo .icon {
  height: 20px;
  width: 20px;
  vertical-align: sub;
  padding-right: 5px;
}
.coachBaseInfo .coachInfo .coachName {
  color:#fff;
  margin: 10px auto 10px;
  font-size: 0.72rem;
  font-weight: 700;
}
.coachBaseInfo .coachInfo .coachName .coachIsMember{

  font-size: 0.48rem;
  font-weight: 600;
  color: #ffd200;
}
.coachBaseInfo .coachInfo .coachYear{
  color: #fff;
}
.coachBaseInfo .coachInfo .coachDriverSchool {
  color:#fff;
  margin-top: 18px;
}
.coachBaseInfo .coachInfo .coachAddress {
  color:#fff;
  margin-top: 5px;
}
.coachTags {
  background-color: #fff;
  padding: 5px;
}
.coachTags:after {
  clear:both;
  content:'.';
  display:block;
  width: 0;
  height: 0;
  visibility:hidden;
}
.coachTags .coachTagTitle{
  width: 1.7rem;
  height: 2rem;
  float: left;
  font-size: 0.6rem;
  padding: 10px;
  margin: 10px;
  border-right: 0.08rem solid #DCDCDC;
  color: #5a5e6c;
  font-family: "TREMDS";
}
.coachTags .coachTagList {
  height: 100%;
  overflow: hidden;
}
.coachTags .coachTagList .coachTag {
  display: inline-block;
  line-height: 20px;
  border: 1px solid #eaeaea;
  background: #f1f2f7;
  padding: 0.2rem 0.56rem;
  margin: 0.24rem 0.24rem;
  font-size: 0.48rem;
}

.coachDescription {
  background-color: #fff;
  margin-top: 0.4rem;
}
.coachDescription .coachDesTitle {
  border-bottom: 0.04rem solid #F2F2F2;
  font-size: 0.68rem;
  color: #212121;
  height: 0.8rem;
  line-height: 0.8rem;
  padding: 0.4rem;


}
.coachDescription .coachDesContent {
  padding: 10px;
  font-size: 12px;
  line-height: 20px;
  color: #666;
}
.commonContent{
  font-size: 12px;
  line-height: 20px;
  color: #666;
}
.addNewGroup{
  position: fixed;
  bottom:0;
  padding-top: 0.5rem;
  border-top: 1px solid rgb(224, 226, 235);
  font-size: 0.6rem;
  width: 100%;
  background: rgb(255, 255, 255);
  color: rgb(103, 178, 251);
  margin: 0px auto;
  text-align: center;
  height: 1.5rem
}

</style>

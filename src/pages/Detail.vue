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
        <div class="coachName">{{coachData.name}} <span><img style="width: 0.5rem;display: inline-block;" src="../assets/gold.png"/></span><span class="coachIsMember">认证会员</span></div>
        <div class="coachYear" style="font-size:0.48rem">{{coachData.workYear}}年教龄</div>
        <div class="coachDriverSchool" style="font-size:0.48rem"><icon class="icon" slot="icon" name="shop" scale="20"></icon>{{coachData.schoolName}}</div>
        <div class="coachAddress" style="font-size:0.48rem"><icon class="icon" slot="icon" name="map" scale="20"></icon>{{coachData.area}}</div>
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
      <div class="coachDesContent">{{coachData.description}}</div>
    </div>
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
      loading: true,
      coachData: {},
      mockData: {
      }
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    back(){
      this.$router.go(-1)
    },
    async fetchData() {
      var r = await http.post("userInfo/coachIndex" ,{id:this.$route.params.id});
      console.log(r);
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
.wrap {
  background-color: #F5F5F5;
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
  background-color: #fff;
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
  margin: 10px auto 10px;
  font-size: 0.72rem;
  font-weight: 700;
}
.coachBaseInfo .coachInfo .coachName .coachIsMember{
  margin: 10px auto 10px;
  padding-left: 5px;
  font-size: 0.48rem;
  font-weight: 600;
  color: #ffd200;
}
.coachBaseInfo .coachInfo .coachYear{

}
.coachBaseInfo .coachInfo .coachDriverSchool {
  margin-top: 18px;
}
.coachBaseInfo .coachInfo .coachAddress {
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
  height: 55px;
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
  height: 0.8rem;
  line-height: 0.8rem;
  padding: 0.4rem;
  color: #212121;

}
.coachDescription .coachDesContent {
  padding: 10px;
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

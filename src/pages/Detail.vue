<template>
  <div class="wrap">
    <!--<div class="header" @click="back">-->
    <!--教练主页-->
    <!--</div>-->
    <showImage :show="show" :img="img" v-on:changeShow="changShow"></showImage>
    <div class="loading" v-if="loading" style="width:15rem;text-align:center;position: relative">
      <img src="../assets/WechatIMG76.jpg" style="width:15rem;">
     <div style="font-size: 0.7rem;
    position: absolute;
    color: #999;
    top: 16rem;
    text-align: center;
    width: 100%;">加载中.....</div>
    </div>

    <!-- 基本信息 -->
    <div class="coachBaseInfo" v-if="!loading">
      <div class="coachPoster"><img style="width: 6rem" :src="coachData.logoUrl"></div>
      <div class="coachInfo">
        <div class="coachName">{{coachData.name}} <img class="cron-img" style="margin-left: 0.2rem;"
                                                       src="../assets/gold.png"/><span v-if="coachData.memberName" class="coachIsMember">{{coachData.memberName}}</span>
          <span v-if="!coachData.memberName" class="coachIsMember">会员认证</span>
        </div>
        <div class="coachYear" style="font-size:0.48rem">{{coachData.workYear}}年教龄
          <div v-for="s in star" style="display: inline-block;">
            <div v-show='s == 1' class="star"></div>
            <div v-show='s == 2' class="starHalf"></div>
            <div v-show='s == 3' class="starDisable"></div>
          </div>
        </div>
        <div class="coachDriverSchool" style="font-size:0.48rem"><img src="../assets/school.png" class="cron-img"/>{{coachData.schoolName}}
        </div>
        <div class="coachAddress" style="font-size:0.48rem"><img src="../assets/Location.png" class="cron-img"
                                                                 name="map"/>{{coachData.area}}
        </div>
        <div  @click="cshowEnv(coachData.imageUrl)" class="coachAddress" style="font-size:0.48rem"><img src="../assets/shan.png" style="width: 0.7rem" class="cron-img">查看教练海报</div>
      </div>
    </div>
    <!-- 学员印象 -->
    <div class="coachTags" v-if="!loading">
      <div class="coachTagTitle">学员印象</div>
      <div class="coachTagList"><span v-for="(tag, index) in coachData.tagList" class="coachTag"> {{tag.tagName}}</span>
      </div>
    </div>
    <!-- 教练简介 -->
    <div class="coachDescription" v-if="!loading">
      <div class="coachDesTitle">
        <div style="display: inline-block">教练简介</div>
        <div style="display: inline-block;
    color: rgb(12, 173, 255);
    font-size: 0.4rem;
    float: right;" @click="chide" v-show="texthide" v-if="desMore">更多>>
        </div>
        <div style="display: inline-block;
    color: rgb(12, 173, 255);
    font-size: 0.4rem;
    float: right;" @click="chide" v-show="!texthide">收起>>
        </div>
      </div>
      <div class="coachDesContent" v-bind:class="{textHide:texthide}">{{coachData.description}}</div>
      <div style="background:#ffffff;height: 0.2rem"></div>
    </div>
    <div v-show="coachData.classList.length" class="coachDescription" v-if="!loading">
      <div class="coachDesTitle">推荐班型</div>
      <div v-for="c in coachData.classList" class="commonContent">
        <div style="border-bottom: 1px solid #e0e2eb;position: relative">
          <div style="margin:  0.4rem 6rem 0.4rem 0.4rem ;display: inline-block">
              <span style="font-size: 0.5rem;
                color: #212121;margin-right: 0.4rem
               ">{{c.name}}</span>
            <span style="font-size:0.48rem;color:#0cadff;">{{c.price}}</span>
            <div style="font-size:0.48rem;color:#797979;margin-top: 0.4rem ">{{c.license}},{{c.cardLoadPerson}}人一车,{{c.traffic}}</div>
          </div>
          <div class="but"><a href="tel:13122046973" style="color: #fff;">咨询</a></div>
        </div>
      </div>
    </div>
    <div v-show="!coachData.classList.length" class="coachDescription" v-if="!loading">
      <div class="coachDesTitle">推荐班型</div>
      <div class="commonContent">
        <div style="border-bottom: 1px solid #e0e2eb;">
          <div style="margin:  0.4rem 6rem 0.4rem 0.4rem ;display: inline-block">
              <span style="font-size: 0.5rem;
                color: #212121;margin-right: 0.4rem
               ">普通班</span>
            <span style="font-size:0.48rem;color:#0cadff;">5500元</span>
            <div style="font-size:0.48rem;color:#797979;margin-top: 0.4rem ">C1,两人一车,教练接送</div>
          </div>
          <div class="but"><a href="tel:13122046973" style="color: #fff;">咨询</a></div>
        </div>
        <div style="border-bottom: 1px solid #e0e2eb;">
          <div style="margin:  0.4rem 6rem 0.4rem 0.4rem ;display: inline-block">
              <span style="font-size: 0.5rem;
                color: #212121;margin-right: 0.4rem
               ">VIP班</span>
            <span style="font-size:0.48rem;color:#0cadff;">6800元</span>
            <div style="font-size:0.48rem;color:#797979;margin-top: 0.4rem ">C1,一人一车,教练接送</div>
          </div>
          <div class="but"><a href="tel:13122046973" style="color: #fff;">咨询</a></div>
        </div>
      </div>
    </div>
    <div v-show="coachData.envList.length" class="coachDescription" v-if="!loading">
      <div class="coachDesTitle">教学环境
        <div style="display: inline-block;
    color: rgb(12, 173, 255);
    font-size: 0.4rem;
    float: right;" @click="ehide" v-show="evnhide" v-if="envMore">更多>>
        </div>
        <div style="display: inline-block;
    color: rgb(12, 173, 255);
    font-size: 0.4rem;
    float: right;" @click="ehide" v-show="!evnhide">收起>>
        </div>
      </div>
      <div class="coachDesContent" v-bind:class="{envmore:evnhide}">
        <div class="env" v-for="e in coachData.envList" @click="cshowEnv(e.imageUrl)"
             style="background-size: 100% 100%" :style="{backgroundImage: 'url(' + e.imageUrl + ')'}">
        </div>
      </div>
    </div>
    <div v-show="!coachData.envList.length" class="coachDescription" v-if="!loading">
      <div class="coachDesTitle">教学环境
      </div>
      <div class="coachDesContent">
        <div class="env" @click="cshow1"
             style="background: url('http://ose1l6bts.bkt.clouddn.com/%E8%AE%AD%E7%BB%83%E5%9C%BA3.jpg');background-size: 100% 100%">
        </div>
        <div class="env" @click="cshow2"
             style="background: url('http://ose1l6bts.bkt.clouddn.com/%E8%AE%AD%E7%BB%83%E5%9C%BA1.jpg');background-size: 100% 100%"></div>
        <div class="env" @click="cshow3"
             style="background: url('http://ose1l6bts.bkt.clouddn.com/%E8%AE%AD%E7%BB%83%E5%9C%BA2.jpg');background-size: 100% 100%">
        </div>
      </div>
    </div>
    <div v-if="!loading"
         style=" ;text-align: center;height:1.2rem;margin-top: 0.4rem;margin-bottom: 2rem;color: #b3b3b3">没有更多内容了
    </div>
    <router-link v-show="!loading" to="/new">
      <div class="addNewGroup" v-if="!loading">
        我是教练, 我也要申请个人主页
      </div>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../utils/api.js'
  import showImage from '../components/showImage.vue'
  export default {
    name: 'Detail',

    data () {
      return {
        envMore:false,
        desMore:false,
        img:"",
        show:false,
        texthide: true,
        evnhide:true,
        memberId: 0,
        star: [],
        loading: true,
        coachData: {},
        mockData: {}
      }
    },
    components: {
      showImage
    },
    created() {
      this.fetchData();
      // this.getAction();
      // this.getEnv();
    },

    methods: {
      changShow:function(){
        this.show = !this.show;
      },
      cshow1:function(){
        this.show = true
        this.img = 'http://ose1l6bts.bkt.clouddn.com/%E8%AE%AD%E7%BB%83%E5%9C%BA3.jpg'
      },
      cshow2:function(){
        this.show = true
        this.img = 'http://ose1l6bts.bkt.clouddn.com/%E8%AE%AD%E7%BB%83%E5%9C%BA1.jpg'
      },
      cshow3:function(){
        this.show = true
        this.img = 'http://ose1l6bts.bkt.clouddn.com/%E8%AE%AD%E7%BB%83%E5%9C%BA2.jpg'
      },
      cshowEnv :function(img){
        console.log(img)
        this.show = true
        this.img = img;
      }
      ,
      ehide:function(){
        this.evnhide = !this.evnhide
      },
      chide: function () {
        this.texthide = !this.texthide
      },
      back: function () {
        this.$router.go(-1)
      },

      isInteger: function (obj) {
        return obj % 1 === 0
      },
      getAction: async function () {
        var r = await http.post("userInfo/myClass", {userId: this.memberId});
        console.log("aaaaa")
        console.log(r);
      },
      getEnv: async function () {
        var r = await http.post("userInfo/myPhoto", {userId: this.memberId});
        console.log("eeeee")
        console.log(r);
      },
      fetchData: async function () {
        if (this.$route.params.id) {
          sessionStorage.setItem("memberId", this.$route.params.id)
        }
        if (sessionStorage.getItem("memberId")) {
          this.memberId = parseInt(sessionStorage.getItem("memberId"));
        }
        var r = await http.post("userInfo/coachIndex", {id: this.memberId});
        document.title = r.data.name + "教练的个人主页";
        console.log(r);
        if(r.data.description.length > 84)
          this.desMore = true;
        if(r.data.envList.length>3){
          this.envMore = true;
        }
        if (r.data.score < 0) {
          this.star = [2, 2, 2, 2, 2]
        } else if (r.data.score > 5) {
          this.star = [1, 1, 1, 1, 1]
        } else {
          var score = parseInt(r.data.score);
          for (var i = 0; i < score; i++) {
            this.star.push(1);
          }
          if (!this.isInteger(r.data.score - score)) {
            this.star.push(2);
          }
          var disable = 5 - Math.ceil(r.data.score);
          if (disable) {
            for (var i = 0; i < disable; i++) {
              this.star.push(3);
            }
          }
          console.log(this.star)
        }
        setTimeout(() => {
          if (r.result)
            this.coachData = r.data;
          this.loading = false;
        }, 1000);
      }


    }


  };
</script>

<style scoped>
  .hidden {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .env {
    width: 4.38rem;
    height: 5rem;
    display: inline-block;
    margin: 0 0.13rem;
  }

  .wrap {
    background-color: #F5F5F5;
  }

  .but {
    padding-top: 0.15rem;
    color: #fff;
    border-radius: 15px;
    width: 2rem;
    height: 0.92rem;
    background: rgb(12, 173, 255);
    display: inline-block;
    text-align: center;
    position: absolute;
    margin-top: 0.8rem;
    right: 0.8rem;
  }

  .cron-img {
    width: 0.5rem;
    display: inline-block;
    vertical-align: sub;
    margin-right: 0.3rem;
  }

  .star {
    background-image: url('../assets/star/starAction.png');
    background-size: 100% 100%;
    height: 0.5rem;
    width: 0.5rem;
    vertical-align: sub;
  }

  .starHalf {
    background-image: url('../assets/star/starHalf.png');
    background-size: 100% 100%;
    height: 0.5rem;
    width: 0.5rem;
    vertical-align: sub;
  }

  .starDisable {
    background-image: url('../assets/star/starDisable.png');
    background-size: 100% 100%;
    height: 0.5rem;
    width: 0.5rem;
    vertical-align: sub;
  }

  .header {
    line-height: 40px;
    background: #799ff8;
    font-size: 16px;
    color: #fff;
    text-align: center;
    position: relative;
  }

  .header::before {
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    border: 1px solid #fff;
    transform: rotate(-45deg);
    border-right: none;
    border-bottom: none;
    position: absolute;
    left: 10px;
    top: 50%;
    margin-top: -5px;
  }

  .coachBaseInfo {
    background: url("../assets/bgDetail.985091b.jpg");
    background-size: 100% 100%;
    padding: 1rem 0.8rem;
    border-bottom: 2px solid #F2F2F2;
    height: 6rem
  }

  .coachBaseInfo:after {
    clear: both;
    content: '.';
    display: block;
    width: 0;
    height: 0;
    visibility: hidden;
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
    color: #fff;
    margin: 10px auto 10px;
    font-size: 0.72rem;
    font-weight: 700;
  }

  .coachBaseInfo .coachInfo .coachName .coachIsMember {

    font-size: 0.48rem;
    font-weight: 600;
    color: #ffd200;
  }

  .coachBaseInfo .coachInfo .coachYear {
    color: #fff;
  }

  .coachBaseInfo .coachInfo .coachDriverSchool {
    color: #fff;
    margin-top: 18px;
  }

  .coachBaseInfo .coachInfo .coachAddress {
    color: #fff;
    margin-top: 5px;
  }

  .coachTags {
    background-color: #fff;
    padding: 5px;
    position: relative;
  }

  .coachTags:after {
    clear: both;
    content: '.';
    display: block;
    width: 0;
    height: 0;
    visibility: hidden;
  }

  .coachTags .coachTagTitle {
    position: absolute;
    top:50%;
    margin:-1.4rem 0.4rem 0.4rem 0.4rem;
    width: 1.7rem;
    height: 2rem;
    float: left;
    font-size: 0.6rem;
    padding: 10px;
    border-right: 0.08rem solid #DCDCDC;
    color: #5a5e6c;
    font-family: "TREMDS";
  }

  .coachTags .coachTagList {
    height: 100%;
    overflow: hidden;
    margin-left: 3.5rem;
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
    padding: 10px 10px 0 10px;
    color: #666;
  }

  .textHide {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .commonContent {
    font-size: 12px;
    line-height: 20px;
    color: #666;
  }

  .addNewGroup {
    position: fixed;
    bottom: 0;
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
  .envmore{
    overflow: hidden;
    text-overflow: ellipsis;
    height: 5.1rem;
  }

</style>

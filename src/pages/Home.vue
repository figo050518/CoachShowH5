<template>
  <div class="page-tabbar">

    <div class="page-wrap">
      <mt-tab-container class="page-tabbar-container" v-model="selected">
        <mt-tab-container-item id="0">
          <mt-loadmore :bottom-method="loadBottom" :bottom-status-change="handleBottomChange"
                       :bottom-all-loaded="allLoaded"
                       ref="loadmore" style="background:#f7f8fd;">
            <CoachShow class="coachShow"></CoachShow>
            <div style=";background: #fff;padding:0.6rem  0.9rem 0.44rem 0.6rem;margin-bottom:0.2rem;position: sticky"
                 v-bind:class="{hidden:tagShow}">
            <span class="tag-name" v-for='t in tag'
                  v-on:click="selectTag(t)" v-bind:class="{action:t.select}">{{t.name}}</span>
              <img v-show="tagShow" src="../assets/pull.png" class="pull-img" v-on:click="changTagShow()"/>
              <img v-show="!tagShow" src="../assets/push.png" class="push-img"  v-on:click="changTagShow()">
            </div>
            <div class="page-detail" style="margin-bottom: 2.1rem" >
              <div class="thumbnail" v-for="item in coachDataList" >
                <router-link :to="{name: 'Detail', params: {id:item.id}}" slot="left">
                  <div style="width:6.4rem; height:6.4rem;" v-bind:style="{'background':'url('+item.logoUrl+')','background-size':'100% 100%'}">
                  </div>
                  <p style="color:666;background: #fff;padding:0.4rem;height:0.78rem; ">
                    <span style="float:left;margin-right:0.2rem;font-size:0.44rem">{{item.name}}</span>
                    <span style="float:left;font-size:0.46rem;color:#7ac9f7">{{item.score}}分</span>
                    <!--<span style="float:right;font-size:0.44rem;color:#999">{{item.thumbsCount}}</span>-->
                  </p>
                  </router-link>
              </div>
            </div>
          </mt-loadmore>
        </mt-tab-container-item>

        <!--    <mt-tab-container-item id="1">
                  <RankingList :initData="coachDataList"></RankingList>
                </mt-tab-container-item>
         -->
        <mt-tab-container-item id="2">
          <Profile></Profile>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>

    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="0">
        <icon slot="icon" name="ViewGallery" scale="20"></icon>
        {{tabs[0]}}
      </mt-tab-item>
      <!--  <mt-tab-item id="1">
      <img slot="icon" src="../assets/100x100.png">{{tabs[1]}}
      </mt-tab-item> -->
      <mt-tab-item id="2">
        <icon slot="icon" name="account" scale="20"></icon>
        {{tabs[2]}}
      </mt-tab-item>
    </mt-tabbar>

  </div>
</template>

<script>
  import CoachShow from '@/components/CoachShow'
  import RankingList from '@/components/RankingList'
  import Profile from '@/components/Profile'
  import http from '../utils/api.js'

  export default {
    name: 'Home',

    data () {
      return {
        tagShow:true,
        allLoaded: false,
      //  bottomText: '加载更多...',
        loadPage:1,
        tag:[],
        tagSelect:[],
        Authorization:"",
        selected: '0',
        tabs: ['教练秀场', '排行榜', '我的'],      // 排行榜不启用
        coachDataList: []
      }
    },

    components: {
      CoachShow,
      RankingList,
      Profile
    },

    mounted() {
      this.getTag();
      this.getCoach();
      this.$nextTick(() => {
        if(this.$route.params.tab) {
          this.selected = this.$route.params.tab + ''
        }
      });

    },
    methods: {
      changTagShow(){
        this.tagShow =! this.tagShow
      },
      async selectTag(obj){
    if(this.tag.length)
      for(var i=0;i<this.tag.length;i++){
        this.tag[i].select = false;
      }
    obj.select=true
    var r = await http.post("userInfo/coachWithTag" ,{pageIndex:1,pageSize:10,tagId:obj.id});
    console.log(r.data.length)
    this.coachDataList = r.data.list;
  },
  async getTag() {
    var r = await http.post("userInfo/tagList",{});
    //var r = {data:[{name:'脾气好'},{name:'脾气好'},{name:'脾气好'},{name:'脾气好'},{name:'脾气好'},{name:'脾气好'},{name:'脾气好'}]}
    for(var i=0;i<r.data.length;i++){
      r.data[i].select= false;
    }
    this.tag.push(...r.data)
  },
  async getCoach() {
    var r = await http.post("userInfo/coachWithTag" ,{pageIndex:1,pageSize:10});
    this.coachDataList.push(...r.data.list)
    console.log( this.coachDataList);
  },
  loadBottom() {
    this.loadPage = this.loadPage+1
    setTimeout(async() => {
      var r = await http.post("userInfo/coachWithTag" ,{pageIndex:this.loadPage ,pageSize:10});
    if(r.result)
      this.coachDataList.push(...r.data.list)
    this.$refs.loadmore.onBottomLoaded();
  }, 1500);
  },
  handleTopChange:function(status) {
    this.topStatus = status;
    console.log("this.topStatus = "+ status);
  },
  handleBottomChange:function(status) {
    this.bottomStatus = status;
    console.log("this.bottomStatus = status; "+ status);
  },
  }

  }




</script>

<style scoped>
  .push-img{
    width: 0.6rem;
    position: absolute !important;
    right: 0.3rem;
    bottom: 0.1rem;
  }
  .pull-img{
    width: 0.6rem;
    position: absolute;
    top: 0.7rem;
    right: 0.3rem;
  }
  .hidden{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .header{
    line-height: 40px;
    background: #799ff8;
    font-size: 16px;
    color:#fff;
    text-align: center;
    position:relative;
  }
  .page-detail{
    padding:0 0.9rem
  }
  .thumbnail{
    display: inline-block;
    width: 6.4rem;
    border: 0;
    padding: 0;
    margin: 0 0.1rem 0.4rem 0.1rem;
  }
  .page-tabbar {
    overflow: hidden;
    height:100%;
  }

  .page-wrap {
    height:500px;
    overflow: auto;
    height: 100%;
  }
  .action{
    color: #7ac9f7;
    border-bottom:0.08rem solid #7ac9f7;
  }
  .tag-name{
    font-size:0.56rem; margin-right:0.8rem;color:#7ac97;
  }


</style>

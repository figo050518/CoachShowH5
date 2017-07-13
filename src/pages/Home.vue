<template>

    <div class="page-wrap"  ref="mainContainer">
      <pullUp v-on:loadpage="loadBottom">
      <div class="page-tabbar-container">
          <div style="background:#f7f8fd;">
            <CoachShow class="coachShow"></CoachShow>
            <div style=";background: #fff;padding:0.6rem  0.9rem 0.44rem 0.6rem;margin-bottom:0.2rem;position: relative"
                 v-bind:class="{hidden:tagShow}">
            <div class="tag-name" v-for='t in tag'
                  v-on:click="selectTag(t)" v-bind:class="{action:t.select}">{{t.name}}
            </div>
              <div class="pulldiv">
              <img v-show="tagShow" src="../assets/pull.png" class="pull-img" v-on:click="changTagShow()"/>
              </div>
              <div v-show="!tagShow" class="pushdiv"  v-on:click="changTagShow()">收起</div>
            </div>
            <div class="page-detail" >
              <div class="thumbnail" v-for="item in coachDataList" >
                <router-link :to="{name: 'Detail', params: {id:item.id}}" slot="left">
                  <div class="item" >
                    <img :src="item.logoUrl" style="width:6.4rem; height:6.4rem;">
                  </div>
                  <p style="color:#666;background: #fff;padding:0.4rem;height:0.78rem; ">
                    <span style="float:left;margin-right:0.2rem;font-size:0.44rem">{{item.name}}</span>
                    <span style="float:left;font-size:0.46rem;color:#7ac9f7">{{item.score}}分</span>
                    <!--<span style="float:right;font-size:0.44rem;color:#999">{{item.thumbsCount}}</span>-->
                  </p>
                  </router-link>
              </div>
            </div>
          </div>
        </div>

        <!--    <mt-tab-container-item id="1">
                  <RankingList :initData="coachDataList"></RankingList>
                </mt-tab-container-item>
         -->
</pullUp>

    </div>




</template>

<script>
  import CoachShow from '@/components/CoachShow'
  import RankingList from '@/components/RankingList'
  import Profile from '@/components/Profile'
  import http from '../utils/api.js'
  import pullUp from '@/components/pullUp'
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
        coachDataList: []
      }
    },
    watch: {
      messages() {
        console.log("chatlog change");
        this.$nextTick(() => {
          let list = this.$els.mainContainer
          list.scrollTop = list.scrollHeight
          console.log(list.scrollTop)
      })
      }
    },
    components: {
      CoachShow,
      RankingList,
      Profile,
      pullUp
    },

    mounted() {
      this.setTitle();
      this.getTag();
      this.getCoach();

    },
    methods: {
      setTitle(){
        document.title = "教练秀场";
      },
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
  async loadBottom() {
    this.loadPage = this.loadPage+1
    var r = await http.post("userInfo/coachWithTag" ,{pageIndex:this.loadPage ,pageSize:10});
    if(r.result)
      this.coachDataList.push(...r.data.list);
  }
  }

  }




</script>

<style scoped>
  .item{
    width:6.4rem; height:6.4rem;background:url('http://ose1l6bts.bkt.clouddn.com/1.jpg');
    background-size: 100% 100%;

  }
  .pushdiv{
    border-top: 0.02rem solid #c7c7cd;
    text-align: center;
    padding-top: 0.3rem;
    font-size: 0.5rem;
    color: rgb(128, 128, 128);
    margin-top: 0.4rem;
  }
  .pulldiv{
    position: absolute;
    right: 0rem;
    background: rgb(255, 255, 255);
    top: 0.7rem;
    width: 1.0rem;
    height: 1.1rem;
  }
  .selectOnline{
    width: 0.8rem;
    height: 0.04rem;
    background-size: 100% 100%;
    border-bottom:0.08rem solid #7ac9f7;
    margin: 0 auto;
  }
  .push-img{
    width: 0.6rem;
    position: absolute !important;
    right: 0.3rem;
    bottom: 0.1rem;
  }
  .pull-img{
    width: 0.6rem;
    margin-left: 0.1rem;
    margin-top: 0.2rem;
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
    padding: 0 0.6rem;
  }
  .thumbnail{
    display: inline-block;
    width: 6.4rem;
    border: 0;
    padding: 0;
    margin: 0  0.25rem 0.4rem 0.25rem;
  }
  .page-tabbar {
    overflow: hidden;
    height:100%;
  }

  .page-wrap {
    overflow: auto;
    height: 100%;
  }
  .action{
    color: #7ac9f7;
    border-color:#7ac9f7 !important;
  }
  .tag-name{
    font-size: 0.5rem;
    margin: 0.19rem;
    display: inline-block;
    height: 0.8rem;
    width: 2.9rem;
    border: 1px solid #999;
    border-radius: 0.2rem;
    text-align: center;
    padding-top: 0.1rem;
  }


</style>

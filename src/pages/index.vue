<template>
  <div class="page-tabbar">
    <div style="margin-bottom: 2.3rem">
      <router-view></router-view>
    </div>
    <div class="bottom">
      <router-link to="/">
        <div class="tab" @click="checkCar" v-bind:class="{action:selectCar}">
          <img v-show="!selectCar" src="../assets/homeDef.png" class="log" style="display: inline-block">
          <img v-show="selectCar" src="../assets/homeAct.png" class="log" style="display: inline-block">
          <div class="str">{{tabs[0]}}</div>
        </div>
      </router-link>
      <div style="height: 1rem;
    border: 1px solid #c6cdcc;"></div>
      <!--  <mt-tab-item id="1">
      <img slot="icon" src="../assets/100x100.png">{{tabs[1]}}
      </mt-tab-item> -->
      <router-link to="/profile">
        <div class="tab" @click="checkUser" v-bind:class="{action:selectUser}">
          <img v-show="!selectUser" src="../assets/wode@2x.png" class="log" style="display: inline-block">
          <img v-show="selectUser" src="../assets/wode-xuanzhong@2x.png" class="log" style="display: inline-block">
          <div class="str">{{tabs[2]}}</div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        selectCar: true,
        selectUser: false,
        tabs: ['秀场', '排行榜', '我的']     // 排行榜不启用
      }
    },
    mounted() {
      console.log(this.$route.path)
      if (this.$route.path == '/profile') {
        this.selectCar = false
        this.selectUser = true
      }
    },
    methods: {
      checkCar(){
        this.selectCar = true;
        this.selectUser = false;
      },
      checkUser(){
        this.selectCar = false;
        this.selectUser = true;
      }
    }
  }
</script>
<style scoped>
  .action {
    color: rgb(103, 178, 251) !important;
  }

  .tab {
    position: relative;
    font-size: 0.6rem;
    display: inline-block;
    width: 7.4rem;
    color: #666;
    padding: 0.2rem 0;
  }

  .log {
    width: 0.8rem;
    margin-left: 2.7rem;
  }

  .bottom {
    padding-top: 0.3rem;
    right: 0;
    bottom: 0;
    left: 0;
    position: fixed;
    z-index: 1;
    background-image: -webkit-linear-gradient(top, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-size: 100% 1px;
    background-repeat: no-repeat;
    background-position: top left;
    background-color: #fafafa;
    display: -webkit-box; /* Safari and Chrome */
  }

  .str {
    display: inline-block;
    position: absolute;
    top: 0.1rem;
    margin-left: 0.2rem;
  }
</style>

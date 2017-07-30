<template>
  <div>
    <div style="background: #4aa7f5;width: 100%;height: 7rem;position: relative">
      <div style="float: left;text-align:center;width: 50%; ">
        <div class="banner_title">累计收入</div>
        <div class="banner_pay">¥{{data.totalInCome}}</div>
      </div>
      <div
        style="border-right:0.02rem solid #fff;height: 2rem;width: 0.01rem;top:2.26rem;position: absolute;left: 50%"></div>
      <div style="float: left;text-align:center;width: 50%">
        <div class="banner_title">可提现</div>
        <div class="banner_pay">¥{{data.couldSettled}}</div>
      </div>
      <div style="width: 5.6rem;line-height: 1.44rem;background: #f2c334;text-align: center;position: absolute;top:4.7rem;left: 50%;
    margin-left: -2.8rem;border-radius: 0.2rem;color: #fff;font-size: 0.8rem">提现
      </div>
    </div>
    <div style="padding: 0 0.6rem">
      <div class="list_t" v-for="t in data.page.list">
        <div class="left">
          <div class="name">{{t.name}}</div>
          <div class="date">{{t.payTime.substring(0, 10)}}</div>
        </div>
        <div v-show="t.flowType == '1'" class="mid">佣金-不过包赔险</div>
        <div v-show="!(t.flowType == '1')" class="mid">提现</div>
        <div v-show="t.flowType == '1'" class="money">+{{t.draw}}</div>
        <div v-show="!(t.flowType == '1')" class="moneyd">-{{t.draw}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  import http from '../utils/api.js'
  import common from '../utils/common.js'
  export default{
    data(){
      return {
        data:{}
      }
    },
    mounted(){
      document.title = '我的收入';
      this.getList();
    },
    methods:{
      getList:async function(){
        var r = await http.post("insurance/income",{
          "userId":"61",
          "pageIndex":1,
          "pageSize":10
        });
        if(r.result && r.data && r.data.page && r.data.page){
          this.data= r.data
        }
      }
    }

  }
</script>
<style scoped>
  .banner_title {
    font-size: 0.7rem;
    margin-top: 1.2rem;
    color: #fff;
  }

  .banner_pay {
    font-size: 1.44rem;
    font-weight: 500;
    margin-top: 0.3rem;
    color: #fff;
  }

  .list_t {
    height: 2.8rem;
    border-bottom:1px solid rgb(224, 226, 235);
  }
  .name{
    font-size: 0.7rem;
    font-weight: 500;
    color:#333;
    margin-bottom: 0.2rem;
  }
  .date{
    font-size: 0.6rem;
    color: #808080;
  }
  .left{
    float: left;
    margin-top: 0.4rem;
  }
  .mid{
    float:left;
    color: #1393c1;
    margin-top: 0.4rem;
    font-size: 0.6rem;
  }
  .money{
    float: right;
    color: #21c41f;
    margin-top: 1rem;
    font-size: 0.8rem;
    font-weight: 500;
  }
  .moneyd{
    float: right;
    color: #da2121;
    margin-top: 1rem;
    font-size: 0.8rem;
    font-weight: 500;
  }
</style>

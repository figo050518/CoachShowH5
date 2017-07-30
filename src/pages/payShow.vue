<template>
  <div>
    <img src="../assets/bg_entry_1.png" style="width: 100%">
    <img src="../assets/bg_entry_2.png" style="width: 100%;margin-bottom: 2.7rem">
    <div class="fixedLayer">
      <div class="price">
        <label>价格：</label>
        <div>¥180</div>
      </div>
      <router-link :to="{name:'PayGO',params:{userId:userId}}">
        <div class="btn-buy">
          <div class="buy">立即购买</div>
          <div class="tips">95%的学员选择了驾考宝提供的保障</div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
  import wx from 'weixin-js-sdk'
  import $http from '../utils/api.js'
  import common from '../utils/common.js'
  export default{
    name: "PayShow",
    data(){
      return{
        userId:""
      }
    },
    mounted(){
      this.userId =this.$route.params.userId;
      this.getConfig();
    },
    methods:{
      getConfig : async function(){
        var r = await $http.post("insurance/wxConfig",{url:`http://123.206.232.11:9088/pageShow/${this.userId}`});
        var data = r.data;
        console.log(data);
        var name = JSON.parse(localStorage.getItem("name"));
        data.debug = true;
        data.jsApiList = ['onMenuShareTimeline','onMenuShareAppMessage'];
        wx.config(data);
        wx.ready(function(){
          wx.onMenuShareTimeline({
            title: `${name}教练推荐给你一个学车福利-不过包赔险`, // 分享标题
            link: `http://123.206.232.11:9088/pageShow/${this.userId}`, // 分享链接
            desc:"你补考，我报销补考费；你重学，我还报销学费。",
            imgUrl: 'http://ose1l6bts.bkt.clouddn.com/c5b153c30884acf5.jpg', // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
              common.alert("分享成功")
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
              common.alert("取消分享")
            },
            fail:function(){
              common.alert("分享失败")
            }
          });
          wx.onMenuShareAppMessage({
            title: `${name}教练推荐给你一个学车福利-不过包赔险`, // 分享标题
            desc:"你补考，我报销补考费；你重学，我还报销学费。",
            link: `http://123.206.232.11:9088/pageShow/${this.userId}`, // 分享链接
            imgUrl: 'http://ose1l6bts.bkt.clouddn.com/c5b153c30884acf5.jpg', // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
              common.alert("分享成功")
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
              common.alert("取消分享")
            },
            fail:function(){
              common.alert("分享失败")
            }
          });
        })
        wx.error(function(res){
          console.log(res);
        })
      }
    }
  }
</script>
<style scoped>
  .footer {
    border-top: 0.02rem solid #5a5e6c;
    position: fixed;
    bottom: 0;
    width: 100%;
    line-height: 0.8rem;
  }
  .fixedLayer {
    font-weight: 500;
    position: fixed;
    width: 100%;
    height: 2.7rem;
    background-color: #fff;
    left: 0;
    right: 0;
    bottom: 0;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: box;
    display: flex;
    -ms-flex-line-pack: center;
    -webkit-align-content: center;
    align-content: center;
    -webkit-box-align: center;
    -moz-box-align: center;
    -o-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .price {
    width: 6.6875rem;
    margin-left: 0.75rem;
    color: #ff7800;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: box;
    display: flex;
    -webkit-box-orient: horizontal;
    -moz-box-orient: horizontal;
    -o-box-orient: horizontal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    height:2.7rem;
    -ms-flex-line-pack: center;
    -webkit-align-content: center;
    align-content: center;
    -webkit-box-align: center;
    -moz-box-align: center;
    -o-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    font-family: SFUIDisplay-Regular;
  }
  .fixedLayer .price label {
    font-size: 0.9rem;
  }

  .price div {
    font-size: 0.925rem;
  }
  .fixedLayer .btn-buy {
    text-align: center;
    width: 8.7rem;
    height: 2.4rem;
    background-color: #ff7800;
    border: none;
    border-radius: 4px;
    margin-right: 0.375rem;
    color: #fff;
    font-family: SFUIDisplay-Regular;
  }
  .fixedLayer .btn-buy .buy {
    font-size: 1rem;
  }
  .fixedLayer .btn-buy .tips {
    margin-top: 0.1rem;
    font-size: 0.5rem;
  }
</style>

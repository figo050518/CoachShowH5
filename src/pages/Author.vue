
 <!-- 微信登录授权页面 -->
<template>

</template>

<script>
import Vue from 'vue'
import common from '../utils/common'

// /https://segmentfault.com/a/1190000009493199

// 登录后跳转方法
Vue.prototype.goBeforeLoginUrl = () => {
  let url = common.getCookie('beforeLoginUrl')
  if(!url || url.indexOf('/author') != -1){
    router.push('/')
  }else{
    router.push(url)
    common.setCookie('beforeLoginUrl', '')
  }
}


export default {
    name: 'Author',

    created() {
        // 检测会员有没有登录
        if(!common.getCookie('user')){
          let ua = window.navigator.userAgent.toLowerCase()
          if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            // 跳转到微信授权页面 这个由服务号提供
            window.location.href = '/Wap/User/getOpenid'
          }
        }else{
          // 如果有token 但是vuex中没有用户登录信息则做登录操作
          this.login()
        }
    },

    methods: {
        login() {
            let url = '/wrap/user/info'
            // 获取用户第一次授权登录时 存储在数据库的信息
            this.axios.get(url).then((response) => {
                if(response) {
                    this.$store.dispatch("setUserInfo", {}).then( res => {
                        this.goBeforeLoginUrl()
                    })
                } else {
                    if(common.getCookie('user')){
                        // 跳转到微信授权页面
                        window.location.href = '/Wap/User/getOpenid'
                      }
                }
            })
        }
    }
}
</script>

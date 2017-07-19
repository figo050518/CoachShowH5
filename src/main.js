
import 'babel-polyfill'
import Vue from 'vue'
import MintUI from 'mint-ui'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Icon from 'vue-svg-icon/Icon.vue';
import App from './App'
import router from './router'
import store from './vuex/store'
import common from './utils/common'
import axios from 'axios'
import VueAxios from 'vue-axios'
import LazyLoad from './utils/lazyLoader'
import touch from 'vue-directive-touch';
Vue.use(touch);
Vue.use(LazyLoad);
Vue.use(VueAxios, axios)

Vue.use(MintUI)
Vue.use(VueAwesomeSwiper)

Vue.component('icon', Icon);
Vue.use(router);

// 在加载程序前调用用户信息接口
router.beforeEach((to, from, next) => {
  // author 授权页面 用户使用后退返回到授权页，则默认回到首页
  // if (to.path == '/author' && !store.getters.getUserInfo.openid) {
  //     next('/')
  //     return false
  // }
  // if((!common.getCookie('user') || !store.getters.getUserInfo.openid) && to.path != '/author'){
  //   // 第一次进入项目
  //   common.setCookie('beforeLoginUrl', to.fullPath) // 保存用户进入的url
  //   next('/author')
  //   return false
  // }else if(!store.getters.getUserInfo.openid && to.path != '/author'){
  //   // 之前有获取过授权
  //   next('/author')
  //   return false
  // }

    if (!store.getters.setUserInfo) {
        store.dispatch("setUserInfo", {
            openid: 'ADFA47AF646WE',
            nickname: 'Serenity',
            headimgurl: 'http://os8uckj29.bkt.clouddn.com/head.jpg',
            sex: '0'
        }).then(res => {
          next()
        })
    } else {
      next()
    }

});

Vue.config.productionTip = false

/* eslint-disable no-new */
var vue =  new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
export default{vue}

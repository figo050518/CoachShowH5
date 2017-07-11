import Vue from 'vue'
import Router from 'vue-router'

import Author from '@/pages/Author'

import Home from '@/pages/Home'
import New from '@/pages/New'
import Detail from '@/pages/Detail'
import EditUser from '@/pages/EditUser'
import RegMember from '@/pages/RegMember'
import MyClass from   '@/pages/MyClass'
import EditClass from   '@/pages/EditClass'
import Photo from '@/pages/Photo'
import regist from "@/pages/regist"
import Profile from "@/components/Profile"
import index from "@/pages/index"
Vue.use(Router)

export default new Router({
  routes: [

    // 公众号登录授权中转页
    {path: '/author', name: Author, component: Author},
    {path: '/', name: 'index', component: index,
      children:[
        {path: '', name: 'Home', component: Home},
        {path:'/profile',name:"Profile",component:Profile},
        {path: '/regist', name: 'regist', component: regist},
      ]},
    {path: '/new', name: 'New', component: New },
    {path: '/detail', name: 'Detail', component: Detail },
    {path: '/editUser', name: 'EditUser', component: EditUser },
    {path: '/regMember/:isMember/:imgUrl', name: 'RegMember', component: RegMember},
    {path:'/myClass',name:'MyClass',component:MyClass},
    {path:'/editClass/:id',name:'EditClass',component:EditClass},
    {path:'/addClass',name:'AddClass',component:EditClass},
    {path: '/photo',name: 'Photo',component: Photo}
  ]
})

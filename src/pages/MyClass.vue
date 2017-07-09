<template>
  <div class="page-field">
     <div class="header" @click.self="back">
       班型信息
       <div class="add" @click.stop="edit">添加</div>
    </div>  
    <ul class="class-list">
        <li v-for="(item,index) in myClass" :key='index'>
            <div class="fl">
                <p class="class-name">{{item.className}}</p>
                <p class="class-info">{{item.classInfo}}</p>
            </div>
            <div class="fr">
                <span class="price">¥{{item.price}}</span>
                <span class="edit" @click="edit(index)"></span>
                <span class="del" @click="del(index)"></span>
            </div>
        </li>
    </ul>
  </div>
</template>

<script>
import common from '../utils/common.js'
import $http from '../utils/api.js'

export default {
  name: 'myclass',
  data(){
    return {
      myClass:[],
    };
  },
  components: {
  },
  mounted(){
    this.post('uc/myClass',{},res=>{
        console.log(res);
        if(res.result){
            this.myClass =res.data;
        }
    });
    // let myClass = [
    //     {
    //         className:'普通班',
    //         classInfo:'周一-周日',
    //         price:'234'
    //     },
    //     {
    //         className:'普通班',
    //         classInfo:'周一-周日',
    //         price:'124'
    //     }
    // ];
    // this.myClass = myClass;
    
  },
  methods:{
    async post(url,params,cb){
      let res = await $http.post(url,params);
      cb(res);
    },
    back(){
        console.log('back');
        this.$router.go(-1);
    },
    edit(index){
        if(index){
           this.$router.push({
               name :'EditClass',
               params:this.myClass[index]
               }
           )
        }else{
           this.$router.push({
               name :'EditClass',
               }
           )
        }
    },
    del(index){
       this.myClass.splice(index,1);
    }
  }
};
</script>

<style scoped>

.page-field{
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background:#f7f8fd;
}
.banner {
  width: 100%;
  max-height: 200px;
  overflow: hidden;
}
.banner img{
  width: 100%
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
.header .add{
   position: absolute;
   right:.2rem;
   top:0;
}
.class-list li{
    padding:10px;
    background:#fff;
    overflow: hidden;
    margin-bottom:10px;
}
.fl{
    float: left;
}
.fr{
    float: right;
}
.class-name{
    font-size: 15px;
    color:#000;
}
.class-info{
    color:#666;
    font-size:12px;
}
.price{
    line-height:38px;
    font-size:16px;
    color:#0cadff;
}
.edit{
    display: inline-block;
    width: 22px;
    height:20px;
    background: url('../assets/edi.png') no-repeat center;
    background-size: 100%;
    vertical-align: text-bottom;
    margin-left: 5px;
}
.del{
    display: inline-block;
    width: 18px;
    height:20px;
    background: url('../assets/delete.png') no-repeat center;
    background-size: 100%;
    vertical-align: text-bottom;
    margin-left: 5px;
}
</style>

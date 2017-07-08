<template>
  <div class="page-field">
     <div class="header" @click.self="back">
       班型信息
    </div>  
    <div class="class-form">
       <div>
         <label>课程名称<i>*</i></label>
         <input type="text" placeholder="例如普通班，周末班，VIP班" v-model="className">  
       </div>
       <div>
           <label>驾照类型<i>*</i></label>
           <label class="pick" v-for="(item,index) in classType" :key="index" >
             <input :value="item" type="radio" name="classType" :checked='chosenType==index?true:false'>
             {{item}}
           </label>
       </div>
       <div>
           <label>课程费用<i>*</i></label>
           <input type="text" placeholder="例如4500元" v-model="price">
       </div>
       <div @click="showShuttle=true">
           <label>接送方式</label>
           <span class="arr" v-text="shuttleType[shuttleIndex]"></span>
       </div>
       <div @click="showClass=true">
           <label>学车时间</label>
           <span class="arr" v-text="classTime[classIndex]"></span>
       </div>
       <div>
           <label>几人一车</label>
           <input type="text" placeholder="例如4人" v-model="memberNum">
       </div>
    </div>
    <div class="save" @click="save">
        <span>保存</span>
    </div>
    <div class="mask" v-if="showClass">
        <ul>
            <li @click="selectHandle('class',index)" :class="[index==classIndex?'chosen':'']" v-for="(time , index) in classTime" :key='time'>
                {{time}}
            </li>
            <div class="cancel" @click="showClass=false">取消</div>
        </ul>
    </div>
    <div class="mask" v-show="showShuttle">
        <ul>
            <li @click="selectHandle('shuttle',index)" :class="[index==shuttleIndex?'chosen':'']" v-for="(shuttle , index) in shuttleType" :key='shuttle'>
                {{shuttle}}
            </li>
            <div class="cancel" @click="showShuttle=false">取消</div>
        </ul>
    </div>
  </div>
</template>

<script>
import common from '../utils/common.js'
import $http from '../utils/api.js'

export default {
  name: 'editClass',
  data(){
    return {
      className:'',
      classType:['c1','c2'],
      chosenType:0,
      price:'',
      shuttleType:['教练接送','班车接送','自行前往'],
      shuttleIndex:null,
      classTime:['周一到周五训练','周一到周日训练','周末训练','夜间训练'],
      classIndex:null,
      memberNum:'' ,
      showClass:false,
      showShuttle:false,
      checkMap:{
          className:'请填写课程名称',
          price:'请填写课程费用'
      }
    };
  },
  components: {
  },
  mounted(){
      console.log(this.$route.params);
      if(common.isNotEmptyObj(this.$route.params)){
          // todo
      }
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
    selectHandle(type,index){
       if(type=='class'){
          this.classIndex=index;
          this.showClass=false;
       }else if(type='shuttle'){
          this.shuttleIndex=index;
          this.showShuttle=false;
       }
    },
    save(){
        let checkMap = this.checkMap;
        for(let key  in checkMap){
           if(!this[key]){
               return common.alert(checkMap[key])
           }
        }
        console.log({
            className:this.className,
            classType:this.classType[this.chosenType],
            price:this.price,
            shuttleType:this.shuttleType[this.shuttleIndex]||'',
            classTime:this.classTime[this.classIndex]||'',
            memberNum:this.memberNum||'',
        })
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
.class-form div{
    line-height: 40px;
    border-bottom: 1px solid #ddd;
    padding:0 10px;
    background: #fff;
    font-size:12px;
}
.class-form div label{
    width:30%;
    display: inline-block;
}
.class-form div label i{
    color:red;
}
.class-form div .pick{
    width: 50px;
}
.class-form div input[type='text']{
   width: 68%;
   border:none;
   height: 25px;
   text-align:right;
   outline: none;
}
.class-form div input[type='radio']{
    display: inline-block;
    width:15px;
    height: 15px;
    margin-right: 0px;
}
.save{
    padding:10px;
    background: #fff;
    text-align:center
}
.save span{
    display: block;
    background:#38b1e0;
    line-height: 28px;
    color: #fff;
    border-radius: 4px;
}
.arr{
    display: inline-block;
    position: relative;
    width: 68%;
    /*height: 24px;*/
    text-align:right;
    padding-right: 10px;
    box-sizing: border-box;
}
.arr::after{
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    border:1px solid #ddd;
    transform: rotate(-45deg);
    border-top: none;
    border-left:none;
    position: absolute;
    right:0px;
    top:50%;
    margin-top: -7px;

}
.mask{
    position: fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background: rgba(0, 0, 0, 0.5);
}
.mask ul{
    position: absolute;
    bottom: 0;
    left:0;
    right:0;
}
.mask ul li {
    line-height: 30px;
    text-align: center;
    border-bottom: 1px solid #ddd;
     background: #fff;
}
.mask .chosen{
    color:#38b1e0;
}
.mask .cancel{
     background: #fff;
  margin-top:3px;
  line-height: 30px;
  text-align: center;
}
</style>

<template>
  <div class="field">
    <ul class="class-list" style="margin-bottom: 1.7rem">
        <li v-for="(item,index) in myClass" :key='item.id'>
            <div class="fl">
                <p class="class-name">{{item.name}}</p>
                <p class="class-info">
                    <span>{{item.traffic}}</span>
                    <span>{{item.learnTime}}</span>
                    <span>{{item.cardLoadPerson}}人一车</span>
                </p>
            </div>
            <div class="fr">
                <span class="price">¥{{item.price}}</span>
                <span class="edit" @click="edit(item.id)"></span>
              <span class="del" @click="openDel(item.id,index)"></span>
                <!--<span class="del" @click="del(item.id,index)"></span>-->
            </div>
        </li>
    </ul>
    <div class="bottom" @click.stop="edit(null)">添加班级</div>

    <mt-popup
      v-model="deleteVisible"
      style="width: 60%;
  border-radius: 8px;
  padding: 10px;"
      :closeOnClickModal="false">
      <div class="page-field">
        <div class="page-part" style="text-align: center;
    margin: 0.5rem;">
          是否确认删除?
        </div>
      </div>
      <div class="page-field" >
        <mt-button size="small" style="float: right" ref='bindPhoneBtn' @click.native="deleteVisible=false" >取消</mt-button>
        <mt-button size="small" style="float: right;margin-right: 0.3rem" ref='bindPhoneBtn' @click="del" >确定</mt-button>
      </div>
    </mt-popup>
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
      deleteVisible:false,
      id:0,
      index:0
    };
  },
  components: {
  },
  mounted(){
    this.setTitle();
    this.post('uc/myClass',{},res=>{
        console.log(res);
        if(res.result){
            this.myClass =res.data;
        }
    });
  },
  methods:{
    async post(url,params,cb){
      let res = await $http.post(url,params);
      cb(res);
    },
    openDel(id,index){
      this.id = id;
      this.index = index
      this.deleteVisible = true
    },
    setTitle(){
      document.title="班型信息";
    },
    back(){
        console.log('back');
        this.$router.go(-1);
    },
    edit(id){
        if(id){
            this.$router.push({
               name :'EditClass',
               params:{id:id}
            })
        }else{
           this.$router.push({
               name :'AddClass',
           })
        }
    },
    del(){
        this.deleteVisible = false
       this.myClass.splice(this.index,1);
       this.post('uc/delClass',{id:this.id},res=>{
          if(res.result){
              common.alert('删除成功',1000);
          }
       })
    }
  }
};
</script>

<style scoped>
  .field{
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
     /*max-width: 55%;*/
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    background: url('http://ose1l6bts.bkt.clouddn.com/edit.jpg') no-repeat center;
    background-size: 100%;
    vertical-align: text-bottom;
    margin-left: 5px;
}
.del{
    display: inline-block;
    width: 18px;
    height:20px;
    background: url('http://ose1l6bts.bkt.clouddn.com/delete.jpg') no-repeat center;
    background-size: 100%;
    vertical-align: text-bottom;
    margin-left: 5px;
}
@media screen and (max-width: 320px){
    .fl{
        max-width: 58%;
    }
    .class-info{
        font-size: 10px;
    }
}
  .bottom{
    position: fixed;
    bottom: 0px;
    text-align: center;
    height: 1.4rem;
    padding-top: 0.3rem;
    color: rgb(255, 255, 255);
    font-size: 0.7rem;
    background: rgb(86, 146, 253);
    width: 100%;
  }
.telephonePopup {
  width: 60%;
  border-radius: 8px;
  padding: 10px;
}

</style>

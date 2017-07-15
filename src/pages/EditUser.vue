<template>
  <div class="page-wrap">
    <ul class="modlist">
      <li class="hasarrow" @click="uploadAvater">
        <div class="avaterbox">
          <input type="file" class="file" @change="goUpload">
          <div class="l">头像</div>
          <div class="r"><img :src="logoUrl" class="avater"></div>
        </div>
      </li>
      <li>名字： <input class="editInput" type="text" :placeholder="userName==''?'请输入用户名':''"  v-model="userName"></input></li>
      <li class="hasarrow">性别：<mt-button class="editButton" @click.native="sexPickerVisible = true">{{ sex }}</mt-button></li>
      <li>教龄： <input class="editInput" type="text" v-model="userInfo.year" :placeholder="userInfo.year==''?'几年教龄':''"></input></li>
    </ul>

    <ul class="modlist">
      <li class="hasarrow">地区： <mt-button class="editButton" @click.native="addressPickerVisible = true">{{ addressProvince }} {{addressCity}} {{addressXian}}</mt-button></li>
      <li>驾校： <input class="editInput" type="text" v-model="driverSchool" :placeholder="driverSchool==''?'驾校':''"></input></li>
      <li>训练场名称： <input class="editInput" type="text" v-model="trainingGround" :placeholder="trainingGround==''?'训练场名称':''"></input></li>
      <li>训练场地址： <input class="editInput" type="text" v-model="trainingAddress" :placeholder="trainingAddress==''?'训练场地址':''"></input></li>
    </ul>

    <ul class="modlist">
      <router-link :to="'/showMobile/'+telephoneTips">
        <li class="hasarrow">手机号： <mt-button class="editButton">{{ telephoneTips }}</mt-button></li>
      </router-link>
    </ul>
    <div style="margin: 1rem 0.5rem;font-size: 0.7rem;color: #ffffff;background: #38b1e0;text-align: center;    border-radius: 0.3rem;
    padding: 0.3rem;" @click="submitEidtInfo">保存</div>
    <!-- 手机号验证 -->
    <mt-popup
      v-model="telephoneVisible"
      class="telephonePopup"
      :closeOnClickModal="false">
      <div class="page-field">
        <div class="page-part" style="text-align:right;">
          <mt-button style="display:inline-block; margin-bottom:3px; height:25px; background-color:#fff;" @click.native="telephoneVisible=false">X</mt-button>
        </div>
        <div class="page-part" style="margin-bottom:20px;">
          <mt-field label="手机号码" placeholder="  输入手机号码" v-model="telephoneNo" ></mt-field>
          <mt-field label="验证码：" placeholder="  输入验证码" v-model="checkCode" :disabled="telephoneInputDisabled"></mt-field>
        </div>
      </div>
      <div class="page-field" style="text-align:center; margin-bottom: 20px;">
          <TimeBtn class="btn btn-default" ref='timeBtn' v-on:run="sendCode" ></TimeBtn>
          <mt-button size="small" ref='bindPhoneBtn' @click.native="bindPhone" :disabled="bindPhoneBtnStatus">绑定手机</mt-button>
      </div>
    </mt-popup>

    <!-- 地区选择 -->
    <mt-popup
      v-model="addressPickerVisible"
      :closeOnClickModal="false"
      popup-transition="popup-fade"
      position="bottom" style="width:100%;">
      <div style="text-align:center; margin-top:10px;">
          <mt-button size="small"  @click.native="addressPickerVisible = false" style="background-color:#38b1e0;color:#fff;margin-right:50px;padding:0 30px;">取消</mt-button>
          <mt-button size="small"  @click.native="addressEdit" style="background-color:#38b1e0;color:#fff;padding:0 30px;">确定</mt-button>
      </div>
      <mt-picker :slots="provinceSlots" class="picker" style="width:60%; display:inline-block;" @change="onProvinceChange" :visible-item-count="5" ></mt-picker >
      <mt-picker :slots="citySlots" ref="picker" class="picker" style="width:30%; display:inline-block;" @change="onCityChange" :visible-item-count="5" ></mt-picker >
    </mt-popup>

    <!-- 性别选择 -->
    <mt-popup
      v-model="sexPickerVisible"
      popup-transition="popup-fade"
      position="bottom" style="width:100%">
      <mt-picker :slots="sexSlots" class="picker" @change="onSexChange" :visible-item-count="3" ></mt-picker >
    </mt-popup>

    <!-- 提示信息 -->
    <mt-popup v-model="msgVisible" position="top" class="mint-popup-2" :modal="false">
      <p>{{msg}}</p>
    </mt-popup>

  </div>
</template>

<script>
import Vue from 'vue'
import address from '../libs/address.json'
import TimeBtn from '@/components/TimerBtn'
import $http from '../utils/api.js'

export default {
  name: 'EditUser',

  components: {
    TimeBtn
  },

  data() {
    return {
      userId:'',
      userName: '',
      logoUrl:'',
      driverSchool: '',
      trainingGround:'',
      trainingAddress: '',
      sexPickerVisible: false,
      addressPickerVisible: false,
      telephoneVisible: false,
      msgVisible:false,
      msg: '',
      telephoneTips: '',
      telephoneNo: '',
      telephoneInputDisabled: true,
      checkCode:'',
      bindPhoneBtnStatus: true,
      codeSended:false,
      sex: '',
      sexSlots: [
        {
          flex: 1,
          defaultIndex: 1,
          values: ['男', '女']
        }
      ],
      provinceSlots: [
        {
          flex: 1,
          defaultIndex: 1,
          values: Object.keys(address),
          className: 'slot1',
          textAlign: 'center'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: [],
          className: 'slot3',
          textAlign: 'center'
        }, {
          divider: true,
          content: '-',
          className: 'slot4'
        }
      ],
      citySlots: [
         {
          flex: 1,
          values: [],
          className: 'slot5',
          textAlign: 'center'
        }
      ],
      addressProvince: '',
      addressCity: '',
      addressXian: '',
      addressProvinceTemp: '',
      addressCityObj:'',
      addressCityTemp: '',
      addressXianTemp: '',
      userInfo: {
      }
    }
  },

  mounted() {
    this.setTitle()
    // todo 获取用户信息
    this.post('uc/getUserInfo',{},(res)=>{
      if(res.result){
        let data = res.data;
        this.$set(this.userInfo,'headimgurl',data.imageUrl||this.$store.getters.getUserInfo.headimgurl);
        this.$set(this.userInfo,'sex',data.sex=='0'?'女':'男');
        this.$set(this.userInfo,'year',data.workYear||'');
        this.userId = data.id;
        this.userName = data.name;
        this.logoUrl = data.logoUrl;
        this.sex = this.userInfo.sex;
        this.driverSchool = data.schoolName||'';
        this.trainingGround=data.trainingGround||'';
        this.trainingAddress =data.trainingLocation||'';
        this.telephoneNo =data.mobile||'';
        this.telephoneTips = this.telephoneNo==''?'请绑定手机号' : this.telephoneNo;
        this.addressProvince = data.province||'上海市';
        this.addressCity = data.city||'市辖区';
        this.addressXian = data.area||'长宁区';
      }
    });

    this.$nextTick(() => {
      setInterval(() => {   // 初始化地区选择插件
        this.provinceSlots[0].defaultIndex = 0;
      }, 1000);
    });

  },
  methods: {
    setTitle(){document.title ='身份信息'},
   async goUpload(e){
      var files = e.target.files || e.dataTransfer.files;
      var formdata = new FormData();
      formdata.append('file', files[0]);
      var r = await $http.upload('uc/uploadLogo',formdata);
      this.logoUrl = r.data;
    },
    // 省份变化
    onProvinceChange(picker, values) {
      let add = address
      let sheng = Object.keys(add)
      let shi = Object.keys(add[values[0]])
      picker.setSlotValues(1, shi);
      this.addressProvinceTemp = values[0];
      this.addressCityTemp = values[1] == undefined ? '':values[1];
    },

    // 县变化
    onCityChange(picker, values) {
      this.addressXianTemp = values[0]
    },

    addressEdit() {
      this.addressProvince = this.addressProvinceTemp
      this.addressCity = this.addressCityTemp
      this.addressXian = this.addressXianTemp
      this.addressPickerVisible = false
    },

    onSexChange(picker, values) {
      this.sex = values[0]
    },

    showMsgBox(msg) {
      this.msgVisible = true
      this.msg = msg
      setTimeout(()=>{
        this.msgVisible = false
        this.msg = ''
      }, 2000)
    },
    //头像上传
    uploadAvater(){

    },
    // 发送短信
    sendCode() {
      if(this.telephoneNo == '') {
        this.showMsgBox('手机号码不能为空')
      } else if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.telephoneNo))){
        this.showMsgBox('手机号码不正确')
      } else {
        this.$refs.timeBtn.setDisabled(true)   //设置按钮不可用
        this.$refs.timeBtn.start()
        this.telephoneInputDisabled = false   // 设置验证码输入框可用
        this.post('userInfo/sendMsg',{mobile:this.telephoneNo},(res)=>{
            if(res.result){
                this.codeSended = true;
            }else{
                this.showMsgBox('验证码发送失败')
            }
        });
      }
    },

    // 绑定手机
    bindPhone() {
      console.log('绑定手机: ',this.telephoneNo, this.checkCode)
      // 发送给后台
      // this.$store.dispatch('setTelephoneNo', this.telephoneNo)
      this.post('userInfo/checkMobileCode',{mobile:this.telephoneNo,code:this.checkCode},checkRes=>{
         if(checkRes.result){
             //todo 绑定手机
             this.telephoneVisible = false;
             this.telephoneTips = this.telephoneNo;
         }else{
           this.showMsgBox('请输入正确的验证码')
         }
      })

    },

    // 保存编辑的信息
    submitEidtInfo() {
       this.post('uc/updateUser',{
         id:this.userId,
         name:this.userName,
         headimgurl:this.headimgurl,
         logoUrl:this.logoUrl,
         mobile:this.telephoneNo,
         sex:this.sex,
         workYear:this.userInfo.year,
         province:this.addressProvince,
         city:this.addressCity,
         area:this.addressXian,
         schoolName:this.driverSchool,
         trainingGround:this.trainingGround,
         trainingLocation:this.trainingAddress,
       },(res)=>{
         if(res.result){
           this.showMsgBox('保存成功');
//        setTimeout(function (){
//          this.$router.push({
//            path:'/profile'
//          })
//        },1500)

         }else{
           console.log(res);
           this.showMsgBox('网络异常，请稍后再试')
         }
       }) ;

   },

    async post(url,params,cb){
      let res = await $http.post(url,params);
      cb(res);
    }

  },

  watch: {

    'checkCode': {
      handler() {
        if( this.checkCode != '') {
          this.bindPhoneBtnStatus = false
        }
      }
    },

    'addressCityTemp': {
      handler() {
        let xian = [], add = address
        if(this.addressProvinceTemp !='' && this.addressCityTemp != '') {
          xian = Object.keys(add[this.addressProvinceTemp][this.addressCityTemp]);
          this.citySlots[0].values = xian
        }
      }
    }
  }

};
</script>

<style scoped>
.file{
  border: 1px solid #0cadff;
  width: 1.5rem;
  position: absolute;
  opacity: 0;
  right: 1.2rem;
  height: 1.5rem;
  margin-top: 0.2rem;
}
.mint-popup-2 {
  width: 100%;
  height: 50px;
  text-align: center;
  background-color: rgba(0,0,0,.7);
  backface-visibility: hidden;
}
.mint-popup-2 p {
  line-height: 50px;
  color: #fff;
}
.telephonePopup {
  width: 80%;
  border-radius: 8px;
  padding: 10px;
}
.avaterbox {
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  /*padding-top: 10px;*/
  margin-top: 10px;
  width: calc (100% - 15px);
  /*border-bottom: 1px solid #ddd;*/
  margin-right:10px;
}
.acaterbox:after {
  clear:both;
  content:'.';
  display:block;
  width: 0;
  height: 0;
  visibility:hidden;
}
.avaterbox .l {
  width: 50%;
  float: left;
  line-height: 50px;
}
.avaterbox .r {
  float: right;
  border-radius:40px;
  /*margin-right: 5px;*/
  overflow: hidden;
  width: 40px;
  height: 40px;
  margin-top: 5px;
}
.avaterbox .avater {
  width:40px;
  height: 40px;
}

.editInput {
  float: right;
  box-shadow: none;
  height: inherit;
  margin-right: 10px;
  text-align: right;
  font-size: inherit;
  line-height: 40px;
  border-radius: 0;
  border: 0;
  flex: 1;
  outline: 0;
}
.editInput:focus {
  /*border-bottom: 1px solid #ddd;*/
}

.editButton {
  float: right;
  background-color: #fff;
  box-shadow: none;
  height: inherit;
  margin-right: 10px;
  padding-right:0;
  text-align: right;
  font-size: inherit;
  line-height: 40px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0;
  border: 0;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  outline: 0;
  min-width: 50px;
}

.modlist {
  margin-bottom: 10px;
  /*border-top: 1px solid #d1d1d1;*/
  /*border-bottom: 1px solid #d1d1d1;*/
  background-color: #fff
}

.modlist li {
  margin-left: 14px;
  line-height: 1.5;
  padding-right:20px;
  line-height: 40px;
  border-bottom: 1px solid #ddd;
  /*padding: 12px 20px 12px 0;*/
  /*border-bottom: 1px solid #e5e5e5;*/
}

.modlist li:last-child{
  border-bottom: none;
}

.modlist li .icon {
  height: 20px;
  width: 20px;
  vertical-align: sub;
  padding-right: 5px;
}


.modlist a:last-child li{
  border: none
}

.modlist li .info {
  float: right;
  margin-right: 7%;
  color: #999
}

.hasarrow{
  background: url(http://s8.mogucdn.com/pic/140730/176rwo_ieygimrsmy4tezbvmiytambqgqyde_16x29.png) no-repeat 95% center;
  background-size: 8px
}

.modlist .operate {
  border-top: 1px solid #e5e5e5!important;
  background: 0 0;
  margin: -1px 0 0 0;
  background-color: #fff;
  padding: 0
}

.modlist .operate .ic {
  position: relative;
  float: left;
  display: block;
  width: 25%;
  text-align: center;
  color: #727272;
  font-size: 12px;
  padding: 9px 0 7px 0
}

.modlist .operate .icon {
  font-size: 16px;
  height: 20px
}

.modlist .operate .caution {
  position: absolute;
  right: 6px;
  top: 4px;
  max-width: 24px;
  color: #fff;
  background-color: #f5342f;
  -webkit-border-radius: 14px;
  border-radius: 14px;
  line-height: 1;
  padding: 3px 5px 2px 5px;
  text-overflow: ellipsis;
  overflow: hidden
}
.f12{
  font-size:12px;
}
.page-wrap{
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background:#f7f8fd;
}
.header{
  height: 40px;
  background: #799ff8;
  font-size: 16px;
}
</style>

<template>
  <div class="page-field" style="background-color: #F5F5F5;">

    <mt-header title="身份信息" style="height: 50px;">
      <router-link :to="{name: 'Home', params: {tab:2}}" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button slot="right"  @click.native="submitEidtInfo">保存</mt-button>
    </mt-header>

    <div class="avaterbox">
      <div class="l">头像</div>
      <div class="r"> <img :src="userInfo.headimgurl" alt="" class="avater"> </div>
    </div>

    <ul class="modlist hasarrow">
      <li>名字： <input class="editInput" type="text" placeholder="请输入用户名"  v-model="userName"></input></li>
      <li>手机号： <mt-button class="editButton" @click.native="telephoneVisible = true">{{ telephoneTips }}</mt-button></li>
      <li>性别：<mt-button class="editButton" @click.native="sexPickerVisible = true">{{ sex }}</mt-button></li>
      <li>教龄： <input class="editInput" type="text" :value="userInfo.year" placeholder="几年教龄"></input></li>
    </ul>

    <ul class="modlist hasarrow">
      <li>地区： <mt-button class="editButton" @click.native="addressPickerVisible = true">{{ addressProvince }} {{addressCity}} {{addressXian}}</mt-button></li>
      <li>驾校： <input class="editInput" type="text" :value="driverSchool" placeholder="驾校"></input></li>
      <li>训练场名称： <input class="editInput" type="text" :value="trainingGround" placeholder="训练场名称"></input></li>
      <li>训练场地址： <input class="editInput" type="text" :value="trainingAddress" placeholder="训练场地址"></input></li>
    </ul>

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
      <div class="page-field" style="text-align:center; margin-top:10px;">
          <mt-button size="small" ref='bindPhoneBtn' @click.native="addressPickerVisible = false" style="background-color:#26A2FF;color:#fff;margin-right:50px;padding:0 30px;">取消</mt-button>
          <mt-button size="small" ref='bindPhoneBtn' @click.native="addressEdit"style="background-color:#26A2FF;color:#fff;padding:0 30px;">确定</mt-button>
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
import address from '../libs/address.json'
import TimeBtn from '@/components/TimerBtn'

export default {
  name: 'EditUser',

  components: {
    TimeBtn
  },

  data() {
    let telephone = this.$store.getters.getTelephoneNo
    let telephoneTips = telephone == '' ? '请绑定手机号' : telephone

    return {
      userName: '',
      driverSchool: '',
      trainingGround:'',
      trainingAddress: '',
      sexPickerVisible: false,
      addressPickerVisible: false,
      telephoneVisible: false,
      msgVisible:false,
      msg: '',
      telephoneTips: telephoneTips,
      telephoneNo: telephone,
      telephoneInputDisabled: true,
      checkCode:'',
      bindPhoneBtnStatus: true,
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
      addressProvince: '上海市',
      addressCity: '市辖区',
      addressXian: '长宁区',
      addressProvinceTemp: '',
      addressCityObj:'',
      addressCityTemp: '',
      addressXianTemp: '',
      userInfo: {
      }
    }
  },

  mounted() {
    this.userInfo = this.$store.getters.getUserInfo
    if(this.userInfo.openid) {
      this.userName = this.userInfo.nickname
      this.sex = this.userInfo.sex == '0' ? '女' : '男'
    }
    this.$nextTick(() => {
      setInterval(() => {   // 初始化地区选择插件
        this.provinceSlots[0].defaultIndex = 0;
      }, 1000);
    });
  },

  methods: {
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
        // hz.ajaxRequest("sys/sendCode?_"+$.now(),function(data){
        //   if(data.status){
        //       vm.$refs.timeBtn.start(); //启动倒计时
        //   }else{
        //       vm.$refs.timeBtn.stop(); //停止倒计时
        //   }
        // });
      }
    },

    // 绑定手机
    bindPhone() {
      console.log('绑定手机: ',this.telephoneNo, this.checkCode)
      // 发送给后台
      this.$store.dispatch('setTelephoneNo', this.telephoneNo)
      this.telephoneVisible = false;
      this.telephoneTips = this.telephoneNo
    },

    // 保存编辑的信息
    submitEidtInfo() {
       console.log(this.userInfo.openid, this.userName, this.sex, this.addressProvince, this.addressCity, this.addressXian, this. driverSchool,this.trainingGround,this.trainingAddress)
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
  height: 60px;
  line-height: 60px;
  background-color: #fff;
  padding-top: 10px;
  margin-bottom: 10px;
  width: 100%;
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
  margin-left: 15px;
}
.avaterbox .r {
  float: right;
  border-radius: 50px;
  margin-right: 15px;
  overflow: hidden;
  width: 50px;
  height: 50px;
}
.avaterbox .avater {
  width: 100%;
  height: 100%
}

.editInput {
  float: right;
  box-shadow: none;
  height: inherit;
  margin-right: 20px;
  text-align: right;
  font-size: inherit;
  line-height: 1.6;
  border-radius: 0;
  border: 0;
  flex: 1;
  outline: 0;
}
.editInput:focus {
  border-bottom: 1px solid #ddd;
}

.editButton {
  float: right;
  background-color: #fff;
  box-shadow: none;
  height: inherit;
  margin-right: 10px;
  text-align: right;
  font-size: inherit;
  line-height: 1.6;
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
  border-top: 1px solid #d1d1d1;
  border-bottom: 1px solid #d1d1d1;
  background-color: #fff
}

.modlist li {
  margin-left: 14px;
  line-height: 1.5;
  padding: 12px 20px 12px 0;
  /*border-bottom: 1px solid #e5e5e5;*/
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

.hasarrow li {
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
</style>

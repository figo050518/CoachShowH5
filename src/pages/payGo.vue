<template>
  <div   class="page-wrap">
    <div class="topBanner">
      <img src="../assets/company_logo.png" alt="">
    </div>
    <div style="line-height: 2rem;color: #999999;padding-left: 0.4rem;font-size: 0.55rem">被保险人信息</div>
    <ul class="modlist" style="margin-bottom: 0">
      <li class="hasarrow">学车城市： <mt-button class="editButton" @click.native="addressPickerVisible = true">{{ addressProvince }} {{addressCity}} {{addressXian}}</mt-button></li>
      <li>名字： <input class="editInput" type="text" :placeholder="policyName==''?'请输入用户名':''"  v-model="policyName"></input></li>
      <li>身份证号： <input class="editInput" type="text" :placeholder="policyCardNo==''?'请输入身份证号':''"  v-model="policyCardNo"></input></li>
      <li>电话号码： <input class="editInput" type="text" :placeholder="policyMobile==''?'请输入电话号码':''"  v-model="policyMobile"></input></li>
      <li>短信验证码： <div @click="sendMsg" v-show='!sendFlag' class="msgCode">发送短信</div>
        <div v-show='sendFlag' class="msgCode">剩余{{timeCount}}</div>
        <input style="width: 5.9rem" class="editInput" type="text" v-model="msgCode" :placeholder="msgCode==''?'请输入短信验证码':''"></input></li>
    </ul>
    <div style="line-height: 2rem;color: #999999;padding-left: 0.4rem;font-size: 0.55rem">投保人信息</div>
    <ul class="modlist">
      <li>与被保险人关系： <span style="float: right">本人</span></li>
    </ul>
<div class="clause">
  <i id="clausetrue" class="active"></i>
  <span>本人已阅读并同意<a href="http://event.bigins.cn/fyd/clause">《保险条款》</a>和<a href="http://event.bigins.cn/fyd/norm">《各城市赔付标准》</a></span>
</div>
    <div class="footer_button">
      <span class="footer_money">￥180.00</span>
<span class="footer_pay" @click="submitEidtInfo">
                      <img src="../assets/zfb_icon.png" v-show="!isWx">
                    <img src="../assets/wx_icon.png"  v-show="isWx">
                    <span>立即支付</span>
                </span>
    </div>



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
  import common from '../utils/common.js'

  export default {
    name: 'EditUser',

    components: {
      TimeBtn
    },

    data() {
      return {
        isWx:'',
        policyName:'',
        policyCardNo:'',
        policyMobile:'',
        msgCode:"",
        phoneREG:/^1[3|4|5|8][0-9]\d{4,8}$/,
        cardNoREG:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
        sendFlag:false,
        timeCount:30,

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
        addressProvince: '请选择',
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
      this.setTitle();
      this.isWx = this.isWeiXin();
      this.$nextTick(() => {
        setInterval(() => {   // 初始化地区选择插件
        this.provinceSlots[0].defaultIndex = 0;
      }, 1000);
    });

    },
    methods: {
      sendMsg :async function (){
    if(this.policyMobile && this.phoneREG.test(this.policyMobile)){
      this.sendFlag = true;
      let count =  setInterval(()=>{
          if(this.timeCount==0){
        clearInterval(count);
        this.sendFlag=false;
        this.timeCount = 30;
      }else{
        this.timeCount = this.timeCount - 1;
      }
    },1000);
      var r = await $http.post('userInfo/sendMsg',{mobile:this.policyMobile});
      if(r.result){
        common.alert('验证码发送成功，请查看短信确认',1000);
      };

      }else{
        common.alert("手机号码格式错误",1000)
      };
  },
      setTitle(){document.title ='投保信息'},
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
      isWeiXin(){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
          return true;
        }else{
          return false;
        }
      },
      // 保存编辑的信息
  submitEidtInfo() {
    if(!this.addressProvince || this.addressProvince == '请选择' || !this.addressCity)
      return this.showMsgBox('请选择地址');
    if(!this.policyName)
      return this.showMsgBox('请填写姓名');
    if(!this.cardNoREG.test(this.policyCardNo))
      return this.showMsgBox('身份证格式错误');
    if(!this.phoneREG.test(this.policyMobile))
      return this.showMsgBox('手机号码格式错误');
    if(!this.msgCode)
      return this.showMsgBox('请填写验证码');
    this.post('insurance/save',{
      province:this.addressProvince,
      city:this.addressCity,
      area:this.addressXian,
      policyName:this.policyName,
      policyCardNo:this.policyCardNo,
      policyMobile:this.policyMobile,
      coachId:this.$route.params.userId,
      code:this.msgCode
    },(res)=>{
      if(res.result && res.data.result){
      console.log(res.data.url)
        window.location.href= res.data.url
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
  .clause {
    position: fixed;
    bottom: 2rem;
    left: 0;
    background: #f5f6f7;
    text-align: center;
    box-sizing: border-box;
    width: 100%;
    text-align: center;
    padding-bottom: 0.4rem;
  }
  .clause span {
    vertical-align: middle;
    color: #999999;
    font-size: 12px;
  }
  .clause span a {
    color: #02C4E6;
  }
  .clause i.active {
    background: #02C4E6 url('../assets/right_active.png') no-repeat center center;
    background-size: 75%;
    border: 1px #02C4E6 solid;
    border-radius: 3px;
  }
  .clause i{
    display: inline-block;
    border: 1px #02C4E6 solid;
    background: #02C4E6;
    width: 10px;
    height: 10px;
    border-radius: 3px;
    vertical-align: middle;
  }
  .topBanner{
    width: 100%;
    height: 1.76rem;
    background: #09c7fa;
    text-align: center;
  }

  .topBanner img {
    display: inline-block;
    height: 1rem;
    padding-top: 0.4rem;
  }
  .msgCode{
    color: #999999;
    height: 1rem;
    float: right;
    border: 1px solid rgba(0, 0, 0, 0.1);
    font-size: 0.4rem;
    padding: 0 .4rem;
    line-height: 1rem;
    margin-top: 0.4rem;
    padding-top: 0.05rem;
    border-radius: 0.2rem;
    width: 1.74rem;
    text-align: center;
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



  .editInput {
    float: right;
    box-shadow: none;
    height: inherit;
    margin-right: 10px;
    font-size: inherit;
    line-height: 2rem;
    border-radius: 0;
    border: 0;
    flex: 2;
    outline: 0;
    width: 8.5rem
  }


  .editButton {
    padding:0;
    float: right;
    background-color: #fff;
    box-shadow: none;
    height: inherit;
    margin-right: 10px;
    text-align: left;
    font-size: inherit;
    line-height: 2rem;
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
    width: 8.5rem;
  }

  .modlist {
    margin-bottom: 10px;
    /*border-top: 1px solid #d1d1d1;*/
    /*border-bottom: 1px solid #d1d1d1;*/
    background-color: #fff
  }

  .modlist li {
    color: rgba(0, 0, 0, 0.54);
    font-size: 0.6rem;
    margin-left: 14px;
    line-height: 2rem;
    padding-right:20px;
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



  .hasarrow{
    background: url(http://s8.mogucdn.com/pic/140730/176rwo_ieygimrsmy4tezbvmiytambqgqyde_16x29.png) no-repeat 95% center;
    background-size: 8px
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
  .footer_button {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height:2rem;
    line-height: 2rem;
    background: #fff;
    font-size: .6rem;
    text-align: center;
  }
  .footer_button .footer_money {
    float: left;
    width: 28%;
    border: 1px rgba(0, 0, 0, 0.1) solid;
    box-sizing: border-box;
    color: rgba(255, 0, 0, 0.8);
    font-size: 0.6rem;
    font-weight: bolder;
  }
  .footer_button .footer_pay {
    display: inline-block;
    width: 72%;
    background: #0093f0;
    color: #fff;
    -webkit-tap-highlight-color: transparent;
    -webkit-appearance: none;
    outline: 0;
    text-decoration: none;
  }
  .footer_button .footer_pay em {
    vertical-align: middle;
  }
  .footer_button .footer_pay img {
    display: inline-block;
    vertical-align: text-bottom;
    width: 0.8rem;
    margin-right: .05rem;
  }
  .dn{
    display:none
  }
</style>

<template>
  <div class="wrap">
    <div class="head">
        <div class="avatar"><img :src="avatar"></div>
    </div>
    <div class="card">
        <div v-if="!isMember">
            <p>季度会员：¥559／年</p>
            <p>赶快加入吧，尊享会员特权！</p>
        </div>
        <div v-else>
            <p>会员等级：季度会员</p>
            <p>赶快加入吧，尊享会员特权！</p>
        </div>
    </div>
    <div class="info">
        <h3>会员特权</h3>
        <div>
            <p>意向学员信息</p>
            <p>优先获取招生线索</p>
        </div>
        <div>
            <p>意向学员信息</p>
            <p>优先获取招生线索</p>
        </div>
        <div>
            <p>意向学员信息</p>
            <p>优先获取招生线索</p>
        </div>
        <div>
            <p>意向学员信息</p>
            <p>优先获取招生线索</p>
        </div>
    </div>

    <div class="sub-btn" @click="showMask=true">
        <span v-if="!isMember">立即开通 >></span>
        <span v-else>立即续费 >></span>
    </div>
    <div class="mask" v-show="showMask">
        <div>
            <p>暂不支持线上支付</p>
            <p>开通会员请联系：18651359635</p>
            <span @click="showMask=false">取消</span>
            <a href="tel:18651359635"><span>拨打</span></a>
        </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'RegMember',
  data() {
    // let avatar = this.$store.getters.getUserInfo.headimgurl
    return {
        avatar: '',
        isMember: false,
        showMask:false,
    }
  },
  mounted(){
    this.setTitle();
      let params = this.$route.params;
    this.isMember = params.isMember=='0'?false:true;
    this.avatar = params.imgUrl;
  },
  methods:{
    setTitle(){
      document.title="我的会员"
    },
      back(){
          this.$router.go(-1);
      }
  }
};
</script>

<style scoped>

.wrap {
   position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background:#f7f8fd;
}

.head {
    width: 100%;
    background:#799ff8;
    position:relative;
    height: 60px;
}
.head .avatar {
    margin: 0 auto;
    height: 80px;
    width: 80px;
    border-radius: 80px;
    background-color: #fff;
    overflow: hidden;
    position:absolute;
    top:30px;
    left:50%;
    margin-left: -45px;
    z-index: 2;
}
.head::before{
    content: '';
    display: inline-block;
    height: 90px;
    width: 90px;
    border-radius: 90px;
    background-color: #fff;
    position:absolute;
    top:25px;
    left:50%;
    margin-left: -50px;
    z-index: 0;
}
.head .avatar img {
    height: 100%;
    width: 100%;
}
.head::after{
    content: '';
    display: inline-block;
    width:45px;
    height:45px;
    background: url('../assets/champion.png') no-repeat center;
    position: absolute;
    right:calc(50% - 70px);
    top:5px;
    background-size:100%;
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
.card{
    margin:10px;
    height: 100%;
    height:120px;
    background: linear-gradient(#778efe,#7db6f1);
    background-image: url('../assets/bg-blue.png');
    background-repeat: no-repeat;
    background-position: bottom center;
    background-size: 100%;
    position: relative;
    z-index: 1;
    border-radius: 10px;
    overflow: hidden;
    text-align: center;
    color: #fff;
}
.card p:nth-of-type(1){
    font-size:18px;
    padding-top: 40px;
}
.card p:nth-of-type(2){
    font-size: 16px;
}
.info{
    background: #fff;
    border-radius:4px;
    margin:12px;
    padding:10px 20px;
    box-shadow: 0px 0px 5px #eee;
    text-align: center;
}
.info h3{
    text-align: center;
    color:#666;
    background:url(../assets/title.png) no-repeat center;
    background-size: 60%;
}
.info div{
    margin:10px;
    padding-left: 30px;
}
.info div:nth-of-type(1){
    background: url('../assets/1@3x.png') no-repeat;
    background-size: 30px;
    background-position: 20% 50%;
}
.info div:nth-of-type(2){
    background: url('../assets/2@3x.png') no-repeat;
    background-size: 30px;
    background-position: 20% 50%;
}
.info div:nth-of-type(3){
    background: url('../assets/3@3x.png') no-repeat;
    background-size: 30px;
    background-position: 20% 50%;
}
.info div:nth-of-type(4){
    background: url('../assets/4@3x.png') no-repeat;
    background-size: 30px;
    background-position: 20% 50%;
}
.info div p:nth-of-type(1){
    color:#577dbd;
    font-size: 15px;
}
.info div p:nth-of-type(2){
    color:#999;
    font-size: 12px;
}
.sub-btn{
    color:#fff;
    width:90%;
    margin: 0 auto;
    line-height: 40px;
    text-align: center;
    border-radius: 4px;
    background:linear-gradient(#fede75,#dcb334);
}
.mask{
    position: fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index: 3;
    background: rgba(0, 0, 0, 0.5);
}
.mask div{
     position: absolute;
    bottom: 0;
    left:0;
    right:0;
    background:#fff;
    font-size: 0;
}
.mask div p {
    line-height: 20px;
    text-align: center;
    font-size: 14px;
    padding:10px 0;
    color:#666;
}
.mask div span{
    line-height: 40px;
    width: 50%;
    display: inline-block;
    font-size: 14px;
    color:#577dbd;
    text-align: center;
    border-top: 1px solid #ddd;
}
.mask div span:nth-of-type(1){
    border-right:1px solid #ddd;
    box-sizing: border-box;
}
@media screen and (max-width:320px){
  .info div p:nth-of-type(1){
    font-size: 14px;
   }
.info div p:nth-of-type(2){
    font-size: 10px;
   }
}
</style>

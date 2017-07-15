<template>
  <div class="wrap">
    <!--<img src="../assets/rgm/bg-huiyuan@2x.png" style="width: 15rem"/>-->
    <div class="bag">
      <div class="card">
        <div class="avatar"><img class="avatar" style="top:0" :src="avatar"></div>
        <div v-if="!isMember">
          <p>季度会员：¥559／季度</p>
          <p>赶快加入吧，尊享会员特权！</p>
        </div>
        <div v-else>
          <p>会员等级：季度会员</p>
          <p>赶快加入吧，尊享会员特权！</p>
        </div>
      </div>
    </div>
    <div class="info">
      <h3>会员特权</h3>
      <div>
        <p>意向学员信息</p>
        <p>优先获取招生线索</p>
      </div>
      <div>
        <p>定制海报招生</p>
        <p>设计师一对一拍照,定制设计</p>
      </div>
      <div>
        <p>专业技能培训</p>
        <p>专业教练技术,提高教学品质</p>
      </div>
      <div>
        <p>多元化收入模式</p>
        <p>为您开启不过包赔险等金融服务</p>
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
  export default{
    name:"ShowMember",
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
  }
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
  .bag{
    position: absolute;
    top:0;
    background: url('../assets/rgm/bg-huiyuan@2x.png');
    background-size: 100% 100%;
    width: 15rem;
    height: 7rem;
  }
  .card{
    background: url('../assets/rgm/mcard.png');
    background-size: 100% 100%;
    width: 14rem;
    margin: 3.5rem 0.5rem 0 0.5rem;
    height: 6rem;

    z-index: 1;
    border-radius: 10px;
    overflow: hidden;
    text-align: center;
    color: #fff;
  }
  .avatar {
    height: 80px;
    width: 80px;
    border-radius: 80px;
    background-color: #fff;
    overflow: hidden;
    position: absolute;
    top: 2.2rem;
    left: 50%;
    margin-left: -40px;
    z-index: 2;
  }
  .bag::after{
    content: '';
    display: inline-block;
    width:45px;
    height:45px;
    background: url('../assets/champion.png') no-repeat center;
    position: absolute;
    right:calc(50% - 65px);
    top:1.4rem;
    background-size:100%;
  }
  .card p:nth-of-type(1){
    text-align: center;
    font-size:0.8rem;
    padding-top: 2.2rem;
    color: #4d4008;
  }
  .card p:nth-of-type(2){
    font-size: 0.6rem;
    padding-top: 0.5rem;
    text-align: center;
    color: #716016;
  }
  .info{
    background: #fff;
    border-radius:4px;
    margin:12px;
    padding:10px 20px;
    box-shadow: 0px 0px 5px #eee;
    margin-top: 9.7rem;
  }
  .info h3{
    text-align: center;
    font-size: 0.6rem;
    color:#666;
    background:url('../assets/rgm/zu.png') no-repeat center;
    background-size: 60%;
  }
  .info div{
    padding-left: 3.5rem;
    margin: 1rem;
  }
  .info div:nth-of-type(1){
    background: url('../assets/rgm/TU1@2x.png') no-repeat;
    background-size: 30px;
    background-position: 20% 50%;
  }
  .info div:nth-of-type(2){
    background: url('../assets/rgm/tu2@2x.png') no-repeat;
    background-size: 30px;
    background-position: 20% 50%;
  }
  .info div:nth-of-type(3){
    background: url('../assets/rgm/tu3@2x.png') no-repeat;
    background-size: 30px;
    background-position: 20% 50%;
  }
  .info div:nth-of-type(4){
    background: url('../assets/rgm/tu4@2x.png') no-repeat;
    background-size: 30px;
    background-position: 20% 50%;
  }
  .info div p:nth-of-type(1){
    color:#8d7b2d;
    font-size: 0.6rem;
  }
  .info div p:nth-of-type(2){
    color:#999;
    font-size: 0.5rem;
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

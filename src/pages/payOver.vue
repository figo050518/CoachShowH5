<template>
  <div style="margin-left: 1.1rem;
    margin-right: 1.1rem;">
    <div style="margin-top: 1.8rem;margin-bottom: 0.5rem;">
      <img src="../assets/WorkDone@3x.png" style="margin: 0 auto; width: 4rem;"/>
      <div style="text-align: center;font-size: 0.65rem;color:#999;margin-top: 1rem">支付成功</div>
    </div>
    <div style="margin:0 2rem;font-size: 0.4rem;color:#999;text-align: center">
      温馨提示:
      投保结构在24小时内,已短信形式发送到你手机,请注意查看
    </div>
    <router-link to="/">
      <div style=" margin-top: 2.5rem;font-size: 0.7rem;color: #ffffff;background: #38b1e0;text-align: center;border-radius: 0.3rem;
    padding: 0.3rem;">完成
      </div>
    </router-link>
  </div>
</template>
<script>
  export default {
    mounted(){
      document.title = "支付成功"
    }
  }
</script>

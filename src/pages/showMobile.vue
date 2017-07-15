<template>
  <div style="margin-top: 3rem;margin-bottom: 0.7rem;">
    <img src="../assets/mobile.png" style="margin: 0 auto; width: 3rem;"/>
    <div style="text-align: center;font-size: 0.8rem;color:#262626;margin-top: 1.5rem">您的手机号: {{phone}}</div>
    <router-link  :to="'/changeMobile/'+phone">
      <div style="margin:1rem 1rem;font-size: 0.7rem;color: #ffffff;background: #38b1e0;text-align: center;    border-radius: 0.2rem;
      padding: 0.3rem;">修改手机号码</div>
    </router-link>
  </div>
</template>
<script>
  export default{
    data() {
      return {
        phone:""
      }
    },
    mounted(){
      this.phone = this.$route.params.phone;
      document.title = '显示手机号';
    }

  }
</script>
<style></style>

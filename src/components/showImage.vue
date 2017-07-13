<template>
  <div class="bac">
    <!--<div style="background: url();background-size: contain"></div>-->
    <img src="http://ose1l6bts.bkt.clouddn.com/1.jpg" width="100%" ref="img" style="position: absolute;top:50%" :style="{ marginTop: top + 'px' }">
  </div>
</template>
<script>
  export default{
    data(){
      return {
        top:''
      }
    },
    mounted(){
      this.top =-(this.$refs.img.height/2);
      console.log(this.top);
    },
    methods:{

    }
  }
</script>
<style scoped>
  .bac {
    z-index: 4000;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.3);
    overflow: hidden;
  }
</style>

<template>
  <div class="bac" v-show="show" @click="cshow">
    <img :src="img" width="100%" ref="img"  style="position: absolute;top:50%"
         :style="{ marginTop: top + 'px' }">
  </div>
</template>
<script>
  export default{
    props: {
      show: {
        type: Boolean,
        default: false
      },
      img: {
        type: String,
        default: ''
      }
    },
    data(){
      return {
        top: ''
      }
    },
    mounted(){
      var _this=this;
      this.$refs.img.onload = function(){
        _this.top = -(this.height / 2);

      }
    },
    methods: {
      cshow:function(){
        this.$emit('changeShow');
      }

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
    background: rgba(0, 0, 0, 1);
    overflow: hidden;
  }
</style>

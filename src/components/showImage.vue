<template>
  <div class="bac" v-show="show" v-touch:tap="cshow" v-touch:long="clong">
    <img :src="img" width="100%" ref="img"  style="position: absolute;top:0"
         :style="{ marginTop: height + 'px' ,top:top}">
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
      },
      bag: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        height: '',
        top:''
      }
    },
    mounted(){
      if(this.bag){
        this.top = '50%';
        this.height = -293
      }
      else{
      var _this=this;
      this.$refs.img.onload = function(){
        _this.height = -(this.height / 2);
        _this.top = '50%'

        }
      }
    },
    methods: {
      cshow:function(){
        var _this = this;
        _this.$emit('changeShow');
      },
      clong:function(){
        console.log('clong-img')
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

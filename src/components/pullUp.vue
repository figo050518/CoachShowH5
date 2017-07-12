<template>
  <div>
    <slot></slot>
    <div v-show="loading" class="bottom">加载中...</div>
  </div>
</template>
<script>
  export default{
    name: 'pullUp',
    props: ['loadPage'],
    data(){
      return{
        timeout:null,
        loading:false
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        window.addEventListener('scroll', this.menu);
      })
    },
    methods: {
      getScrollTop(){
        var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
        if (document.body) {
          bodyScrollTop = document.body.scrollTop;
        }
        if (document.documentElement) {
          documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        return scrollTop;
      },
      getScrollHeight(){
        var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
        if (document.body) {
          bodyScrollHeight = document.body.scrollHeight;
        }
        if (document.documentElement) {
          documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
        return scrollHeight;
      },
      getWindowHeight(){
        var windowHeight = 0;
        if (document.compatMode == "CSS1Compat") {
          windowHeight = document.documentElement.clientHeight;
        } else {
          windowHeight = document.body.clientHeight;
        }
        return windowHeight;
      },
      menu(){

        if (this.getScrollTop() + this.getWindowHeight() == this.getScrollHeight()) {
          //debugger
          this.loading = true;
          console.log(window.timeout)
          clearTimeout(window.timeout);
          //this.loading = false;

          window.timeout = setTimeout(()=>{
              this.$emit('loadpage');
              this.loading = false;
            },1500);

        }
      },
      goPage(){
        this.$emit('loadpage');
      }
    }
  }
</script>
<style scoped>
  .bottom{
    text-align: center;
    padding: 0.4rem;
    font-size: 0.6rem;
    color: #999;
  }
</style>

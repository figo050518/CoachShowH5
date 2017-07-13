<template>
  <div style="background: url('http://ose1l6bts.bkt.clouddn.com/bg2@2x.png');background-size: 100% 100%">
    <!--     <div>
          <img class="avatar" src="../assets/head.jpg">
          <div class="userName">
            <span>心随</span>
            <span>秀值76</span>
          </div>
        </div> -->

    <div class="showSwiper">
      <swiper v-if="swiperSlides[0]" :options="swiperOption">
        <swiper-slide v-for="slide in swiperSlides" :key="slide.id">
          <router-link :to="{ name: 'Detail', params: {id: slide.userId} }"><img :data-src="slide.zipImageUrl" >
          </router-link>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import http from '../utils/api.js'
export default {
  name: 'CoachShow',

 // props: {
   // initData: {
     // required: true,
      //type: Array
    //}
  //},

  data () {
    return {
      coachDataList:this,
      swiperOption: {
        autoplay : 5000,
        autoplayDisableOnInteraction: false,
        loop : true,
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        preloadImages: false,
        lazyLoading: true,
        lazyLoadingInPrevNext: true,
        lazyLoadingInPrevNextAmount: 3,
        coverflow: {
            rotate: 0,      // rotate：slide做3d旋转时Y轴的旋转角度。默认50。
            stretch: 50,   // stretch：每个slide之间的拉伸值，越大slide靠得越紧。 默认0。
            depth: 300,     // depth：slide的位置深度。值越大z轴距离越远，看起来越小。 默认100。
            modifier: 1,    //slideShadows：开启slide阴影。默认 true。
            slideShadows : true
        }
      },
      swiperSlides: []
    }
  },

  //watch: {
    //initData(d) {
      //this.swiperSlides.push(...this.initData.list)
    //}
  //},

  mounted() {
    this.getBanner();
  },
  methods:{
   async getBanner(pageIndex) {
     if(!pageIndex)
        pageIndex=1
       var r = await http.post("userInfo/coachShow" ,{pageIndex:pageIndex,pageSize:10});
       this.swiperSlides.push(...r.data.list)
    }
   }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  image[lazy=loading] {
    background: url('http://ose1l6bts.bkt.clouddn.com/2.jpg ') !important;
    background-size: 100% 100%;
  }
.avatar {
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50px;
}
.userName {
  display: inline-block;
  vertical-align: middle;
  padding-bottom: 25px;
}

.showSwiper {
  width: 100%;
  padding-bottom: 0.32rem;
  padding-top:0.32rem;
}

.swiper-slide {
  text-align: center;
  background: url('http://ose1l6bts.bkt.clouddn.com/2.jpg');
  background-size: 100% 100%;  width: 6.24rem;
  height: 8.8rem;
}

.swiper-slide img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  position: absolute;
  left: 50%;
  top: 50%;
}

.addNewGroup {
  width:60%;
  margin: auto;
}




</style>

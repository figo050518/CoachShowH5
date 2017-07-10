<template>
  <div class="container">
    <mt-header title="我的相册" style="height: 50px; background:#799ff8;">
      <router-link :to="{name: 'Home', params: {tab:2}}" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button slot="right" @click="upLoadImg(0)">上传</mt-button>
    </mt-header>

    <section class="grid">
      <ul class="photo_list">
        <li class="add_btn">
          <form enctype="multipart/form-data" method="post">
            <input type="file" accept="image/jpeg,image/gif,image/png" @change="onFileChange"/>
          </form>
        </li>

        <li v-for="(img, index) in fromServer">
          <img :src="img"/>
        </li>

        <li v-for="(img, index) in thumbImg">
          <img :src="img"/>
        </li>
      </ul>
    </section>

    <section class="big" v-bind:class="{none: !bigFlag}" @click="hideBig">
      <img :style="{background: `url(${thumbImg[bigImgIndex]}) no-repeat center`}"/>
    </section>
  </div>

</template>

<style scoped>
  .container{
    /*background: #F7F8FD;*/
    background: #ddd;
  }
  .grid{
    padding:5%;
    overflow: hidden;
    background: #ddd;
  }
  .add_btn{
    float: left;
    width: 31%;
    height: 5.6rem;
    background: #fff;
    margin-right: 2%;
    position: relative;
  }
  .add_btn:before{
    content: '';
    display: inline-block;
    position: absolute;
    width: 30px;
    height: 4px;
    border-radius: 2px;
    background: #ddd;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translateX(-50%) translateY(-50%);
  }
  .add_btn:after{
    content: '';
    display: inline-block;
    position: absolute;
    width: 4px;
    height: 30px;
    border-radius: 2px;
    background: #ddd;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translateX(-50%) translateY(-50%);
  }
  .add_btn form,.add_btn input{
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .photo_list{
    overflow: hidden;
    width: 100%;
  }
  .photo_list li{
    float: left;
    width: 32%;
    height: 5.6rem;
    background: #fff;
    margin-right: 2%;
    margin-bottom: 2%;
  }
  .photo_list li:nth-child(3n){
    margin-right: 0;
  }
  .photo_list li img{
    width: 100%;
    height: 100%;
  }
  .big{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    margin: 0 auto;
  }
  .big img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    -webkit-transform: translate(-50%,-50%);
    background-size: 100% auto !important;
  }
  .none{
    display: none;
  }
</style>

<script type="text/ecmascript-6">
  import $http from '../utils/api'
  import { Toast } from 'mint-ui';
  export default {
    name: 'Photo',
    data () {
    	return{
        thumbImg: [],//存放blob地址
        resultList: [],//存放base64地址
        fromServer: [],//已经上传过的图片
        allImg: [],
        bigFlag: false,
        bigImgIndex: '',
      }
    },
    methods: {
      async post(url,params,cb){
        let res = await $http.post(url,params,{});
        cb(res);
      },
      hideBig: function(){
      	this.bigFlag = false;
      },
      showBig: function(index){
        this.bigFlag = true;
        this.bigImgIndex = index;
      },
      convertImgDataToBlob: function(base64Data){//将base64的图片信息转为二进制传给接口
        var format = "image/jpeg";
        var base64 = base64Data;
        var code = window.atob(base64.split(",")[1]);
        var aBuffer = new window.ArrayBuffer(code.length);
        var uBuffer = new window.Uint8Array(aBuffer);
        for(var i = 0; i < code.length; i++){
          uBuffer[i] = code.charCodeAt(i) & 0xff ;
        }
        var blob = null;
        try{
          blob = new Blob([uBuffer], {type : format});
        }catch(e){
          window.BlobBuilder = window.BlobBuilder ||
          window.WebKitBlobBuilder ||
          window.MozBlobBuilder ||
          window.MSBlobBuilder;
          if(e.name == 'TypeError' && window.BlobBuilder){
            var bb = new window.BlobBuilder();
            bb.append(uBuffer.buffer);
            blob = bb.getBlob("image/jpeg");
          }
          else if(e.name == "InvalidStateError"){
            blob = new Blob([aBuffer], {type : format});
          }
        }
        return blob;
      },
      onFileChange: function (e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.createImage(files);
//          console.log(files);
        for(var i= 0;i<files.length;i++){
        	this.thumbImg.push(this.createObjUrl(files[i]));
        }
      },
      createObjUrl: function(file){//生成对应的blob地址，相比较于fileReader性能兼容性较佳
        var url = null ;
        if (window.createObjectURL) {
          url = window.createObjectURL(file) ;
        } else if (window.URL) {
          url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL) {
          url = window.webkitURL.createObjectURL(file) ;
        }
        return url ;
      },
      createImage: function(file){
        if(typeof FileReader === 'undefined'){
          Toast({
            message: '您的浏览器不支持图片上传，请升级您的浏览器',
            position: 'middle',
            duration: 2000
          });
          return false;
        }
        for(var i = 0,len = file.length;i< len;i ++){
          var reader = new FileReader();
          reader.readAsDataURL(file[i]);
          reader.onload = (e) =>{
            this.resultList.push(e.target.result);

          };
        }
      },
      commit: function(item,indexFlag,arrLen){
        var formdata = new FormData(document.querySelector("form"));
        formdata.append("file", this.convertImgDataToBlob(this.resultList[item]));
        this.post('uc/addPhoto',formdata,(data) => {
          if(data.code == 1){
            indexFlag++;
            if(indexFlag < arrLen){
              this.commit(indexFlag);
            }else{
              Toast({
                message: '相册上传成功',
                position: 'middle',
                duration: 2000
              });
              setTimeout(function(){
                window.location.reload();
              },2000)
            }
          }else{
            Toast({
              message: '相册上传失败',
              position: 'middle',
              duration: 2000
            });
          }
        })
      },
      upLoadImg: function(i){
        var arrLen = this.resultList.length;
        var indexFlag = 0;
        this.commit(i,indexFlag,arrLen);
      }
    },
    created(){
      this.post('uc/myPhoto',{},(data) => {
        if(data.result){
//        	console.log( data.data)
        	this.fromServer = data.data;
        }
      })
    },
    mounted(){
    	document.getElementsByClassName('container')[0].style.height = window.innerHeight + 'px';//控制背景高
    }
  }
</script>

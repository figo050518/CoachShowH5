<template>
  <div class="container">
    <loading-bar
      :on-error-done="errorDone"
      :on-progress-done="progressDone"
      :progress="progress"
      :direction="direction"
      :error="error" >
    </loading-bar>
    <showImage :show="show" :img="img" v-on:changeShow="changShow"></showImage>
    <section class="grid">
      <ul class="photo_list">
        <li class="add_btn">
          <form enctype="multipart/form-data" method="post">
            <input type="file" accept="image/jpeg,image/gif,image/png" @change="onFileChange"/>
          </form>
        </li>

        <li v-for="(img, index) in fromServer" style="position: relative">
          <div class="deletImage" @click="openDel(img.id,index)">
            <img src="http://ose1l6bts.bkt.clouddn.com/%7B66B14AE0-0E08-C1AD-F034-E54CE3E94C42%7D.png"/>
          </div>
          <img :src="img.imageUrl" @click="cshow(img.imageUrl)"/>
        </li>

        <li v-for="(img, index) in thumbImg" style="position: relative">
          <div class="deletImage" @click="openDel(img.id)"></div>
          <img :src="img.imageUrl"/>
        </li>
      </ul>
    </section>

    <section class="big" v-bind:class="{none: !bigFlag}" @click="hideBig">
      <img :style="{background: `url(${thumbImg[bigImgIndex]}) no-repeat center`}"/>
    </section>
    <mt-popup
      v-model="deleteVisible"
      style="width: 60%;
  border-radius: 8px;
  padding: 10px;"
      :closeOnClickModal="false">
      <div class="page-field">
        <div class="page-part" style="text-align: center;
    margin: 0.5rem;">
          是否确认删除?
        </div>
      </div>
      <div class="page-field" >
        <mt-button size="small" style="float: right" ref='bindPhoneBtn' @click.native="deleteVisible=false" >取消</mt-button>
        <mt-button size="small" style="float: right;margin-right: 0.3rem" ref='bindPhoneBtn' @click="deleteImage" >确定</mt-button>
      </div>
    </mt-popup>
  </div>

</template>

<style scoped>
  .deletImage {
    background-size: 100% 100%;
    background: rgba(255,255,255,0.6);
    width: 0.7rem;
    height: 0.8rem;
    position: absolute;
    right: 0;
    top: 0;
    padding: 0.1rem;
  }

  .container {
    /*background: #F7F8FD;*/
    background: #ddd;
  }

  .grid {
    padding: 5%;
    overflow: hidden;
    background: #ddd;
  }

  .add_btn {
    float: left;
    width: 31%;
    height: 5.6rem;
    background: #fff;
    margin-right: 2%;
    position: relative;
  }

  .add_btn:before {
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

  .add_btn:after {
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

  .add_btn form, .add_btn input {
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .photo_list {
    overflow: hidden;
    width: 100%;
  }

  .photo_list li {
    float: left;
    width: 32%;
    height: 5.6rem;
    background: #fff;
    margin-right: 2%;
    margin-bottom: 2%;
  }

  .photo_list li:nth-child(3n) {
    margin-right: 0;
  }

  .photo_list li img {
    width: 100%;
    height: 100%;
  }

  .big {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    margin: 0 auto;
  }

  .big img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    background-size: 100% auto !important;
  }

  .none {
    display: none;
  }

</style>

<script type="text/ecmascript-6">
  import $http from '../utils/api'
  import { Toast } from 'mint-ui';
  import showImage from '../components/showImage'
  import loadingBar from "vue2-loading-bar" //引入插件

  export default {
    name: 'Photo',
    components:{
      showImage,
      loadingBar
    },
    data () {
      return {
        show:false,
        title:"",
        img:'',
        thumbImg: [],//存放blob地址
        resultList: [],//存放base64地址
        fromServer: [],//已经上传过的图片
        allImg: [],
        bigFlag: false,
        bigImgIndex: '',
        deleteVisible:false,
        id:0,
        index:0,
        error:false,
        direction: 'right',
        progress:0
      }
    },
    methods: {
      async post(url, params, cb){
        let res = await $http.post(url, params, {});
        cb(res);
      },
      errorDone(){
        this.error = false
      },
      progressDone() {
        this.progress = 0
      },
      openDel(id,index){
        this.id = id;
        this.index = index
        this.deleteVisible = true
      },
      changShow:function(){
        this.show = !this.show;
      },
      cshow:function(img){
        this.show = true;
        this.img = img
      },
      hideBig: function () {
        this.bigFlag = false;
      },
      deleteImage :async function(){
        this.deleteVisible = false
        this.fromServer.splice(this.index,1);
        var r = await $http.post('uc/delPhoto',{id:this.id})
      },
      showBig: function (index) {
        this.bigFlag = true;
        this.bigImgIndex = index;
      },
      convertImgDataToBlob: function (base64Data) {//将base64的图片信息转为二进制传给接口
        var format = "image/jpeg";
        var base64 = base64Data;
        var code = window.atob(base64.split(",")[1]);
        var aBuffer = new window.ArrayBuffer(code.length);
        var uBuffer = new window.Uint8Array(aBuffer);
        for (var i = 0; i < code.length; i++) {
          uBuffer[i] = code.charCodeAt(i) & 0xff;
        }
        var blob = null;
        try {
          blob = new Blob([uBuffer], {type: format});
        } catch (e) {
          window.BlobBuilder = window.BlobBuilder ||
            window.WebKitBlobBuilder ||
            window.MozBlobBuilder ||
            window.MSBlobBuilder;
          if (e.name == 'TypeError' && window.BlobBuilder) {
            var bb = new window.BlobBuilder();
            bb.append(uBuffer.buffer);
            blob = bb.getBlob("image/jpeg");
          }
          else if (e.name == "InvalidStateError") {
            blob = new Blob([aBuffer], {type: format});
          }
        }
        return blob;
      },
      onFileChange: async function (e) {
        this.progress = 60;
        var files = e.target.files || e.dataTransfer.files;
        var formdata = new FormData();
        formdata.append('file', files[0]);
        var r = await $http.upload('uc/addPhoto', formdata);
        console.log(r)
        r.data.imageUrl = r.data.url;
        if(r.result){
          this.progress = 100;
        }
        //location.reload();
        //this.createImage(r.data);
//          console.log(files);
//        for (var i = 0; i < files.length; i++) {
          this.fromServer.push(r.data);
//        }
      },
      createObjUrl: function (file) {//生成对应的blob地址，相比较于fileReader性能兼容性较佳
        var url = null;
        if (window.createObjectURL) {
          url = window.createObjectURL(file);
        } else if (window.URL) {
          url = window.URL.createObjectURL(file);
        } else if (window.webkitURL) {
          url = window.webkitURL.createObjectURL(file);
        }
        return url;
      },
      createImage: function (file) {
        if (typeof FileReader === 'undefined') {
          Toast({
            message: '您的浏览器不支持图片上传，请升级您的浏览器',
            position: 'middle',
            duration: 2000
          });
          return false;
        }
        for (var i = 0, len = file.length; i < len; i++) {
          var reader = new FileReader();
          reader.readAsDataURL(file[i]);
          reader.onload = (e) => {
            this.resultList.push(e.target.result);

          };
        }
      },
      commit: function (item, indexFlag, arrLen) {
        var formdata = new FormData(document.querySelector("form"));
        formdata.append("file", this.convertImgDataToBlob(this.resultList[item]));
        this.post('uc/addPhoto', formdata, (data) => {
          if (data.code == 1) {
            indexFlag++;
            if (indexFlag < arrLen) {
              this.commit(indexFlag);
            } else {
              Toast({
                message: '相册上传成功',
                position: 'middle',
                duration: 2000
              });
              setTimeout(function () {
                window.location.reload();
              }, 2000)
            }
          } else {
            Toast({
              message: '相册上传失败',
              position: 'middle',
              duration: 2000
            });
          }
        })
      },
      upLoadImg: function (i) {
        var arrLen = this.resultList.length;
        var indexFlag = 0;
        this.commit(i, indexFlag, arrLen);
      },
      setTitle(){
        document.title = "我的相册";
      }
    },
    created(){
      this.setTitle()
      this.post('uc/myPhoto', {}, (data) => {
        if (data.result) {
//        	console.log( data.data)
          this.fromServer = data.data;
          console.log(this.fromServer);
        }
      })
    },
    mounted(){
      document.getElementsByClassName('container')[0].style.height = window.innerHeight + 'px';//控制背景高
    }
  }
</script>

<template>
  <transition name="h" mode="out-in">
    <div style="padding-top:30px;width:100%;height:100%;">
      <wrapper v-show="toastVisiable">
        <toast :data="name" @close="close"></toast>
      </wrapper>
      <wrapper class="wrapper" v-show="loadingVisiable">
        <load></load>
      </wrapper>
      <mt-header fixed title="首页"></mt-header>
      <div class="banner"></div>
      <div class="qd-wrapper" v-show="!loadingVisiable">
        <div class="qd" @click="getCamera(1)">
          <div class="text">签到</div>
        </div>
        <div class="qt" @click="getCamera(2)">
          <div class="text">签退</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { px2rem, getIPs } from "../utils/utils";
import load from "./common/loading.vue";
import toast from "./common/toast.vue";
import wrapper from "./common/maskWrapper.vue";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      loadingVisiable: false,
      toastVisiable: false,
      name: {
        name: "",
        res: "",
      },
      netType: null
    };
  },
  methods: {
    compressIm(url, filename, type) {
      this.showLoading();
      let name = "_doc/upload/" + filename;
      plus.zip.compressImage(
        {
          src: url,
          dst: name,
          quality: 40,
          overwrite: true
        },
        zip => {
          let fileReader = new plus.io.FileReader();
          fileReader.readAsDataURL(zip.target);
          fileReader.onloadend = e => {
            this.$axios
              .post("sign/multi", {
                imgBase64: e.target.result.toString(),
                type: type
              })
              .then(
                res => {
                  this.hideLoading();
                  if (res.data.status == "201") {
                    this.name.res = "出错了,未识别,请调整角度重试!";
                    this.showToast()
                    return
                  }
                  let data = res.data;
                  let status = data.data[0].status;
                  let name = data.data[0].user_info;
                  this.name.name = name;
                  this.name.res = data.data[0].msg;
                  if (status == "504") {
                    this.name.name = name;
                    this.name.res = "签退成功!";
                  }
                  this.showToast();
                },
                rej => {
                  this.hideLoading();
                  this.name.res = "网络请求发送失败,请检查网络重新试试..";
                  this.showToast();
                }
              );
          };
        },
        //失败回调
        error => {
          this.name.res = "不明因素未成功,请检查重试..";
          this.showToast();
        }
      );
    },
    back() {
      this.hideLoading();
    },
    showToast() {
      this.toastVisiable = true;
    },
    showLoading() {
      this.loadingVisiable = true;
    },
    hideLoading() {
      this.loadingVisiable = false;
    },
    close(data) {
      this.toastVisiable = data;
    },
    getImage(type) {
      let cmr = plus.camera.getCamera();
      cmr.captureImage(
        p => {
          plus.io.resolveLocalFileSystemURL(
            p,
            entry => {
              this.compressIm(entry.toLocalURL(), entry.name, type);
            },
            e => {
              // alert(e);
            }
          );
        },
        e => {},
        {
          filter: "image"
        }
      );
    },
    getCamera(type) {
      if (this.netType != "wifi") {
        this.name.res = "请关闭本软件并清除后台后连接双体系WIFI进行签到!";
        this.showToast();
        return;
      }
      getIPs(ip => {
        this.$axios
          .post("judge/ip", {
            ip: ip
          })
          .then(res => {
            if (res.data.status === 200) {
              this.getImage(type);
            } else if (res.data.status === 201) {
              this.name.res = "请到指定地点签到!";
              this.showToast();
              return
            }
          });
      });
    }
  },
  mounted() {
    this.netType = navigator.connection.type;
  },
  components: {
    load,
    toast,
    wrapper
  }
};
</script>
<style lang="less" scoped>
body {
  background: #fff;
  .mui-content {
    margin-top: 60px;
    background: #fff;
    .mui-grid-view.mui-grid-9 {
      background: #fff;
    }
  }
  .mint-header-title {
    vertical-align: middle;
  }
  .banner {
    width: 98%;
    height: 6rem;
    background: url(../images/bck.png) no-repeat;
    background-size: cover;
    background-position-y: 38%;
  }
  .qd-wrapper {
    margin-top: 1rem;
    .qd,
    .qt {
      width: 90%;
      margin: 0 auto 1.5rem auto;
      height: 2.6rem;
      border-radius: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
    .qd {
      background: url(../images/run1.png) no-repeat 0.5rem 0.6rem skyblue;
      background-size: 1.5rem 1.5rem;
    }
    .qt {
      background: url(../images/run2.png) no-repeat 0.5rem 0.6rem skyblue;
      background-size: 1.5rem 1.5rem;
    }
    .text {
      font-size: 28px;
    }
  }
  .loading {
    position: absolute;
    z-index: 500;
    top: 50%;
    left: 50%;
    margin-left: -0.84rem;
    margin-top: -0.58rem;
    width: 1.68rem;
    height: 1.06rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .wrapper .text {
    position: relative;
    top: 2rem;
    color: #eee;
  }
}
.h-enter,
.h-leave-to {
  // transform: translate3d(-100%, 0, 0);
  opacity: 0;
}
.h-enter-to,
.h-leave {
  // transform: translate3d(0, 0, 0);
  opacity: 1;
}
.h-enter-active,
.h-leave-active {
  transition: all 0.3s linear;
}
</style>

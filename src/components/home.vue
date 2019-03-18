<template>
  <div style="padding-top:40px">
    <div class="loading" v-show="loading">
      <load></load>
    </div>
    <div class="banner">
      <mt-header fixed title="首页"></mt-header>
    </div>
    <div class="qd-wrapper" v-show="!loading">
      <div class="qd" @click="getCamera(1)">
        <img src alt>
        <div class="text">签到</div>
      </div>
      <div class="qt" @click="getCamera(2)">
        <img src alt>
        <div class="text">签退</div>
      </div>
    </div>
  </div>
</template>
<script>
import { px2rem, getIPs } from "../utils/utils";
import load from "./common/loading.vue";
export default {
  data() {
    return {
      loading: false
    };
  },
  methods: {
    getImage(type) {
      var cmr = plus.camera.getCamera();
      cmr.captureImage(
        p => {
          plus.io.resolveLocalFileSystemURL(p, enry => {});
        },
        e => {},
        {
          filter: "image"
        }
      );
    },
    getCamera(type) {
      getIps(ip => {
        this.$axios
          .post("http://132.232.34.11:8080/face/judge/ip", {
            ip: ip
          })
          .then(res => {
            this.getImage(type);
          });
      });
    }
  },
  mounted() {
    console.log(px2rem(63));
    console.log(px2rem(40));
    console.log(px2rem(2));
    console.log(px2rem(3));
    console.log(px2rem(5));
    console.log(px2rem(16));
  },
  components: {
    load
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
  .banner {
    width: 98%;
    height: 6.4rem;
    background: url(../images/bck.png) no-repeat;
    background-size: cover;
    background-position-y: 38%;
    .btn {
      width: 100%;
      height: 100px;
      margin: 1%;
      margin-top: 25px;
    }
  }
  .qd-wrapper {
    .qd,
    .qt {
      width: 80%;
      margin: 0 auto 1rem auto;
      height: 2.6rem;
      border-radius: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 0.9em;
    }
    .qd {
      background: url(../images/run1.png) no-repeat 0.5rem 0.6rem skyblue;
      background-size: 1.5rem 1.5rem;
    }
    .qt {
      background: url(../images/run2.png) no-repeat 0.5rem 0.6rem skyblue;
      background-size: 1.5rem 1.5rem;
    }
  }
  .loading {
    position: absolute;
    z-index: 5;
    top: 50%;
    left: 50%;
    margin-left: -0.84rem;
    margin-top: -0.58rem;
    width: 1.68rem;
    height: 1.06rem;
    // background: pink;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

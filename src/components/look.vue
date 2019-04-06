<template>
  <transition name="h" mode="out-in">
    <div class="content" style="padding-top:40px;padding-bottom:50px">
      <mt-header fixed :title="'查看'"></mt-header>
      <div class="content-wrapper">
        <div class="content" v-for="(item,index) in group" :key="index">
          <router-link :to="'/tableData/'+item.id">
            <span class="mui-icon mui-icon-location"></span>
            <div class="text">{{item.name}}</div>
          </router-link>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "look",
  data() {
    return {
      group: [
        { name: "六期软件", id: "0601" },
        { name: "六期UI", id: "0602" },
        { name: "六期硬件", id: "0603" },
        { name: "七期软件", id: "0701" },
        { name: "七期UI", id: "0702" },
        { name: "七期硬件", id: "0703" },
        { name: "八期软件", id: "0801" },
        { name: "八期UI", id: "0802" },
        { name: "八期硬件", id: "0803" }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
html,
body,.content {
  width: 100%;
  height: 100%;
}
.content{
  display: flex;
  align-items: center;
}
.content-wrapper {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
  .content {
    width: 3rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.3rem 0;
    text-align: center;
    border: 1px solid #eee;
    border-radius: 50%;
    box-shadow: 0.05rem 0.05rem rgba(0, 0, 0, 0.1);
    // background: rgba(48, 117, 247, 0.1);
    .mui-icon {
      font-size: 1rem;
      color: deepskyblue;
      font-weight: 600;
    }
    .text {
      margin-top: 0.2rem;
      color: #000;
    }
  }
}
.h-enter,
.h-leave-to {
  // transform: translate3d(100%, 0, 0);
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
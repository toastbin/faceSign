<template>
  <div class="app">
    <!-- <mt-header fixed title="首页"></mt-header> -->
    <!--  -->
    <!-- table -->
    <router-view></router-view>
    <!-- tabber -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">签到</span>
      </router-link>
      <router-link class="mui-tab-item" to="/look">
        <span class="mui-icon mui-icon-paperplane"></span>
        <span class="mui-tab-label">查看</span>
      </router-link>
    </nav>
  </div>
</template>
<script>
export default {};
document.addEventListener("DOMContentLoaded", () => {
  const html = document.querySelector("html");
  let fontSize = window.innerWidth / 10;
  fontSize = fontSize > 50 ? 50 : fontSize;
  html.style.fontSize = fontSize + "px";
});
</script>
<style lang="less" scoped>
html,
body,
.app {
  width: 100%;
  height: 100%;
}
a:visited,
a,
span {
  text-decoration: none !important;
}
</style>

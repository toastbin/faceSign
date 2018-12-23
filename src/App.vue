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
        <span class="mui-tab-label">首页</span>
      </router-link>
    </nav>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>


// 下拉
</style>

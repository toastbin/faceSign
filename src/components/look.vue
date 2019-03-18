<template>
  <div class="content" style="padding-top:40px;padding-bottom:50px">
    <mt-header fixed :title="'查看'"></mt-header>
    <div class="mui-content">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li
          class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"
          v-for="(item,index) in group"
          :key="index"
        >
          <router-link :to="'/tableData/'+item.id">
            <span class="mui-icon mui-icon-location"></span>
            <div class="mui-media-body">{{item.name}}</div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
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
.content {
  height: 100%;
  margin-top: 100px;
  background: #fff;
}
</style>
<template>
  <div>
    <div class="banner">
      <div class="qd">
        <el-button type="primary" icon="el-icon-edit" class="btn">签到</el-button>
        <el-button type="primary" icon="el-icon-edit" class="btn">签退</el-button>
      </div>
      <div class="qt"></div>
    </div>
    <div class="mui-content">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-for="(item,index) in group" :key="index">
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
  
  data(){
    return {
      group: [
        { name: '六期软件' , id: '0601'  },
        { name: '六期UI' , id: '0602'  },
        { name: '七期软件' , id: '0701'  },
        { name: '七期UI' , id: '0702'  },
        { name: '八期软件' , id: '0801'  },
        { name: '八期UI' , id: '0802'  },
      ]
    }
  },
  methods:{

  },
  mounted(){
    
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
    height: 240px;
    // background: url(../images/bck.png) no-repeat;
    background-size: cover;
    background-position-y: 38%;
    .btn{
      width: 100%;
      height:100px;
      margin: 1%;
      margin-top: 25px;
      // &:nth-child(1){
      //   float: left;
      // }
      // &:nth-child(2){
      //   float:right;
      // }
    }
  }
}

</style>

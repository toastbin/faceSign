#签到系统

###点击跳转到查看签到的表格

1.  将 router-link 改造 <router-link :to="'/tableData/'+item.id">
2.  改造路由 使用冒号 接收 传入的 id 值 { path: '/tableData/:id' , component: tableData }
3.  在 tableData 组件内 用 $route.params接收url内的参数 并拼接axios的url进行请求
    getUrl() {
      this.$axios
      // 用 $route.params.id 获取当前路由
        .get("/group?week=0&group_id="+this.\$route.params.id)
        .then(res => {
          this.tableData = res.data.signItemList;
        });
    },

## test

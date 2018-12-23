// vue-router下面用到了 所以需要导入
import VueRouter  from 'vue-router'
import tableData from './components/tableData.vue'
import home from './components/home.vue'
// 创建 路由对象

const router = new VueRouter({
  routes: [ 
    { path: '/', redirect: '/home' },
    { path: '/home' , component: home },
    // 路由里面:id 的属性传去一个id值
    { path: '/tableData/:id' , component: tableData },
  ],
  linkActiveClass: 'mui-active'
})


// 向外暴露 router模块
export default router
// 签到
//签退
//查看签到

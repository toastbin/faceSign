import Vue from "vue";
import app from "./App.vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import router from "./router.js";
import ElementUi from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "element-ui/lib/theme-chalk/dropdown-menu.css";
Vue.use(ElementUi);
import MintUi from "mint-ui";
import "mint-ui/lib/header/style.css";
Vue.use(MintUi);
import "../lib/mui/css/mui.css";
// 引入axios
import axios from "axios";
// 设置axios请求的根地址
axios.defaults.baseURL = 'http://132.232.34.11:8080/face/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [function (data) {
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
}]

// 使用原型的方式在全局范围内使用axios
Vue.prototype.$axios = axios

// echarts
import echarts from 'echarts'
//
Vue.prototype.$echarts = echarts;

new Vue({
  render: h => h(app),
  router
}).$mount('#app')

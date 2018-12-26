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
import "mint-ui/lib/";
Vue.use(MintUi);
import "../lib/mui/css/mui.min.css";
import "../lib/mui/css/icons-extra.css";
import "bootstrap/dist/css/bootstrap.min.css";
// 引入axios
import axios from "axios";
// 设置axios请求的根地址
axios.defaults.baseURL = 'http://132.232.34.11:8080/face/sel'
// 使用原型的方式在全局范围内使用axios
Vue.prototype.$axios = axios

// echarts
import echarts from 'echarts'
//
Vue.prototype.$echarts = echarts;


Vue.filter('test',function(msg){
  let time;
  if(msg<1){
    time= (msg * 60) + "\'\'"
  }else if(msg >= 1){
    time = parseInt(msg) + "\'" + parseInt((msg-parseInt(msg))*60) + "\'\'"
  }
  return time
})

const vm = new Vue({
  el: "#app",
  data: {
    msg: 123
  },
  methods: {},

  render: h => h(app),
  router,

});

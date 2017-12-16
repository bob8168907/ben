// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Vuex from 'vuex';
import store from './store/index';
import VueToast from 'vue2-toast';
import 'vue2-toast/lib/toast.css';
Vue.use(VueToast, {
  defaultType: 'center'
});

import global_ from './Global.js'
Vue.prototype.$ = global_;

import axios from 'axios';
  

axios.defaults.headers.SysDefined = 'uuid=2340; lang=zh_CN; syscurrencyid=1; autologin=1';
//添加一个请求拦截器
axios.interceptors.request.use(function(config) {
  return config;
}, function(err) {
});

//添加一个响应拦截器
axios.interceptors.response.use(function(res) {
  return res;
}, function(err) {
});
Vue.prototype.$http = axios;

import Router from 'vue-router';
import index from '@/components/index';
import CustomerList from '@/components/customer/list';
Vue.use(Vuex);
Vue.use(Router);
const router = new Router({
  routes: [{
    path: '/',
    component: index
  }, {
    path: '/customer/list',
    component: CustomerList
  }]
});
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
new Vue({
  el: '#app',
  router,
  store: store,
  template: '<App/>',
  components: {
    App
  }
});
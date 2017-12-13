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

import Router from 'vue-router';
import index from '@/components/index';
import CustomerList from '@/components/customer/list';
Vue.use(Vuex);
Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: '/',
      component: index
    },
    {
      path: '/customer/list',
      component: CustomerList
    }
  ]
});

new Vue({
    el: '#app',
    router,
    store: store,
    template: '<App/>',
    components: {App}
})

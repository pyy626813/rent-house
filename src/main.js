import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import Vuex from 'vuex'
import VuexConfig from './vuex'

//项目依赖文件
import lib from './lib';

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(lib)

const store = new Vuex.Store(VuexConfig)

const router = new VueRouter({
  // mode: 'hash',
  //mode: 'history',
  routes
});


router.beforeEach((to, from, next) => {
  document.body.scrollTop = 0;
  //记录上一个入口，作为返回使用
  router.from = from;
  window.$currentPath = to.path;
  next();
});

/*router.afterEach(router => {
});*/

// 取消 Vue 所有的日志与警告。
// Vue.config.silent = true

/* eslint-disable no-new */
new Vue({
  router,
  store
}).$mount('#app')

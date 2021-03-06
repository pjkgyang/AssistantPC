// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '../static/css/base.css'
import axios  from 'axios'
import $ from 'jquery';
import './utils/http.js'
import global from './utils/global.js'
Vue.prototype.globals = global
import './utils/icon/iconfont.css';
import { get , post} from './utils/http'
import API from './utils/api'
import Util from './utils/title';
Vue.prototype.API = API
Vue.prototype.$get = get;
Vue.prototype.$post = post;

// import 'babel-polyfill';
// import es6Promise from "es6-promise";
// es6Promise.polyfill();

import 'bootstrap/dist/css/bootstrap.css';
import 'summernote/dist/summernote.js';
import 'summernote/dist/summernote.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/js/tooltip.js';
import 'bootstrap/js/modal.js';
import 'bootstrap/js/dropdown.js';
import 'summernote/dist/lang/summernote-zh-CN.js';


Vue.use(ElementUI)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // 存储路径
  sessionStorage.setItem("Detailpannel",to.fullPath);
  if(!to.meta.title){
    document.title = '金智教育共创小助手';
  }else{
    document.title = to.meta.title
  }
  // if(JSON.stringify(to.meta) != '{}'){
  //   Util.title(to.meta.title);
  // }
  next();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

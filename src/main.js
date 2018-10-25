// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import App from './App'
import router from './router'

import axios from '@/config/http'
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.statisPoint = (id) => {
  axios.post('getStatistics',{
    button_id: id
  },{
    auth: {
      noLoading: true,
      endNone: true
    }
  })
}
// alert(navigator.userAgent)
// Vue.prototype.screenBrowser = () => {
  
  
// }
// alert(navigator.userAgent)
Vue.prototype.screenBrowser = (function () {
  //微信  facebook chrome 指向顶部右上角    safari 指向底部中间  其他默认  0  默认 1指向右上角  2 指向底部中间
  /*
  微信： micromessenger
  facebook: fban
  chrome: chrome  safari(安卓)  crios safari(iphone)
  safari: safari
  
  */
  let ua = navigator.userAgent.toLocaleLowerCase();
  let brower = 0
  if (ua.indexOf('micromessenger') != -1 || ua.indexOf('fban') != -1 || ((ua.indexOf('safari') != -1) && (ua.indexOf('crios') != -1)) || (ua.indexOf('chrome') != -1) && (ua.indexOf('safari') != -1) && (ua.indexOf('ucbrowser') == -1)) {
    brower = 1
  }
  else if (ua.indexOf('safari') != -1 && ua.indexOf('chrome') == -1) {
    brower = 2
  }
  return brower
})()

Vue.prototype.shareSrc = 'https://www.1888.com.mo/ct_gn/';  //分享的地址

Vue.prototype.shareIndex = function () {
  if (window.sessionStorage.getItem('notShare') != '1') {
    router.push({
      path: '/'
    })
  }
}

// import SocialSharing from 'vue-social-sharing';  //pc斷分享
// Vue.use(SocialSharing)
// import Vue2TouchEvents from 'vue2-touch-events'

// Vue.use(Vue2TouchEvents)
import ba from 'vue-ba'
// Vue.use(ba,'b196fa86f40906c5d43a71c3b67d9dfc')  //測試
Vue.use(ba,'0c67caa9ab1c9a92830eb9c16ad02557')  //正式
import '@/assets/less/reset.css'
import '@/assets/less/tosnpc.less'
import '@/assets/less/tosnphone.less'
import '@/assets/less/wxpc.less'
import '@/assets/less/wxphone.less'
import '@/assets/less/basic.less'
import va from '@/plugin/va.js'
Vue.use(va)
/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

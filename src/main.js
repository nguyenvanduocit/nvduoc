// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import '@/scss/global.scss'
import webfontloader from 'webfontloader'
import {auth} from './services'
Vue.config.productionTip = false
sync(store, router)

auth.checkAuth()

webfontloader.load({
  google: {
    families: ['Noto+Serif:400,700', 'Roboto:400,500:vietnamese,latin']
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

if (('serviceWorker' in navigator) && (process.env.NODE_ENV === 'production')) {
  navigator.serviceWorker
           .register('/service-worker.js')
           .then((reg) => {
             console.log('Service Worker Registered, Scoped is: ' + reg.scope)
           })
}

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import axios from 'axios'
import '@/scss/global.scss'
import webfontloader from 'webfontloader'

Vue.config.productionTip = false
sync(store, router)

axios.defaults.baseURL = 'https://public-api.wordpress.com/rest/v1.1/sites/nguyenvanduocit.wordpress.com/'

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

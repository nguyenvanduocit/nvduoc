import ls from './ls'
import {getJsonFromUrl} from '../utils'
import http from '../services/http'
import store from '../store'
export default {
  checkAuth () {
    return new Promise((resolve, reject) => {
      let accessToken = window.location.hash.substr(1)
      if (accessToken) {
        let authInfo = getJsonFromUrl()
        this.fetchUserData(authInfo).then(user => {
          user.access_token = authInfo.access_token
          this.setLocalUser(user)
          http.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token
          store.commit('user/SET_USER', user)
        }).catch(() => {
          this.setLocalUser(null)
          store.commit('user/SET_USER', {})
        })
      } else {
        this.getLocalUser().then(userData => {
          if (userData === null) {
            this.setLocalUser(null)
            store.commit('user/SET_USER', {})
          } else {
            this.fetchUserData(userData).then(user => {
              user.access_token = userData.access_token
              this.setLocalUser(user)
              http.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token
              store.commit('user/SET_USER', user)
            }).catch(() => {
              this.setLocalUser(null)
              store.commit('user/SET_USER', {})
            })
          }
        })
      }
    })
  },
  fetchUserData (authInfo) {
    return new Promise((resolve, reject) => {
      http.get('https://public-api.wordpress.com/rest/v1/me/', {
        headers: {
          'Authorization': 'Bearer ' + authInfo.access_token
        }
      }).then(user => {
        resolve(user.data)
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },
  logout () {
    ls.removeItem('user')
    store.commit('user/SET_USER', {})
  },
  getLocalUser () {
    return ls.getItem('user')
  },
  setLocalUser (user) {
    return ls.setItem('user', user)
  }
}

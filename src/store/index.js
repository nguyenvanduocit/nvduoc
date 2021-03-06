import Vue from 'vue'
import Vuex from 'vuex'
import http from '../services/http'
import forEach from 'lodash/forEach'
import formatDate from 'date-fns/format'
import user from './user'
import {config} from '../utils'
Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    user
  },
  state: {
    postsPerPage: 10,
    page: 0,
    posts: {},
    canLoadMore: true,
    isLoading: true
  },
  actions: {
    FETCH_POST: ({ commit, state }, slug) => {
      return http.get('posts/slug:' + slug).then(response => {
        commit('SET_LOADING', false)
        commit('SET_POST', response.data)
      }).catch(error => {
        console.log(error.response.data)
      })
    },
    FETCH_POSTS: ({ commit, state }, page) => {
      if (page) {
        commit('SET_PAGE', page)
      } else {
        commit('INCREASE_PAGE')
      }
      commit('SET_LOADING', true)
      let requestPath = 'posts?number=' + state.postsPerPage + '&page=' + state.page + '&fields=ID,date,title,excerpt,slug,content'
      return http.get(requestPath).then(response => {
        commit('SET_LOADING', false)
        if (response.data.found === 0) {
          commit('SET_CAN_LOAD_MORE', false)
        } else {
          commit('SET_POSTS', response.data.posts)
        }
      })
    }
  },
  mutations: {
    SET_POST: (state, post) => {
      post.formatedDate = formatDate(post.date, config.dateFormat)
      Vue.set(state.posts, post.slug, post)
    },
    SET_POSTS: (state, posts) => {
      forEach(posts, post => {
        post.formatedDate = formatDate(post.date, config.dateFormat)
        Vue.set(state.posts, post.slug, post)
      })
    },
    SET_LOADING: (state, isLoading) => {
      state.isLoading = isLoading
    },
    SET_PAGE: (state, page) => {
      state.page = page
    },
    INCREASE_PAGE: (state) => {
      state.page++
    },
    SET_CAN_LOAD_MORE: (state, canLoadMore) => {
      state.canLoadMore = canLoadMore
    }
  },
  getters: {
    posts: state => {
      return state.posts
    },
    isLoading: state => {
      return state.isLoading
    },
    postsPerPage: state => {
      return state.postsPerPage
    },
    canLoadMore: state => {
      return state.canLoadMore
    },
    modalData: state => state.modalData
  }
})

export default store

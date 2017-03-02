import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    postsPerPage: 10,
    page: 0,
    posts: {},
    canLoadMore: true,
    isLoading: true
  },
  actions: {
    FETCH_POSTS: ({ commit, state }, page) => {
      if (page) {
        commit('SET_PAGE', page)
      } else {
        commit('INCREASE_PAGE')
      }
      commit('SET_LOADING', true)
      let requestPath = 'posts?per_page=' + state.postsPerPage + '&page=' + state.page
      if ('caches' in window) {
        let requestedURL = Vue.http.options.root + '/' + requestPath
        /* eslint-disable no-undef */
        caches.match(requestedURL).then((response) => {
          if (response) {
            commit('SET_LOADING', false)
            response.json().then((posts) => {
              if (posts.length === 0) {
                commit('SET_CAN_LOAD_MORE', false)
              } else {
                commit('SET_POSTS', posts)
              }
            })
          }
        })
      }
      Vue.http.get(requestPath).then(response => {
        commit('SET_LOADING', false)
        if (response.body.length === 0) {
          commit('SET_CAN_LOAD_MORE', false)
        } else {
          commit('SET_POSTS', response.body)
        }
      }, response => {
        commit('SET_LOADING', false)
      })
    }
  },
  mutations: {
    SET_POSTS: (state, posts) => {
      posts.forEach(post => {
        if (post) {
          let modifiedDate = new Date(post.modified)
          post.formattedModified = modifiedDate.getDay() + '/' + modifiedDate.getMonth() + '/' + modifiedDate.getFullYear()
          // avoid auto key sort, A buggy featured of chrome
          Vue.set(state.posts, post.slug, post)
        }
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
    }
  }
})

export default store

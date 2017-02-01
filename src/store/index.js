import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    postsPerPage: 10,
    page: 1,
    posts: {},
    canLoadMore: true,
    isLoading: true
  },
  actions: {
    FETCH_POSTS: ({ commit, state }) => {
      commit('SET_LOADING', true)
      Vue.http.get('posts?per_page=' + state.postsPerPage + '&page=' + state.page).then(response => {
        commit('SET_LOADING', false)
        if (response.body.length === 0) {
          commit('SET_CAN_LOAD_MORE', false)
        } else {
          commit('SET_POSTS', response.body)
          commit('INCREASE_PAGE')
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
          Vue.set(state.posts, '_' + post.slug, post)
        }
      })
    },
    SET_LOADING: (state, isLoading) => {
      state.isLoading = isLoading
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

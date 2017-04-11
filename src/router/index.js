import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const HomePage = resolve => {
  // require.ensure is Webpack's special syntax for a code-split point.
  require.ensure(['@/components/pages/home.vue'], () => {
    resolve(require('@/components/pages/home.vue'))
  })
}

const SingularPage = resolve => {
  // require.ensure is Webpack's special syntax for a code-split point.
  require.ensure(['@/components/pages/singular.vue'], () => {
    resolve(require('@/components/pages/singular.vue'))
  })
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/:page(\\d+)?',
      component: HomePage
    },
    {
      path: '/posts/:slug',
      component: SingularPage,
      meta: {
        scrollToTop: true
      }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      // savedPosition is only available for popstate navigations.
      return savedPosition
    } else {
      const position = {}
      // new navigation.
      // scroll to anchor by returning the selector
      if (to.hash) {
        position.selector = to.hash
      }
      // check if any matched route config has meta that requires scrolling to top
      if (to.matched.some(m => m.meta.scrollToTop)) {
        // cords will be used if no selector is provided,
        // or if the selector didn't match any element.
        position.x = 0
        position.y = 0
      }
      // if the returned position is falsy or an empty object,
      // will retain current scroll position.
      return position
    }
  }
})

<template>
  <div id="app">
    <site-header></site-header>
    <router-view></router-view>
    <site-footer></site-footer>
  </div>
</template>

<script>
import SiteHeader from './components/shared/site-header.vue'
import SiteFooter from './components/shared/site-footer.vue'
export default {
  name: 'app',
  components: {
    SiteHeader,
    SiteFooter
  }
}
</script>
<style lang="scss">
  #app{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    .top{
      flex: 1;
    }
  }
</style>

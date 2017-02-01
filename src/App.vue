<template>
  <div id="app" :class="{loading: $store.getters.isLoading}">
    <div class="top">
      <site-header></site-header>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
    <site-footer></site-footer>
  </div>
</template>

<script>
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import WebFont from 'webfontloader'

WebFont.load({
  google: {
    families: ['Lora:400,700:vietnamese', 'Roboto:400,500,600,700:vietnamese']
  }
})

export default {
  name: 'app',
  components: {
    SiteHeader,
    SiteFooter
  }
}
</script>

<style lang="scss">
@import "./assets/scss/global";
#app{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  .top{
    flex: 1;
  }
}
</style>

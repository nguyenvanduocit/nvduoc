<template>
  <header class="site-header">
    <div class="container">
      <nav class="inner">
        <router-link class="site-brand" to="/" exact>Nguyễn Văn Được</router-link>
        <span class="tagline">Mãi mãi xin được làm hạt bụi, Nơi dấu chân Phật cất bước đi qua.</span>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped lang="scss">;
  @import "../../scss/global.import";
  .site-header{
    border-bottom: 1px solid rgba(74, 82, 95, 0.1);
    .inner{
      display: flex;
      align-items: center;
      justify-content: space-between;
      @include media-breakpoint-down('sm'){
        flex-direction: column;
      }
      .tagline{
        font-size: 13px;
        @include media-breakpoint-down('sm'){
          font-size: 11px;
          padding-bottom: 20px;
          text-align: center;
        }
      }
      .site-brand{
        display: block;
        padding: 20px 0;
        text-decoration: none;
        font-family: $font__heading;
        color: $color__primary;
        font-size: 20px;
        font-weight: 400;
        text-transform: uppercase;
        @include media-breakpoint-down('sm'){
          padding-bottom: 10px;
        }
      }
    }
  }
</style>

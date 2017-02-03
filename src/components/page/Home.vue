<template>
  <div class="page-home">
    <div class="container">
      <post-list :posts="$store.getters.posts"></post-list>
      <div class="load-more-container">
        <div v-show="!$store.getters.isLoading" class="load-more" @click.prevent="loadMore">Load more</div>
        <div v-show="$store.getters.isLoading" class="loading-more">Loading...</div>
      </div>
    </div>
  </div>
</template>
<script>
import PostList from './../PostList.vue'
export default {
  components: {
    PostList
  },
  beforeMount  () {
    if (Object.keys(this.$store.getters.posts).length === 0) {
      this.$store.dispatch('FETCH_POSTS', this.$route.params.page)
    }
  },
  methods: {
    loadMore () {
      if (!this.$store.getters.isLoading && this.$store.getters.canLoadMore) {
        this.$store.dispatch('FETCH_POSTS')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./../../assets/scss/variables";
.page-home{
  .load-more-container{
    text-align: center;
    .loading-more, .load-more{
      display: inline-block;
      text-align: center;
      margin-bottom: 48px;
      font-family: "Lora", serif;
      font-size: 17px;
      font-weight: 400;
      color: $color__primary;
      text-decoration: none;
      border-bottom: 1px dotted $color__primary;
      -webkit-transition: all 0.3s;
      -moz-transition: all 0.3s;
      transition: all 0.3s;
    }
    .load-more{
      cursor: pointer;
    }
    .loading-more{
      cursor: wait;
    }
  }
}
</style>

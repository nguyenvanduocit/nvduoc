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
  import PostList from './../shared/post-list.vue'
  export default {
    components: {
      PostList
    },
    created  () {
      if (Object.keys(this.$store.getters.posts).length < this.$store.getters.postsPerPage) {
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
	@import "../../scss/global.import";
	.page-home{
	}
</style>

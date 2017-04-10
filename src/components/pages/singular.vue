<template>
	<article class="single-post post">
		<div class="container">
			<div v-if="error" class="error">{{ error }}</div>
			<template v-if="currentPost">
				<header class="header">
					<h1 class="title"><router-link :to="{ path: '/post/' + currentPost.slug}" v-html="currentPost.title"></router-link></h1>
					<time v-text="currentPost.formatedDate"></time>
				</header>
				<div class="content" v-if="currentPost.content" v-html="currentPost.content"></div>
				<div class="content" v-else v-html="currentPost.excerpt"></div>
				<comment-section></comment-section>
			</template>
		</div>
	</article>
</template>
<script>
  import CommentSection from './singular/comment-section.vue'
  export default {
    components: {CommentSection},
    data () {
      return {
        loading: false,
        slug: '',
        error: null
      }
    },
    created () {
      this.$store.dispatch('FETCH_POST', this.$route.params.slug)
    },
    computed: {
      currentPost () {
        if (this.$store.getters.posts.hasOwnProperty(this.$route.params.slug)) {
          return this.$store.getters.posts[this.$route.params.slug]
        }
        return false
      }
    }
  }
</script>
<style lang="scss" scoped>
    .single-post{
        margin-bottom: 60px;
    }
</style>

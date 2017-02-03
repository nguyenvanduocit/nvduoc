<template>
  <article class="single-post post">
    <div class="container">
      <div v-if="error" class="error">
        {{ error }}
      </div>
      <template v-if="post">
        <header class="header">
          <h1 class="title"><router-link :to="{ path: '/post/' + post.slug}" v-html="post.title.rendered"></router-link></h1>
          <time v-text="post.formattedModified"></time>
        </header>
        <div class="content" v-html="post.content.rendered"></div>
      </template>
    </div>
  </article>
</template>
<script>
export default {
  data () {
    return {
      post: null,
      loading: false,
      error: null
    }
  },
  beforeMount () {
    let key = '_' + this.$route.params.slug
    if (this.$store.getters.posts.hasOwnProperty(key)) {
      this.post = this.$store.getters.posts[key]
    } else {
      // GET /someUrl
      this.loading = true
      this.$http.get('posts?slug=' + this.$route.params.slug).then(response => {
        this.loading = false
        if (response.body.length > 0) {
          this.post = response.body[0]
          let modifiedDate = new Date(this.post.modified)
          this.post.formattedModified = modifiedDate.getDay() + '/' + modifiedDate.getMonth() + '/' + modifiedDate.getFullYear()
        }
      }, response => {
        this.loading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .single-post{
    margin-bottom: 60px;
  }
</style>

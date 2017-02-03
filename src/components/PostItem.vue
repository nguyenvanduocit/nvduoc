<template>
  <article class="post-item post">
    <header class="header">
      <h1 class="title"><router-link :to="{ path: '/post/' + post.slug}" v-html="post.title.rendered"></router-link></h1>
      <time v-text="post.formattedModified"></time>
    </header>
    <div class="excerpt" v-html="post.excerpt.rendered"></div>
    <footer class="footer">
      <p>
        <router-link class="read-more" :to="{ path: '/post/' + post.slug}">Xem tiếp</router-link>
      </p>
    </footer>
  </article>
</template>
<script>
export default {
  props: ['post']
}
</script>
<style lang="scss" scoped>
  @import "./../assets/scss/variables";
  @import "./../assets/scss/mixins/mixins-master";
  .post-item{
    margin: 80px 0 80px 0;
    @include media-breakpoint-down('sm'){
      margin: 50px 0 50px 0;
    }
    .footer{
      p{
        margin-top: 5px;
      }
    }
  }
</style>

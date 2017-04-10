<template>
  <div class="post-list">
    <post-item v-for="post in posts" :key="post.id" :post="post"></post-item>
  </div>
</template>
<script>
import PostItem from './post-item.vue'
export default {
  components: {
    PostItem
  },
  props: ['posts']
}
</script>

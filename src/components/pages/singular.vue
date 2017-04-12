<template>
    <article class="single-post post">
        <div class="container">
            <template v-if="currentPost">
                <header class="header">
                    <h1 class="title"><router-link :to="{ path: '/posts/' + currentPost.slug}" v-html="currentPost.title"></router-link></h1>
                    <time v-text="currentPost.formatedDate"></time>
                </header>
                <div class="content" v-if="currentPost.content" v-html="currentPost.content" @mouseup.prevent="showTooltop($event)"></div>
                <div class="content" v-else v-html="currentPost.excerpt"></div>
                <comment-section :postId="currentPost.ID"></comment-section>
            </template>
        </div>
        <report-panel v-show="showReportBar" @done="showReportBar = false" :postId="currentPost.ID" :message="reportMessage"></report-panel>
    </article>
</template>
<script>
  import CommentSection from './singular/comment-section.vue'
  import ReportPanel from '../shared/report-panel.vue'
  export default {
    components: {
      CommentSection,
      ReportPanel
    },
    data () {
      return {
        loading: false,
        slug: '',
        showReportBar: false,
        reportMessage: ''
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
    },
    methods: {
      getSelectedText () {
        if (window.getSelection) {
          return window.getSelection().toString()
        } else if (document.selection && document.selection.type !== 'Control') {
          return document.selection.createRange().text
        }
      },
      showTooltop (event) {
        let selectedText = this.getSelectedText()
        if (selectedText !== '') {
          this.reportMessage = '"' + selectedText + '" should be: '
          this.showReportBar = true
        } else {
          this.showReportBar = false
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
    .single-post{
        margin-bottom: 60px;
        .header{
            margin-bottom: 50px;
        }
    }
</style>

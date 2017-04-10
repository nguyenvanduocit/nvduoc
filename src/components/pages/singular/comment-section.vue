<template>
    <section class="comment-section">
        <div class="header">
            <h1 class="title">Bình luận</h1>
        </div>
        <user-info></user-info>
        <comment-form v-if="isLoggedIn" @submitComment="submitComment"></comment-form>
        <login-panel v-else=""></login-panel>
        <div class="body">
            <div v-if="comments" class="comment-list">
                <comment v-for="comment in threads" :key="comment.ID" :comment="comment" :comments="childComments"></comment>
            </div>
        </div>
    </section>
</template>
<script>
    import http from '../../../services/http'
    import map from 'lodash/map'
    import filter from 'lodash/filter'
    import formatDate from 'date-fns/format'
    import {config} from '../../../utils'
    import Comment from './comment.vue'
    import CommentForm from './comment-form.vue'
    import LoginPanel from '../../shared/login-pannel.vue'
    import UserInfo from './user-info.vue'
    import {mapGetters} from 'vuex'
    import pubsub from '../../../services/pubsub'
    export default{
      components: {
        Comment,
        CommentForm,
        LoginPanel,
        UserInfo
      },
      data () {
        return {
          comments: {}
        }
      },
      props: ['postId'],
      created () {
        http.get('posts/' + this.postId + '/replies?number=100&fields=ID,date,author,parent,content,post').then(response => {
          if (response.data.found > 0) {
            this.comments = map(response.data.comments, (comment) => {
              comment.formatedDate = formatDate(comment.date, config.dateFormat)
              return comment
            })
          }
        }).catch(error => {
          console.log(error)
        })
      },
      computed: {
        ...mapGetters({ isLoggedIn: 'user/isLoggedIn' }),
        threads () {
          return filter(this.comments, comment => comment.parent === false)
        },
        childComments () {
          return filter(this.comments, comment => comment.parent !== false)
        }
      },
      methods: {
        submitComment (message) {
          pubsub.$emit('show-modal', {message: 'Đang lưu ...', blocking: true, hideCloseButton: true})
          http.post('/posts/' + this.postId + '/replies/new/', {
            content: message
          }).then(() => {
            pubsub.$emit('show-modal', {message: 'Cảm ơn vì đã chia sẻ suy nghĩ của bạn. Bình luận của bạn đã được lưu vào cơ sở dữ liệu, mình sẽ sớm duyệt nó. Cảm ơn bạn!', icon: 'success'})
          }).catch(error => {
            pubsub.$emit('show-modal', {message: error.response.data.message, icon: 'error'})
          })
        }
      }
    }
</script>
<style lang="scss" scoped>
    @import "../../../scss/global.import";
    .comment-section{
        margin-top: 50px;
        border-top: 1px solid rgba(74, 82, 95, 0.1);

        .header{
            margin-top: 50px;
            .title{
                margin-top: 0;
                margin-bottom: 50px;
                @include font-size(25);
                font-family: $font__heading;
            }
        }
    }
</style>

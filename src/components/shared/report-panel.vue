<template>
    <section class="report-panel">
        <div class="container">
            <div v-if="isLoggedIn" class="report-panel-inner">
                <input @change="onReportMessageChanged" :value="message" type="text">
                <a href="#" class="btn btn-submit" @click.prevent="submit">Send Feedback</a>
                <a href="#" class="btn btn-cancel" @click.prevent="$emit('done')">Cancel</a>
            </div>
            <div v-else="" class="login-holder">
                <login-panel text="Login to send feedback."></login-panel>
            </div>
        </div>
    </section>
</template>
<script>
    import pubsub from '../../services/pubsub'
    import http from '../../services/http'
    import LoginPanel from './login-pannel.vue'
    import {mapGetters} from 'vuex'
    export default{
      components: {
        LoginPanel
      },
      props: ['message', 'postId'],
      data () {
        return {
          reportMessage: ''
        }
      },
      computed: {
        ...mapGetters({ isLoggedIn: 'user/isLoggedIn' })
      },
      methods: {
        onReportMessageChanged (event) {
          this.reportMessage = event.target.value
        },
        submit () {
          pubsub.$emit('show-modal', {message: 'Thank you! Your feedback is saving...', blocking: true})
          http.post('/posts/' + this.postId + '/replies/new/', {
            content: this.reportMessage
          }).then((response) => {
            console.log(response)
            pubsub.$emit('show-modal', {message: 'Your feedback is saved. Thank you so much!', icon: 'success'})
          }).catch(error => {
            pubsub.$emit('show-modal', {message: error.response.data.message})
          })
          this.$emit('done')
        }
      }
    }
</script>
<style lang="scss" scoped>
    @import "../../scss/global.import";
    .report-panel{
        position: fixed;
        background: $color__body_background;
        box-shadow: 0 -8px 46px rgba(0,0,0,.08), 0 2px 6px rgba(0,0,0,.03);
        padding: 0 20px;
        left:0;
        bottom: 0;
        right: 0;
        .report-panel-inner{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: wrap;
            @include media-breakpoint-down('sm'){
                justify-content: center;
            }
            input{
                border-radius: 40px;
                flex-grow: 1;
                padding-top: 10px;
                padding-bottom: 10px;
                flex-shrink: 0;
                margin-top: 20px;
                margin-bottom: 20px;
            }
            .btn{
                margin-left: 25px;
                padding-left: 25px;
                padding-right: 25px;
                flex-shrink: 0;
                margin-top: 20px;
                margin-bottom: 20px;
                @include media-breakpoint-down('md'){
                    margin-top: 0;
                    border-radius: 40px !important;
                    margin-left: 0;
                }
            }
            .btn-submit{
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
            }
            .btn-cancel{
                margin-left: 0;
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
            }
        }
        .login-holder{
            text-align: center;
            padding: 20px 0;
        }
    }
</style>

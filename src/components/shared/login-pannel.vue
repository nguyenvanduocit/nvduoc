<template>
    <div class="login-pannel">
        <a class="btn" :href="loginUrl" v-text="text"></a>
    </div>
</template>
<script>
    import {config} from '../../utils'
    export default {
      props: {
        text: {
          type: String,
          default: 'Login With WordPress.com'
        }
      },
      computed: {
        loginUrl () {
          return 'https://public-api.wordpress.com/oauth2/authorize?client_id=' + config.client_id + '&redirect_uri=' + encodeURI(window.location.href) + '&response_type=token&blog=' + config.blog + '&scope=auth'
        }
      }
    }
</script>
<style lang="scss" scoped>
    .login-pannel{
        display: flex;
        justify-content: center;
        align-items: center;
        .btn{
            margin: 0;
        }
    }
</style>

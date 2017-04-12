<template>
    <section class="user-info">
        <p class="display-name">Xin chào <span v-if="isLoggedIn">{{user.display_name}} (<a href="#" @click.prevent="logout">logout</a>)</span>. Bạn nghĩ gì về những điều mình vừa chia sẻ?. Hãy bình luận ở dưới đây nhé.</p>
    </section>
</template>
<script>
    import auth from '../../../services/auth'
    import {mapGetters} from 'vuex'
    export default {
      methods: {
        logout () {
          auth.logout()
        }
      },
      computed: {
        ...mapGetters({user: 'user/user', isLoggedIn: 'user/isLoggedIn'})
      }
    }
</script>
<style lang="scss" scoped="">
    @import "../../../scss/_global.import";
    .user-info {
        margin-bottom: 20px;
        p{
            @include font-size(14);
            line-height: 25px;
            font-weight: 400;
        }
    }
</style>

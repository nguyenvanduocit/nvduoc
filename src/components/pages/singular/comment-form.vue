<template>
    <div class="comment-form">
        <textarea @click.prevent="isEditing = true" :class="{active: isEditing}" v-model="message" rows="7" placeholder="Bình luận của bạn..."></textarea>
        <button v-show="message !== ''" class="btn" @click.prevent="$emit('submitComment', message)">Gửi bình luận</button>
    </div>
</template>
<script>
    export default{
      data () {
        return {
          message: '',
          isEditing: false
        }
      }
    }
</script>
<style lang="scss" scoped="">
    @import "../../../scss/global.import";
    .comment-form{
        textarea{
            width: 100%;
            height: 55px;
            border-radius: 40px;
            &.active{
                border-radius: 5px;
                height: 200px;
            }
        }
    }
</style>

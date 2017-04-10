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
            border: 1px solid rgba(74, 82, 95, 0.1);
            width: 100%;
            padding: 15px 20px;
            height: 55px;
            transition: height .3s ease-in-out;
            &.active{
                height: 200px;
            }
            @include font-size(16);
            @include hover-focus-active(){
                outline: none;
            }
        }
    }
</style>

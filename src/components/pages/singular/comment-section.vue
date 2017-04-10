<template>
    <section class="comment-section">
        <div class="header">
            <h1 class="title">Bình luận</h1>
        </div>
        <div class="body">
            <div class="comment-list">
                <comment></comment>
                <comment></comment>
                <comment></comment>
                <comment></comment>
            </div>
        </div>
    </section>
</template>
<script>
    import Comment from './comment.vue'
    export default{
      components: {
        Comment
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
                margin-bottom: 30px;
                @include font-size(25);
                font-family: $font__heading;
            }
        }
    }
</style>

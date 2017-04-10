<template>
    <div class="comment">
        <div class="header">
            <img class="avatar" :src="comment.author.avatar_URL" alt="">
            <div class="meta">
                <h2 class="name">{{comment.author.first_name}} {{comment.author.last_name}}</h2>
                <time v-text="comment.formatedDate"></time>
            </div>
        </div>
        <div class="content" v-html="comment.content"></div>
        <div v-if="childComments.length > 0" class="child-comment" >
            <comment v-for="comment in childComments" :key="comment.ID" :comment="comment" :comments="comments"></comment>
        </div>
    </div>
</template>
<script>
    import filter from 'lodash/filter'
    export default{
      name: 'comment',
      props: ['comment', 'comments'],
      computed: {
        childComments () {
          return filter(this.comments, comment => comment.parent.ID === this.comment.ID)
        }
      }
    }
</script>
<style lang="scss" scoped="">
    @import "../../../scss/global.import";
    .comment{
        border-top: 1px dashed rgba(74, 82, 95, 0.1);
        margin-top: 30px;
        padding-top: 30px;
        .header{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .avatar{
                border-radius: 50%;
                width: 40px;
                height: 40px;
            }
            .meta{
                margin: 0 0 0 20px;
                .name{
                    margin: 0;
                    font-family: $font__primary;
                    font-weight: 400;
                    @include font-size(18);
                }
                time{
                    font-weight: 400;
                    text-transform: none;
                    @include font-size(12);
                }
            }
        }
        .child-comment{
            padding-left: 30px;
        }
    }
</style>

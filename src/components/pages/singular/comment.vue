<template>
    <div class="comment">
        <h2 class="name">Nguyễn Văn A</h2>
        <div class="content">
            <p>Cảm ơn bạn, bài viết rất là hay</p>
        </div>
    </div>
</template>
<style lang="scss" scoped="">
    @import "../../../scss/global.import";
    .comment{
        & + .comment{
            border-top: 1px dashed rgba(74, 82, 95, 0.1);
            margin-top: 25px;
            padding-top: 25px;
        }
        .name{
            margin: 0;
            font-family: $font__primary;
            font-weight: bold;
            @include font-size(18);
        }
        .content{
            p{
                margin-top: 15px;
            }
        }
    }
</style>

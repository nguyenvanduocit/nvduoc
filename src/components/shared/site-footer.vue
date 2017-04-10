<template>
  <footer class="site-footer">
    <div class="container">
      <div class="inner">
        <div class="copy">&copy; 2017 Nguyễn Văn Được </div>
        <div class="connect">
          <span>Mãi mãi xin là ngọn gió nâng dậy cành hoa nơi bước chân Người</span>
        </div>
      </div>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
@import "../../scss/global.import";
.site-footer{
  border-top: 1px solid rgba(74, 82, 95, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 0;
  color: $color__primary;
  .inner{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .connect{
    ul{
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }
}
</style>

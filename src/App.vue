<template>
  <div id="app">
    <site-header></site-header>
    <router-view></router-view>
    <site-footer></site-footer>
    <sweet-modal ref="modal" :icon="modalData.icon" :blocking="modalData.blocking" :hide-close-button="modalData.hideCloseButton" overlay-theme="dark"><span slot="default" v-html="modalData.message"></span></sweet-modal>
  </div>
</template>

<script>
import SiteHeader from './components/shared/site-header.vue'
import SiteFooter from './components/shared/site-footer.vue'
import { SweetModal } from 'sweet-modal-vue'
import pubsub from './services/pubsub'
export default {
  name: 'app',
  components: {
    SiteHeader,
    SiteFooter,
    SweetModal
  },
  data () {
    return {
      modalData: {
        icon: '',
        blocking: false,
        message: '',
        hideCloseButton: false
      }
    }
  },
  mounted () {
    pubsub.$on('show-modal', this.showModal)
  },
  methods: {
    showModal (modalData) {
      this.modalData.icon = modalData.icon ? modalData.icon : ''
      this.modalData.blocking = modalData.blocking ? modalData.blocking : false
      this.modalData.message = modalData.message ? modalData.message : ''
      this.modalData.hideCloseButton = modalData.hideCloseButton ? modalData.hideCloseButton : false
      this.$refs.modal.open()
    }
  }
}
</script>
<style lang="scss">
  #app{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    .top{
      flex: 1;
    }
  }
</style>

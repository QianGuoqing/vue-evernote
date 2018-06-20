<template>
  <div id="app">
    <sider-bar></sider-bar>
    <router-view/>
  </div>
</template>

<script>
  import SiderBar from './components/SiderBar.vue'
  import { getDataByGet } from './common/js/request.js'
  import { API_AUTH } from './common/js/apis.js'
  import { mapState } from 'vuex'
  export default {
    name: 'App',
    components: {
      SiderBar
    },
    computed: {
      ...mapState(['isLogin'])
    },
    created() {
      getDataByGet(API_AUTH).then(res => {
        res = res.data
        this.$store.commit('changeIsLogin', res.isLogin)
      })
    }
  }
</script>

<style lang="stylus">
  html, body, #app
    height 100%
</style>

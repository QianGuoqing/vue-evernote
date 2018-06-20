<template>
  <div id="app">
    <sider-bar></sider-bar>
    <router-view/>
  </div>
</template>

<script>
  import SiderBar from './components/SiderBar.vue'
  export default {
    name: 'App',
    components: {
      SiderBar
    }
  }
</script>

<style lang="stylus">
  html, body, #app
    height 100%
</style>

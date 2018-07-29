<template>
  <div id="app">
    <sider-bar></sider-bar>
    <vue-particles
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
        class="particles"
      >
      </vue-particles>
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
      let { noteId, notebookId } = this.$route.query
      this.$store.commit('setNoteId', noteId)
      this.$store.commit('setNotebookId', notebookId)
    }
  }
</script>

<style lang="stylus">
  html, body, #app
    height 100%
  
  .particles
    z-index -100
    position absolute
    left 0
    top 0
    bottom 0
    right 0
</style>

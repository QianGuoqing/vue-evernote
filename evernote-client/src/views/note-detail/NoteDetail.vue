<template>
  <div class="notebook-detail">
    <note-sidebar></note-sidebar>
    <p>
      笔记id: {{ $route.query.noteId }}
    </p>
    <p>
      笔记本id: {{ $route.query.notebookId }}
    </p>
  </div>
</template>

<script>
  import NoteSidebar from '../../components/NoteSidebar.vue'
  import { getDataByGet } from '../../common/js/request.js'
  import { API_AUTH } from '../../common/js/apis.js'
  export default {
    name: 'NotebookDetail',
    components: {
      NoteSidebar
    },
    created() {
      getDataByGet(API_AUTH).then(res => {
        res = res.data
        if (!res.isLogin) {
          this.$Message.error('没有权限-请先登录')
          this.$router.push({
            path: '/login'
          })
        }
      })
    }
  }
</script>

<style lang="stylus" scoped>
  .notebook-detail
    height 100%
    margin-left 100px
    display flex
    align-items stretch
</style>
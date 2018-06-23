<template>
  <div class="notebook-detail">
    <p>
      笔记id: {{ $route.query.noteId }}
    </p>
    <p>
      笔记本id: {{ $route.query.notebookId }}
    </p>
  </div>
</template>

<script>
  import { getDataByGet } from '../../common/js/request.js'
  import { API_AUTH } from '../../common/js/apis.js'
  export default {
    name: 'NotebookDetail',
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
    margin-left 100px
</style>
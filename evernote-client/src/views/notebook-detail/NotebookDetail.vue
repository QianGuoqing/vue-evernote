<template>
  <div class="notebook-detail">
    笔记详情页
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

</style>
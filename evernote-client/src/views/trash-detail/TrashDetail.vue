<template>
  <div class="trash-detail">
    回收站
  </div>
</template>

<script>
  import { getDataByGet } from '../../common/js/request.js'
  import { API_AUTH } from '../../common/js/apis.js'
  export default {
    name: 'TrashDetail',
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
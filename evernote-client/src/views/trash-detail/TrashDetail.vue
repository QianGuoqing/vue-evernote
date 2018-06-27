<template>
  <div class="trash-detail-wrapper">
    <trash-sidebar></trash-sidebar>
    <div class="trash-detail">
      <div class="trash-header">
        <div class="date-related">
          <Alert class="date-banner" type="success">
            <span class="create-time">创建时间: </span>
            <span class="update-time">更新时间: </span>
          </Alert>
        </div>
        <div class="operation">
          <Button type="error" size="small">
            <Icon type="play"></Icon>
            彻底删除
          </Button>
          <Button type="success" size="small">
            <Icon type="paper-airplane"></Icon>
            恢复
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TrashSidebar from '../../components/TrashSidebar.vue'
  import { getDataByGet } from '../../common/js/request.js'
  import { API_AUTH } from '../../common/js/apis.js'

  export default {
    name: 'TrashDetail',
    components: {
      TrashSidebar
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
  @import '../../common/stylus/variables.styl';
  .trash-detail-wrapper
    width 100%
    height 100%
    display flex
    align-items stretch
    overflow hidden
    .trash-detail
      flex 1
      height 100%
      .trash-header
        display flex
        justify-content space-between
        align-items center
        padding 10px 20px
        border-bottom 1px solid $line-color
        font-size 14px
        .date-banner
          position relative
          top 5px
          .update-time
            margin-left 10px
          .note-status
            margin-left 10px
</style>
<template>
  <div class="home">
    <Table class="info-table" border stripe :columns="tableColumn" :data="tableData"></Table>
  </div>
</template>

<script>
  import { getDataByGet } from '../common/js/request.js'
  import { API_AUTH } from '../common/js/apis.js'
  import { getFullDate } from '../common/js/util.js'
  import { mapState } from 'vuex'
  export default {
    name: 'Home',
    created() {
      getDataByGet(API_AUTH).then(res => {
        res = res.data
        if (!res.isLogin) {
          this.$Message.error('没有权限-请先登录')
          this.$router.push({
            path: '/login'
          })
        } else {
          this.$store.commit('setUsername', res.data.username)
        }
      })
      this._getAuth()
    },
    data() {
      return {
        tableColumn: [
          {
            title: '信息',
            key: 'information'
          },
          {
            title: '详情',
            key: 'detail'
          }
        ],
        tableData: []
      }
    },
    computed: {
      ...mapState(['user'])
    },
    methods: {
      _getAuth() {
        this.tableData = [
          {
            information: '账户类型',
            detail: '云笔记免费账户'
          },
          {
            information: '用户名',
            detail: this.user.username
          },
          {
            information: '创建时间',
            detail: getFullDate(this.user.createdAt)
          },
          {
            information: '更新时间',
            detail: getFullDate(this.user.updatedAt)
          },
          {
            information: '设备',
            detail: '网页端访问云笔记'
          }
        ]
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .home >>> .ivu-table-cell
    font-weight 700
    font-size 14px
  .home
    margin-left 100px
    // .info-table
    //   margin 30px
</style>
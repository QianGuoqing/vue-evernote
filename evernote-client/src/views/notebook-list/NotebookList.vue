<template>
  <div class="notebook-list">
    <div class="operation-banner">
      <Button @click="addNewNotebook" icon="plus" type="ghost">新建笔记本</Button>
    </div>
    <div class="notebook-list-wrapper">
      <Alert class="note-label">笔记本列表 (<span class="list-count">{{ notebookTotal }}</span>)</Alert>
      <ul class="note-list">
        <li class="note-item" v-for="notebook in notebooksList" :key="notebook.id">
          <div class="icon-name">
            <Icon type="ios-paper" />
            <span class="note-title">{{ notebook.title }}</span>
            <span class="note-count">{{ notebook.noteCounts }}</span>
          </div>
          <div class="date-operation">
            <span class="date">{{ _formateData(notebook.createdAt) }}</span>
            <Button size="small" @click="doDeleteNotebook(notebook.id)" class="note-delete" type="error">删除</Button>
            <Button size="small" class="note-edit" type="success">编辑</Button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { getDataByGet, getNotebooks, addNotebook, deleteNotebook } from '../../common/js/request.js'
  import { API_AUTH } from '../../common/js/apis.js'
  import { friendlyDate } from '../../common/js/util.js'
  export default {
    name: 'NotebookList',
    created() {
      getDataByGet(API_AUTH).then(res => {
        res = res.data
        if (!res.isLogin) {
          this.$Message.error('没有权限-请先登录')
          this.$router.push({
            path: '/login'
          })
        }
      }),
      this._getNotebookList()
    },
    data() {
      return {
        notebooksList: [],
        notebookTotal: 0
      }
    },
    methods: {
      addNewNotebook() {
        addNotebook('测试笔记本aaa').then(res => {
          res = res.data
          this.$Message.success(res.msg)
          this._getNotebookList()
          console.log('add notebook', res)
        }).catch(err => {
          console.log('add notebook', err)
        })
      },
      doDeleteNotebook(id) {
        deleteNotebook(id).then(res => {
          res = res.data
          this.$Message.success(res.msg)
          this._getNotebookList()
          console.log('delete notebook', res)
        }).catch(err => {
          this.$Message.error('删除笔记本失败')
          console.log('delete notebook', err)
        })
      },
      _formateData(dateStr) {
        return friendlyDate(dateStr)
      },
      _getNotebookList() {
        getNotebooks().then(res => {
          res = res.data
          this.notebooksList = res.data
          this.notebooksList.sort((a, b) => a.createdAt < b.createdAt)
          this.notebookTotal = this.notebooksList.length
          console.log('notebook list', this.notebooksList)
        }).catch(err => {
          console.log(err)
        })
      }
    },
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/variables.styl';
  .notebook-list
    height 100%
    margin-left 100px
    background-color $notebook-bg
    .operation-banner
      border-bottom 1px solid $line-color
      padding 15px
    .notebook-list-wrapper
      width 85%
      margin 20px auto
      .note-label
        font-size 14px
        .list-count
          font-weight 700
      .note-list
        font-size 13px
        background-color #fff
        padding 0 15px
        border 1px solid $theme-color
        border-radius 4px
        margin-top 20px
        .note-item
          display flex
          justify-content space-between
          align-items center
          border-bottom 1px solid $line-color
          padding 15px 0
          cursor pointer
          transition all .3s
          &:hover
            color $theme-text-color
          &:last-child
            border-bottom none
          .icon-name
            .note-title
              font-weight 700
            .note-count
              margin-left 10px
              color $date-color
              font-weight 600
          .date-operation
            display flex
            align-items center
            .date
              color $date-color
              margin-right 10px
            .note-delete
              margin-right 10px
</style>
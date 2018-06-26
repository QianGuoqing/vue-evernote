<template>
  <div class="notebook-list">
    <div class="operation-banner">
      <Button @click="showAddNotebookModal" icon="plus" type="ghost">新建笔记本</Button>
      <Modal
        v-model="addNewNotebookModal"
        title="输入笔记本标题"
        @on-ok="addNewNotebookOk"
        @on-cancel="addNewNotebookCancel">
        <Input v-model="newNotebookTitle" icon="ios-paper"></Input>
      </Modal>
    </div>
    <div class="notebook-list-wrapper">
      <Alert class="note-label">笔记本列表 (<span class="list-count">{{ notebookTotal }}</span>)</Alert>
      <ul class="note-list">
        <li @click="changeIDinState(notebook.id)" class="note-item" v-for="notebook in notebooksList" :key="notebook.id">
          <div class="icon-name">
            <Icon type="ios-paper" />
            <span class="note-title">{{ notebook.title }}</span>
            <span class="note-count">{{ notebook.noteCounts }}</span>
          </div>
          <div class="date-operation">
            <span class="date">{{ _formateData(notebook.createdAt) }}</span>
            <Button size="small" @click.stop.prevent="doDeleteNotebook(notebook.id)" class="note-delete" type="error">删除</Button>
            <Button size="small" @click.stop.prevent="showEditNotebookModal(notebook)" class="note-edit" type="success">编辑</Button>
            <Modal
              v-model="editNotebookModal"
              title="输入笔记本标题"
              @on-ok="editNotebookOk"
              @on-cancel="editNotebookCancel">
              <Input v-model="editNotebookTitle" icon="ios-paper"></Input>
            </Modal>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {
    getDataByGet,
    getNotebooks,
    addNotebook,
    deleteNotebook,
    updateNotebook
  } from '../../common/js/request.js'
  import {
    API_AUTH
  } from '../../common/js/apis.js'
  import {
    friendlyDate
  } from '../../common/js/util.js'
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
        notebookTotal: 0,
        addNewNotebookModal: false,
        editNotebookModal: false,
        newNotebookTitle: '',
        editNotebookTitle: '',
        editId: ''
      }
    },
    methods: {
      changeIDinState(notebookId) {
        console.log('changeIDinState');
        this.$store.commit('setNotebookId', notebookId)
        this.$store.commit('setNoteId', 1)
        this.$store.commit('setCurrentNote', {})
        this.$router.push({
          path: `/note?notebookId=${notebookId}&noteId=1`
        })
      },
      showAddNotebookModal() {
        this.addNewNotebookModal = true
      },
      addNewNotebookOk() {
        addNotebook(this.newNotebookTitle).then(res => {
          res = res.data
          this.$Message.success(res.msg)
          this._getNotebookList()
          console.log('add notebook', res)
        }).catch(err => {
          console.log('add notebook', err)
        })
      },
      addNewNotebookCancel() {
        this.$Message.error('取消新建笔记本')
      },
      showEditNotebookModal(notebook) {
        this.editId = notebook.id
        this.editNotebookTitle = notebook.title
        this.editNotebookModal = true
      },
      editNotebookOk() {
        updateNotebook(this.editId, this.editNotebookTitle).then(res => {
          res = res.data
          this.$Message.success(res.msg)
          this._getNotebookList()
          console.log('update notebook', res)
        }).catch(err => {
          this.$Message.error('更新笔记本失败')
          console.log('delete notebook', err)
        })
      },
      editNotebookCancel() {
        this.$Message.error('取消编辑笔记本')
      },
      doDeleteNotebook(id) {
        this.$Modal.confirm({
          title: 'Title',
          content: '确定要删除此笔记本吗？',
          onOk: () => {
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
          onCancel: () => {
            this.$Message.info('取消删除')
          }
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
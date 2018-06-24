<template>
  <div class="note-sidebar">
    <div class="note-header">
      <Dropdown style="margin-left: 20px">
        <a href="javascript:void(0)">
          {{ currentNotebook.title }}
          <Icon type="arrow-down-b"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem v-for="notebook in notebooks" :key="notebook.id">
            <span @click="doGetNote(notebook.id)">{{ notebook.title }}</span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Button class="add-note-btn" type="ghost" size="small">添加笔记</Button>
    </div>
    <div class="note-tab">
      <div class="update-time-tab">更新时间</div>
      <div class="title-tab">标题</div>
    </div>
    <ul class="note-list">
      <router-link :to="`/note?noteId=${note.id}&notebookId=${currentNotebook.id}`" class="note-item" v-for="note in notes" :key="note.id">
        <div class="note-update-time">{{ _formateDate(note.updatedAt) }}</div>
        <div class="note-title">{{ note.title }}</div>
      </router-link>
    </ul>
  </div>
</template>

<script>
  import { getNotebooks, getNote } from '../common/js/request.js'
  import { friendlyDate } from '../common/js/util.js'
  export default {
    name: 'NoteSiderbar',
    created() {
      this._getNotebooks()
    },
    data() {
      return {
        notebooks: [],
        notes: [],
        currentNotebook: {}
      }
    },
    methods: {
      doGetNote(notebookId) {
        this._getNote(notebookId)
        this.currentNotebook = this.notebooks.find(notebook => notebook.id == notebookId)
      },
      _getNote(notebookId) {
        getNote(notebookId).then(res => {
          res = res.data
          this.notes = res.data
          if (this.notes.length === 0) {
            this.$Message.info('该笔记本下暂无笔记')
          }
          console.log('note sidebar get note', this.notes)
        }).catch(err => {
          this.$Message.error('获取笔记失败')
        })
      },
      _getNotebooks() {
        getNotebooks().then(res => {
          res = res.data
          this.notebooks = res.data
          this.notebooks.sort((a, b) => a.createdAt < b.createdAt)
          if (!this.$route.query.notebookId) {
            this.currentNotebook = this.notebooks[0]
            console.log(this.currentNotebook);
            this._getNote(this.currentNotebook.id)
          } else {
            this.currentNotebook = this.notebooks.find(notebook => notebook.id == this.$route.query.notebookId)
            this._getNote(this.currentNotebook.id)
          }
          console.log('note sidebar notebooklist', this.notebooks)
        }).catch(err => {
          this.$Message.error('获取笔记本失败')
        })
      },
      _formateDate(dateStr) {
        return friendlyDate(dateStr)
      }
    },
  }
</script>

<style lang="stylus" scoped>
  @import '../common/stylus/variables.styl';
  .note-sidebar
    width 300px
    height 100%
    background-color $notebook-bg
    margin-left 100px
    .note-header
      text-align center
      padding 15px 0
      border-bottom 1px solid $line-color
      position relative
      .add-note-btn
        position absolute
        right 5px
        top 12px
    .note-tab
      display flex
      font-size 14px
      border-bottom 1px solid $line-color
      .update-time-tab, .title-tab
        padding 10px
        flex 1
      .update-time-tab
        border-right 1px solid $line-color
    .note-list
      font-size 13px
      .note-item
        display flex
        padding 10px
        border-bottom 1px solid $line-color
        cursor pointer
        transition all .3s
        &:hover
          background-color $theme-color
          color #fff
        .note-update-time, .note-title
          flex 1
        .note-title
          padding-left 20px
</style>
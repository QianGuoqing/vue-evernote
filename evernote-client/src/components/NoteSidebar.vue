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
          <DropdownItem>
            <span @click="toTrash">废纸篓</span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Button @click="addNoteTitleModal = true" class="add-note-btn" type="ghost" size="small">添加笔记</Button>
      <Modal
        v-model="addNoteTitleModal"
        title="输入新建笔记标题"
        @on-ok="doAddNote"
        @on-cancel="cancel">
        <Input v-model="newNoteTitle" icon="ios-list-outline" placeholder="输入笔记标题"></Input>
      </Modal>
    </div>
    <div class="note-tab">
      <div class="update-time-tab">更新时间</div>
      <div class="title-tab">标题</div>
    </div>
    <ul class="note-list">
      <li @click="doRouterNoteCurrentNotebook(currentNotebook.id, note.id, index)" :class="{ 'note-item-active': index === liIndex }" class="note-item" v-for="(note, index) in allNotes" :key="note.id">
        <div class="note-update-time">{{ _formateDate(note.updatedAt) }}</div>
        <div class="note-title">{{ note.title }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { getNotebooks, getNote, addNote } from '../common/js/request.js'
  import { friendlyDate } from '../common/js/util.js'
  import { mapState } from 'vuex'
  export default {
    name: 'NoteSiderbar',
    created() {
      this._getNotebooks()
    },
    data() {
      return {
        notebooks: [],
        notes: [],
        currentNotebook: {},
        currentNote: {},
        liIndex: -1,
        addNoteTitleModal: false,
        newNoteTitle: ''
      }
    },
    computed: {
      ...mapState([
        'allNotes'
      ])
    },
    methods: {
      toTrash() {
        this.$router.push({
          path: '/trash'
        })
      },
      doAddNote() {
        addNote(this.$route.query.notebookId, this.newNoteTitle, '').then(res => {
          res = res.data
          console.log(res)
          this.$Message.success(res.msg)
          this._getNote(this.$route.query.notebookId)
        }).catch(err => {
          this.$Message.error('添加笔记失败')
        })
      },
      cancel() {
        this.$Message.info('取消新建笔记')
      },
      doRouterNoteCurrentNotebook(notebookId, noteId, index) {
        this.liIndex = index
        this.$store.commit('setNotebookId', notebookId)
        this.$store.commit('setNoteId', noteId)
        this.$router.push({
          path: `/note?noteId=${noteId}&notebookId=${notebookId}`
        })
        this.currentNote = this.notes.find(note => note.id == this.$store.state.noteId) || {}
        this.$store.commit('setCurrentNote', this.currentNote)
        console.log('note siderbar get note', this.currentNote) 
      },
      doGetNote(notebookId) {
        this._getNote(notebookId)
        this.currentNotebook = this.notebooks.find(notebook => notebook.id == notebookId)
        this.$store.commit('setCurrentNote', {})
        this.$router.push({
          path: `/note?notebookId=${notebookId}`
        })
      },
      _getNote(notebookId) {
        getNote(notebookId).then(res => {
          res = res.data
          this.notes = res.data
          this.notes.sort((a, b) => a.updatedAt < b.updatedAt)
          this.$store.commit('setAllNotes', this.notes)
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
    border-right 1px solid $line-color
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
        &.note-item-active
          background-color $theme-color
          color #fff
        &:hover
          background-color $theme-color
          color #fff
        .note-update-time, .note-title
          flex 1
        .note-title
          padding-left 20px
</style>
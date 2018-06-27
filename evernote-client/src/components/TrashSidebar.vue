<template>
  <div class="trash-sidebar">
    <div class="trash-header">
      废纸篓
    </div>
    <div class="trash-tab">
      <div class="update-time-tab">更新时间</div>
      <div class="title-tab">标题</div>
    </div>
    <ul class="trash-list">
      <li @click="doRouterTrash(note)" class="trash-item" v-for="note in notes" :key="note.id">
        <div class="trash-update-time">{{ _formateDate(note.updatedAt) }}</div>
        <div class="trash-title">{{ note.title }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { getTrash, getNote } from '../common/js/request.js'
  import { friendlyDate } from '../common/js/util.js'
  export default {
    name: 'TrashSiderbar',
    created() {
      this._getTrashNotes()
    },
    data() {
      return {
        notes: [],
        chooseTrashNote: {}
      }
    },
    methods: {
      doRouterTrash(note) {
        let noteId = note.id
        let notebookId = note.notebookId
        this.notes.forEach((note, index) => {
          if (note.id == noteId) {
            this.chooseTrashNote = this.notes[index]
          }
        })
        console.log('chooseTrashNote', this.chooseTrashNote)
        this.$store.commit('setTrashNote', this.chooseTrashNote)
        this.$router.push({
          path: `/trash?noteId=${note.id}`
        })
      },
      _getTrashNotes() {
        getTrash().then(res => {
          res = res.data
          this.notes = res.data
          this.notes.sort((a, b) => a.updatedAt > b.updatedAt)
          console.log('get trash', this.notes)
        }).catch(err => {
          this.$Message.error('获取废纸篓数据失败')
          console.log('get trash', err)
        })
      },
      // _getNote(notebookId, noteId) {
      //   getNote(notebookId).then(res => {
      //     res = res.data
      //     this.nNotes = res.data
      //     this.chooseTrashNote = this.nNotes.find(note => note.id == noteId)
      //     console.log('chooseTrashNote', this.chooseTrashNote, this.nNotes)
      //   }).catch(err => {
      //     this.$Message.error('获取笔记失败 in Trash Sidebar')
      //   })
      // },
      _formateDate(dateStr) {
        return friendlyDate(dateStr)
      }
    },
  }
</script>

<style lang="stylus" scoped>
  @import '../common/stylus/variables.styl';
  .trash-sidebar
    width 300px
    height 100%
    background-color $notebook-bg
    margin-left 100px
    .trash-header
      text-align center
      padding 15px 0
      border-bottom 1px solid $line-color
      position relative
    .trash-tab
      display flex
      font-size 14px
      border-bottom 1px solid $line-color
      .update-time-tab, .title-tab
        padding 10px
        flex 1
      .update-time-tab
        border-right 1px solid $line-color
    .trash-list
      font-size 13px
      .trash-item
        display flex
        padding 10px
        border-bottom 1px solid $line-color
        cursor pointer
        transition all .3s
        &:hover
          background-color $theme-color
          color #fff
        .trash-update-time, .trash-title
          flex 1
        .trash-title
          padding-left 20px
</style>
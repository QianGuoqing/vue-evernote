<template>
  <div class="notebook-detail">
    <note-sidebar></note-sidebar>
    <div class="choose-note" v-if="!currentNote.id">
      选择左侧笔记
    </div>
    <div v-else class="note-detail">
      <div class="note-header">
        <div class="search-related">
          <!-- <Input placeholder="搜索笔记..." style="width: 100%"></Input> -->
        </div>
        <div class="operation">
          <Button @click="doUpdateNote(currentNote)" type="primary" size="small">
            <Icon type="play"></Icon>
            保存
          </Button>
          <Button :disabled="!isRichText" @click="changeEditMarkdown" type="success" size="small">
            <span v-if="!isEdit">
              <Icon type="paper-airplane"></Icon>
              转Markdown
            </span>
            <span v-else>
              <Icon type="edit"></Icon>
              使用Markdown编辑
            </span>
          </Button>
          <Button :disabled="!isEdit" @click="changeEditRich" type="success" size="small">
            <span v-if="!isRichText">
              <Icon type="paper-airplane"></Icon>
              转富文本
            </span>
            <span v-else>
              <Icon type="edit"></Icon>
              使用富文本编辑
            </span>
          </Button>
          <Button @click="doDeleteNote" type="error" size="small">
            <Icon type="trash-b"></Icon>
            删除
          </Button>
        </div>
      </div>
      <div class="note-content">
        <div class="date-related">
          <Alert banner class="date-banner" type="success">
            <span class="create-time">创建时间: {{ _formateDate(currentNote.createdAt) }} ({{ _fullDate(currentNote.createdAt) }})</span>
            <span class="update-time">更新时间: {{ _formateDate(currentNote.updatedAt) }} ({{ _fullDate(currentNote.updatedAt) }})</span>
            <span class="note-status">状态: {{ statusText }}</span>
          </Alert>
        </div>
        <div class="note-title">
          <input :disabled="isEdit" type="text" v-model:value="currentNote.title" class="title-input" placeholder="输入笔记标题">
        </div>
        <div class="note-editor">
          <note-editor  v-if="!isRichText"></note-editor>
          <textarea v-if="!isEdit" class="editor-content" placeholder="输入笔记内容" v-model:value="currentNote.content"></textarea>
          <div class="note-content" v-html="editText2Html" v-else></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NoteSidebar from '../../components/NoteSidebar.vue'
  import NoteEditor from './NoteEditor.vue'
  import { getDataByGet, getNote, updateNote, deleteNote } from '../../common/js/request.js'
  import { API_AUTH } from '../../common/js/apis.js'
  import { friendlyDate, getFullDate } from '../../common/js/util.js'
  import { mapState } from 'vuex'
  import MarkdownIt from 'markdown-it'

  let md = new MarkdownIt()

  export default {
    name: 'NotebookDetail',
    components: {
      NoteSidebar,
      NoteEditor
    },
    created() {
      getDataByGet(API_AUTH).then(res => {
        res = res.data
        if (!res.isLogin) {
          this.$Message.error('没有权限-请先登录')
          this.$router.push({
            path: '/login'
          })
        } else {
          this.$store.commit('setUser', res.data)
          this.$store.commit('setUsername', res.data.username)
        }
      })
      this.$store.commit('setCurrentNote', {})
    },
    data() {
      return {
        isEdit: true,
        statusText: '已完成',
        isRichText: true,
        editorContent: ''
      }
    },
    computed: {
      ...mapState([
        'currentNote',
        'allNotes'
      ]),
      editText2Html() {
        if (this.isEdit) {
          return md.render(this.currentNote.content)
        } else if (this.isRichText) {
          let html = this.$store.state.richText
          return html
        }
      }
    },
    methods: {
      _formateDate(dateStr) {
        return friendlyDate(dateStr)
      },
      _fullDate(dateStr) {
        return getFullDate(dateStr)
      },
      changeEditMarkdown() {
        this.isEdit = !this.isEdit
        if (!this.isEdit) {
          this.statusText = '编辑中'
        } else {
          this.statusText = '已完成'
        }
      },
      changeEditRich() {
        this.isRichText = !this.isRichText
        if (!this.isRichText) {
          this.statusText = '编辑中'
        } else {
          this.statusText = '已完成'
        }
      },
      doUpdateNote(note) {
        this.$Loading.start()
        updateNote(note.id, note.title, note.content).then(res => {
          res = res.data
          this.$Message.success(res.msg)
          this.statusText = '已保存'
          this.$Loading.finish()
        }).catch(err => {
          this.$Message.error('保存失败')
        })
      },
      doDeleteNote() {
        deleteNote(this.$route.query.noteId).then(res => {
          res = res.data
          let tempNotes = [...this.allNotes]
          let iIndex = -1
          tempNotes.forEach((item, index) => {
            if (item.id == this.$route.query.noteId) {
              iIndex = index
            }
          })
          tempNotes.splice(iIndex, 1)
          this.$store.commit('setAllNotes', tempNotes)
          this.$Message.success(res.msg)
          this.$router.push({
            path: `/note?notebookId=${this.$route.query.notebookId}`
          })
        }).catch(err => {
          this.$Message.error('删除笔记失败')
        })
      }
    },
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/variables.styl';
  .notebook-detail
    width 100%
    height 100%
    display flex
    align-items stretch
    // overflow hidden
    .choose-note
      font-size 40px
      text-align center
      padding 20px
    .note-detail
      flex 1
      height 100%
      .note-header
        display flex
        justify-content space-between
        align-items center
        padding 10px 20px
        border-bottom 1px solid $line-color
        font-size 14px
        .search-related
          width 40%
      .note-content
        height 100%
        .date-related
          .update-time
            margin-left 10px
          .note-status
            margin-left 10px
        .note-title
          .title-input
            width 100%
            padding 10px 20px
            font-size 18px
            font-weight 700
            outline none
            border none
        .note-editor
          height 100%
          .editor-content
            width 100%
            height 75%
            padding 20px
            font-size 14px
            color #333
            border 1px dotted $theme-color
            outline none
            line-height 20px
            resize none
          .note-content
            padding 20px
            line-height 20px
</style>
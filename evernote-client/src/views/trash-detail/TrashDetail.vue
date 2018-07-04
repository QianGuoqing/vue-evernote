<template>
  <div class="trash-detail-wrapper">
    <trash-sidebar></trash-sidebar>
    <div class="trash-detail">
      <div class="trash-header" v-if="trashNote.id">
        <div class="date-related">
          <Alert class="date-banner" type="success">
            <span class="create-time">创建时间: {{ _formatDate(trashNote.createdAt) }} ({{ _getFullDate(trashNote.createdAt) }})</span>
            <span class="update-time">更新时间: {{ _formatDate(trashNote.updatedAt) }} ({{ _getFullDate(trashNote.updatedAt) }})</span>
          </Alert>
        </div>
        <div class="operation">
          <Button @click="deleteCompleteModal = true" type="error" size="small">
            <Icon type="play"></Icon>
            彻底删除
          </Button>
          <Modal
            v-model="deleteCompleteModal"
            title="彻底删除笔记"
            @on-ok="deleteNoteCompletely"
            @on-cancel="cancel">
            <p>选择是否彻底删除笔记(彻底删除后无法恢复)?</p>
          </Modal>
          <Button @click="recoverNote" type="success" size="small">
            <Icon type="paper-airplane"></Icon>
            恢复
          </Button>
        </div>
      </div>
      <div class="choose-note" v-else>选择左侧笔记</div>
      <div class="trash-content">
        <div class="trash-title">{{ trashNote.title }}</div>
        <div class="trash-content" v-html="markdownContent"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import TrashSidebar from '../../components/TrashSidebar.vue'
  import { getDataByGet, revertNote, deleteTrash } from '../../common/js/request.js'
  import { API_AUTH } from '../../common/js/apis.js'
  import { friendlyDate, getFullDate } from '../../common/js/util.js'
  import { mapState } from 'vuex'
  import MarkdownIt from 'markdown-it'

  let md = new MarkdownIt()

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
        } else {
          this.$store.commit('setUser', res.data)
        }
      })
      this.$store.commit('setTrashNote', {})
    },
    data() {
      return {
        deleteCompleteModal: false
      }
    },  
    computed: {
      ...mapState([
        'trashNote',
        'allTrashNotes'
        ]),
      markdownContent() {
        if (!this.trashNote.content)
          return ''
        return md.render(this.trashNote.content)
      }
    },
    methods: {
      recoverNote() {
        let noteId = this.$route.query.noteId
        if (noteId) {
          revertNote(noteId).then(res => {
            res = res.data
            this.$Message.success(res.msg)
            console.log(res)
            let tempTrashNotes = [...this.allTrashNotes]
            let iIndex = 0
            tempTrashNotes.forEach((note, index) => {
              if (note.id == noteId) {
                iIndex = index
              }
            })
            tempTrashNotes.splice(iIndex, 1)
            this.$store.commit('setAllTrashNotes', tempTrashNotes)
            this.$store.commit('setTrashNote', {})
            this.$router.push({
              path: '/trash'
            })
          }).catch(err => {
            this.$Message.error('笔记恢复失败')
          })
        } else {
          this.$Message.error('请选择左侧笔记后操作')
        }
      },
      deleteNoteCompletely() {
        let noteId = this.$route.query.noteId
        if (noteId) {
          deleteTrash(noteId).then(res => {
            res = res.data
            this.$Message.success(res.msg)
            console.log(res)
            let tempTrashNotes = [...this.allTrashNotes]
            let iIndex = 0
            tempTrashNotes.forEach((note, index) => {
              if (note.id == noteId) {
                iIndex = index
              }
            })
            tempTrashNotes.splice(iIndex, 1)
            this.$store.commit('setAllTrashNotes', tempTrashNotes)
            this.$store.commit('setTrashNote', {})
            this.$router.push({
              path: '/trash'
            })
          }).catch(err => {
            this.$Message.error('彻底删除笔记本失败')
          })
        } else {
          this.$Message.error('请选择左侧笔记后操作')
        }
      },
      cancel() {
        this.$Message.info('取消操作')
      },
      _formatDate(dateStr) {
        return friendlyDate(dateStr)
      },
      _getFullDate(dateStr) {
        return getFullDate(dateStr)
      }
    },
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
      .choose-note
        font-size 40px
        padding 20px
      .trash-content
        padding 20px
        .trash-title
          font-size 18px
          font-weight 700
          color #000
</style>
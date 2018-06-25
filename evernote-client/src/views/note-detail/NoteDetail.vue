<template>
  <div class="notebook-detail">
    <note-sidebar></note-sidebar>
    <div class="choose-note" v-if="!currentNote.id">
      选择左侧笔记
    </div>
    <div v-else class="note-detail">
      <div class="note-header">
        <div class="date-related">
          <Alert class="date-banner" type="success">
            <span class="create-time">创建时间: {{ _formateDate(currentNote.createdAt) }}</span>
            <span class="update-time">更新时间: {{ _formateDate(currentNote.updatedAt) }}</span>
            <span class="note-status">已保存</span>
          </Alert>
        </div>
        <div class="operation">
          <Button type="primary" size="small">
            <Icon type="play"></Icon>
            保存
          </Button>
          <Button type="success" size="small">
            <Icon type="paper-airplane"></Icon>
            To Markdown
          </Button>
          <Button type="error" size="small">
            <Icon type="trash-b"></Icon>
            删除
          </Button>
        </div>
      </div>
      <div class="note-content">
        <div class="note-title">
          <input type="text" :value="currentNote.title" class="title-input" placeholder="输入笔记标题">
        </div>
        <div class="note-editor">
          <textarea v-if="true" class="editor-content" placeholder="输入笔记内容" :value="currentNote.content"></textarea>
          <div class="note-content" v-else></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NoteSidebar from '../../components/NoteSidebar.vue'
  import { getDataByGet, getNote } from '../../common/js/request.js'
  import { API_AUTH } from '../../common/js/apis.js'
  import { friendlyDate } from '../../common/js/util.js'
  import { mapState } from 'vuex'
  export default {
    name: 'NotebookDetail',
    components: {
      NoteSidebar
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
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapState(['currentNote'])
    },
    methods: {
      _formateDate(dateStr) {
        return friendlyDate(dateStr)
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
    overflow hidden
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
        .date-banner
          position relative
          top 5px
          .update-time
            margin-left 20px
          .note-status
            margin-left 20px
      .note-content
        height 100%
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
            height 80%
            padding 20px
            font-size 14px
            color #333
            border none
            outline none
</style>
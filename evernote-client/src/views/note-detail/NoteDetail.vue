<template>
  <div class="notebook-detail">
    <note-sidebar></note-sidebar>
    <div class="note-detail">
      <div class="note-header">
        <div class="date-related">
          <Alert class="date-banner" type="success">
            <span class="create-time">创建时间: {{ currentNote.createdAtFriendly }}</span>
            <span class="update-time">更新时间: {{ currentNote.updatedAtFriendly }}</span>
            <span class="note-status">{{ currentNote.statusText }}</span>
          </Alert>
        </div>
        <div class="operation">
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
  import { getDataByGet } from '../../common/js/request.js'
  import { API_AUTH } from '../../common/js/apis.js'
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
        currentNote: {
          title: '我的笔记',
          content: '笔记内容',
          createdAtFriendly: '1天前',
          updatedAtFriendly: '刚刚',
          statusText: '未更新'
        }
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
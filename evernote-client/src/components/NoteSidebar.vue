<template>
  <div class="note-sidebar">
    <div class="note-header">
      <Dropdown style="margin-left: 20px">
        <a href="javascript:void(0)">
          选择笔记本
          <Icon type="arrow-down-b"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem v-for="notebook in notebooks" :key="notebook.id">{{ notebook.title }}</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Button class="add-note-btn" type="ghost" size="small">添加笔记</Button>
    </div>
    <div class="note-tab">
      <div class="update-time-tab">更新时间</div>
      <div class="title-tab">标题</div>
    </div>
    <ul class="note-list">
      <li class="note-item" v-for="note in notes" :key="note.id">
        <div class="note-update-time">{{ note.updatedAtFriendly }}</div>
        <div class="note-title">{{ note.title }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { getNotebooks } from '../common/js/request.js'
  import { friendlyDate } from '../common/js/util.js'
  export default {
    name: 'NoteSiderbar',
    created() {
      this._getNotebooks()
    },
    data() {
      return {
        notebooks: [],
        notes: [{
            id: 11,
            title: '第一个笔记',
            updatedAtFriendly: '刚刚'
          },
          {
            id: 12,
            title: '第二个笔记',
            updatedAtFriendly: '3分钟前'
          }
        ]
      }
    },
    methods: {
      _getNotebooks() {
        getNotebooks().then(res => {
          res = res.data
          this.notebooks = res.data
          console.log('note sidebar notebooklist', this.notebooks)
        }).catch(err => {
          this.$Message.error('获取笔记本失败')
        })
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
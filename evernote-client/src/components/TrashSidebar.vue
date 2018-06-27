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
      <li class="trash-item" v-for="note in notes" :key="note.id">
        <div class="trash-update-time">{{ _formateDate(note.updatedAt) }}</div>
        <div class="trash-title">{{ note.title }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { getNotebooks, getNote, addNote } from '../common/js/request.js'
  import { friendlyDate } from '../common/js/util.js'
  export default {
    name: 'TrashSiderbar',
    created() {

    },
    data() {
      return {
        notes: []
      }
    },
    methods: {
      
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
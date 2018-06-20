<template>
  <div class="sider-bar">
    <avatar></avatar>
    <ul class="do-list">
      <li class="do-item">
        <Icon type="document-text" />
        <span class="item-text">笔记</span>
      </li>
      <li class="do-item">
        <Icon type="ios-paper" />
        <span class="item-text">笔记本</span>
      </li>
      <li class="do-item">
        <Icon type="trash-b" />
        <span class="item-text">废纸篓</span>
      </li>
    </ul>
    <div class="icon-logout">
      <Icon type="log-out"></Icon>
      <span class="item-text">退出</span>
    </div>
  </div>
</template>

<script>
  import Avatar from './Avatar.vue'
  export default {
    name: 'SiderBar',
    components: {
      Avatar
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../common/stylus/variables.styl';
  .sider-bar
    width 100px
    height 100%
    background-color $siderbar-bg-color
    color $siderbar-text-color
    text-align center
    position fixed
    left 0
    top 0
    .do-list
      text-align left 
      font-size 14px
      .do-item
        line-height 30px
        cursor pointer
        transition all .3s
        padding-left 20px
        &:hover
          color #fff
          background-color $theme-color
        .item-text
          margin-left 3px
    .icon-logout
      font-size 14px
      transition all .3s
      cursor pointer
      padding 10px 0
      position absolute
      width 100px
      bottom 50px
      &:hover
        color #fff
        background-color $theme-color
</style>
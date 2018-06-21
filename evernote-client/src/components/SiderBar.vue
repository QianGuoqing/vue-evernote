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
        <router-link tag="span" to="/notebook-list" class="item-text">笔记本</router-link>
      </li>
      <li class="do-item">
        <Icon type="trash-b" />
        <span class="item-text">废纸篓</span>
      </li>
    </ul>
    <div class="icon-logout" @click="onLogout">
      <Icon type="log-out"></Icon>
      <span class="item-text">退出</span>
    </div>
  </div>
</template>

<script>
  import Avatar from './Avatar.vue'
  import { getDataByGet } from '../common/js/request.js'
  import { API_LOGOUT, API_AUTH } from '../common/js/apis.js'
  export default {
    name: 'SiderBar',
    components: {
      Avatar
    },
    methods: {
      onLogout() {
        getDataByGet(API_AUTH).then(res => {
          res = res.data
          console.log('siderbar auth', res)
          if (res.isLogin) {
            getDataByGet(API_LOGOUT).then(res => {
              res = res.data
              this.$Message.success(res.msg)
              this.$store.commit('setUsername', '未登录')
              this.$router.push({
                path: '/login'
              })
            })
          } else {
            this.$Message.error('尚未登录')
          }
        })
      }
    },
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
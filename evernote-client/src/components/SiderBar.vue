<template>
  <div class="sider-bar">
    <avatar></avatar>
    <ul class="do-list">
      <router-link exact tag="li" to="/" class="do-item">
        <Icon type="ios-home" />
        <span class="item-text">信息页</span>
      </router-link>
      <router-link tag="li" to="/note" class="do-item">
        <Icon type="document-text" />
        <span class="item-text">笔记</span>
      </router-link>
      <router-link tag="li" to="/notebook-list" class="do-item">
        <Icon type="ios-paper" />
        <span class="item-text">笔记本</span>
      </router-link>
      <router-link tag="li" to="/trash" class="do-item">
        <Icon type="trash-b" />
        <span class="item-text">废纸篓</span>
      </router-link>
    </ul>
    <div class="icon-logout" @click="logoutModal = true">
      <Icon type="log-out"></Icon>
      <span class="item-text">退出</span>
    </div>
    <Modal
      v-model="logoutModal"
      @on-ok="onLogout"
      @on-cancel="cancel"
      title="确认退出?">
      <p>选择确认表示退出, 选择取消表示取消退出.</p>
    </Modal>
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
    data() {
      return {
        logoutModal: false
      }
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
      },
      cancel() {
        this.$Message.info('取消注销');
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
        &.sidebar-active
          background-color $theme-color
          color #fff
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
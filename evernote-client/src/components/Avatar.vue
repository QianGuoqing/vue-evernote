<template>
  <div class="avatar-wrapper">
    <div class="avatar">
      {{ capitalName }}
    </div>
    <Tag class="tag" color="blue">{{ username }}</Tag>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { API_AUTH } from '../common/js/apis.js'
  import { getDataByGet } from '../common/js/request.js'
  export default {
    name: 'Avatar',
    computed: {
      ...mapState(['username']),
      capitalName() {
        return this.username.substring(0, 1).toUpperCase()
      }
    },
    data() {
      return {
        currentUserName: '',
        isShow: false
      }
    },
  }
</script>

<style lang="stylus" scoped>
  @import '../common/stylus/variables.styl';
  .avatar-wrapper
    margin 30px
    position relative
    height 80px
    .avatar
      background-color $theme-color
      width 40px
      height 40px
      border-radius 50%
      text-align center
      line-height 40px
      font-weight 700
      color $siderbar-bg-color
    .tag
      margin-top 10px
      position absolute
      left 50%
      transform translateX(-50%)
</style>
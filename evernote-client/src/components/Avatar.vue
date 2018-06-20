<template>
  <div class="avatar">
    {{ capitalName }}
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'Avatar',
    computed: {
      ...mapState(['username']),
      capitalName() {
        return this.username.substring(0, 1)
      }
    },
  }
</script>

<style lang="stylus" scoped>
  @import '../common/stylus/variables.styl';
  .avatar
    background-color $theme-color
    width 40px
    height 40px
    border-radius 50%
    text-align center
    line-height 40px
    font-weight 700
    color $siderbar-bg-color
    margin 30px
</style>
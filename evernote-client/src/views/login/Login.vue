<template>
  <div class="login">
    <div class="login-container">
      <div class="carousel-wrapper">
        <Carousel v-model="carouselValue" autoplay :autoplay-speed="autoplaySpeed" loop dots="none">
          <CarouselItem>
            <div class="poster-carousel">
              <img src="../../../static/images/carousel1.jpeg" alt="">
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="poster-carousel">
              <img src="../../../static/images/carousel2.jpeg" alt="">
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="poster-carousel">
              <img src="../../../static/images/carousel3.jpeg" alt="">
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="poster-carousel">
              <img src="../../../static/images/carousel4.jpeg" alt="">
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="poster-carousel">
              <img src="../../../static/images/carousel5.jpeg" alt="">
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="poster-carousel">
              <img src="../../../static/images/carousel6.jpeg" alt="">
            </div>
          </CarouselItem>
        </Carousel>
      </div>
      <div class="login-register-wrapper">
        <Collapse v-model="collapseValue" accordion>
          <Panel name="1">
            创建账户
            <p slot="content">
              <Form ref="login" :model="register" :rules="registerRule" inline>
                <FormItem prop="username">
                  <Input class="input-username" type="text" v-model="register.username" placeholder="用户名">
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <FormItem prop="password">
                  <Input class="input-password" type="password" v-model="register.password" placeholder="密码" @on-enter="onRegister">
                  <Icon type="ios-locked-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <FormItem>
                  <div class="button-group">
                    <Button @click="onRegister" class="login-button" type="primary">注册</Button>
                    <Button @click="registerCancel" class="cancel-button" type="error">取消</Button>
                  </div>
                </FormItem>
              </Form>
            </p>
          </Panel>
          <Panel name="2">
            登陆
            <p slot="content">
              <Form ref="login" :model="login" :rules="loginRule" inline>
                <FormItem prop="username">
                  <Input class="input-username" type="text" v-model="login.username" placeholder="用户名">
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <FormItem prop="password">
                  <Input class="input-password" type="password" v-model="login.password" placeholder="密码" @on-enter="onLogin">
                  <Icon type="ios-locked-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <FormItem>
                  <div class="button-group">
                    <Button @click="onLogin" class="login-button" type="primary">登陆</Button>
                    <Button @click="loginCancel" class="cancel-button" type="error">取消</Button>
                  </div>
                </FormItem>
              </Form>
            </p>
          </Panel>
        </Collapse>
      </div>
    </div>
  </div>
</template>

<script>
  import { getDataByPost, getDataByGet } from '../../common/js/request.js'
  import { API_AUTH, API_LOGIN, API_REGISTER } from '../../common/js/apis.js'
  getDataByGet(API_AUTH).then(res => {
    console.log('/auth', res.data)
  })
  export default {
    name: 'Login',
    data() {
      return {
        carouselValue: 0,
        collapseValue: "2",
        autoplaySpeed: 5000,
        login: {
          username: '',
          password: ''
        },
        register: {
          username: '',
          password: '',
        },
        loginRule: {
          username: [{
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          }],
          password: [{
              required: true,
              message: '密码不能为空.',
              trigger: 'blur'
            },
            {
              type: 'string',
              min: 3,
              max: 15,
              message: ' 密码长度应在3-15之间',
              trigger: 'blur'
            }
          ]
        },
        registerRule: {
          username: [{
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '密码不能为空.',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      onLogin() {
        getDataByPost(API_LOGIN, {
          username: this.login.username,
          password: this.login.password
        }).then(res => {
          res = res.data
          this.$Message.success(res.msg)
          this.$store.commit('setUsername', this.login.username)
          this.$store.commit('setUser', res.data)
          this._clearLogin()
          this.$router.push({
            path: '/notebook-list'
          })
        }).catch(err => {
          this.$Message.error('登录失败-用户名或者密码错误')
        })
      },
      onRegister() {
        getDataByPost(API_REGISTER, {
          username: this.register.username,
          password: this.register.password
        }).then(res => {
          res = res.data
          this.$Message.success(res.msg)
          this._clearRegister()
        }).catch(err => {
          this.$Message.error('注册失败-用户名以重复')
        })
      },
      loginCancel() {
        this._clearLogin()
        this.$Message.error('取消登陆');
      },
      registerCancel() {
        this._clearRegister()
        this.$Message.error('取消注册')
      },
      _clearLogin() {
        this.login.username = ''
        this.login.password = ''
      },
      _clearRegister() {
        this.register.username = ''
        this.register.password = ''
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/variables.styl';
  .login >>> .ivu-collapse-header
    color $theme-text-color
    background-color #fff

  .input-username, .input-password
    width 230px
    margin-bottom 10px
  .button-group
    width 220px
    text-align center

  .login
    width 100%
    height 100%
    background-color $mask-color
    z-index 100
    .login-container
      display flex
      flex-flow wrap
      width 700px
      height 400px
      position absolute
      left 50%
      top 40%
      transform translate(-50%, -50%)
      .carousel-wrapper
        width 430px
        height 100%
        background-color $theme-color
        border-radius 4px 0 0 4px
        img
          width 310px
          height 400px
          border-radius 4px
          position relative
          left 60px
          padding 10px 0
      .login-register-wrapper
        width 270px
        height 100%
        background-color #fff
        border-radius 0 4px 4px 0
</style>

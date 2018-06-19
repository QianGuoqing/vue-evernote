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
                  <Input class="input-password" type="password" v-model="register.password" placeholder="密码">
                  <Icon type="ios-locked-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <FormItem>
                  <div class="button-group">
                    <Button class="login-button" type="primary">注册</Button>
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
                  <Input class="input-password" type="password" v-model="login.password" placeholder="密码">
                  <Icon type="ios-locked-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <FormItem>
                  <div class="button-group">
                    <Button class="login-button" type="primary">登陆</Button>
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
  import { getDataByPost } from '../../common/js/request.js'
  getDataByPost('/auth/logins', { username: 'hunger', password: '123456' }).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
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
      loginCancel() {
        this.login.username = ''
        this.login.password = ''
        this.$Message.error('取消登陆');
      },
      registerCancel() {
        this.register.username = ''
        this.register.password = '' 
        this.$Message.error('取消注册')
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

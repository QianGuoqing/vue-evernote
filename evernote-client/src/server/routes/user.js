const express = require('express')
const router = express.Router()
const md5 = require('md5')
const userModel = require('../models/user-model')

router.get('/user', (req, res) => {
  let { user_id } = req.cookies
  if (!user_id) {
    return res.json({
      msg: '尚未登录',
      isLogin: false
    })
  } else {
    userModel.findById(user_id, (err, doc) => {
      if (err) {
        return res.json({
          isLogin: false,
          msg: '服务器错误'
        })
      }
      return res.json({
        isLogin: true,
        data: doc
      })
    })
  }
})

router.post('/user/register', (req, res) => {
  const { username, password } = req.body
  userModel.findOne({ username: username }, (err, doc) => {
    if (doc) {
      return res.json({
        err: true,
        msg: '用户已存在'
      })
    }
  })
  userModel.create({
    username: username,
    password: md5(password)
  }, (err, doc) => {
    if (err) {
      return res.json({
        err: true,
        msg: '服务器错误'
      })
    }
    return res.json({
      err: false,
      msg: '注册成功',
      data: doc
    })
  })
})

router.post('/user/login', (req, res) => {
  const { username, password } = req.body
  userModel.findOne({ username: username, password: md5(password) }, (err, doc) => {
    if (err) {
      return res.json({
        err: true,
        msg: '服务器错误'
      })
    }
    if (!doc) {
      return res.json({
        err: true,
        msg: '用户名密码错误'
      })
    } else {
      res.cookie('user_id', doc._id)
      return res.json({
        err: false,
        msg: '登陆成功',
        data: doc
      })
    }
  })
})

module.exports = router
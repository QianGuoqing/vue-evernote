const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/evernote_db'

mongoose.connect(DB_URL, err => {
  if (err) {
    console.log('connect failed')
  } else {
    console.log('connect success')
  }
})

const userSchema = new mongoose.Schema({
  username: { type: String, require: true },
  password: { type: String, require: true },
  createAt: { type: String, require: true, default: new Date().toISOString() },
  updateAt: { type: String, require: true, default: new Date().toISOString() },
  id: { type: Number, require: true, default: Math.floor(Math.random() * 9999) }
})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel
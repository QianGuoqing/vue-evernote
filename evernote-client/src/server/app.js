const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const userRoute = require('./routes/user')

app.use(bodyParser.json())
app.use(cookieParser())

app.use('/', userRoute)

app.listen(9090, () => {
  console.log('server is listening at port 9090...')
})
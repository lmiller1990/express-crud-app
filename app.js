const express = require('express')
const setUpPassport = require('./setuppassport')
const mongoose = require("mongoose")
const path = require("path")
const bodyParser = require("body-parser")
const passport = require('passport')
const cookieParser = require("cookie-parser")
const session = require("express-session")
const flash = require("connect-flash")

const routes = require('./routes')

const app = express()

// connect to mongodb test database
mongoose.connect('mongodb://localhost:27017/test2')
app.set('port', process.env.PORT || 3000)
setUpPassport()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false  }));

app.use(cookieParser())

app.use(session({
  secret: 'TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX',
  resave: true,
  saveUninitialized: true
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use(routes)

app.listen(app.get('port'), function() {
  console.log(`Server started on port ${app.get('port')}`)
})

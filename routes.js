const express = require('express')
const passport = require('passport')
const User = require('./models/user')

const router = express.Router()

router.use(function(req, res, next) {
  res.locals.currentUser = req.user
  res.locals.errors = req.flash('error')
  res.locals.infos = req.flash('info')
  next()
})

router.get('/', function(req, res, next) {
  User.find()
  .sort({ createdAt: 'descending' })
  .exec(function(err, users) {
    if (err) { return next(err) }
    res.render('index', { users: users })
  })
})

router.get('/signup', function(req, res) {
  res.render('signup')
})

router.post('/signup', function(req, res, next) {
  let username = req.body.username
  let password = req.body.password

  User.findOne({ username: username }, function(err, user) {
    if (user) {
      req.flash('error', 'Username is already taken.')
      return res.redirect('/signup')
    }

    const newUser = new User({
      username: username,
      password: password
    })
    newUser.save(next)
  })
}, passport.authenticate('login', {
  successRedirect: '/',
  failureRedirect: '/signup',
  failureFlash: true
}))

router.get('/users/:username', function(req, res, next) {
  User.findOne({ username: req.params.username }, function(err, user) {
    if (err) { return next(err) }
    if (!user) { return next(404) }
    res.render('profile', { user: user })
  })
})

module.exports = router

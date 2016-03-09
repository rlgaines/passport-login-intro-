var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('../../../db/knex');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Welcome' });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user){
    if(err){
      res.render('login', {title: "Login", message: "You did it"})
    } else {
      res.redirect('/');
    }
  })(req, res, next);
});

router.get('/logout', function(req, res, next) {
  res.render('index', { title: 'Welcome' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Welcome' });
});

router.post('/register', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  knex('users').where('email', email).then(function(data){
    if(data.length){
      res.send('sucky')
    } else {
      knex('users').insert({
        email: email,
        password: password
      }).then(function(data){
        return res.redirect('/login');
      })
      .catch(function(error){
        return res.send('sucky');
      });
      }
  })
  .catch(function(err){
    return next(err);
  })
});
module.exports = router;

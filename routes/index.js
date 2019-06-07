const express = require('express');
const router = express.Router();
const passport = require('passport');
const apiController = require('../controllers/apiController');
const auth = require('../config/passport');


// pages routes 

// GET home page.
router.get('/',auth.isLoggedIn, function(req, res, next) {
  res.render('index', { title: 'Home', apiKey:req.user.apiKey });
});
// get login page 
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});


// api route
router.post('/api/v1/type=:value?',auth.isAuthorized,apiController.doWork);


// google auth route
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));


// google auth callback
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });




module.exports = router;

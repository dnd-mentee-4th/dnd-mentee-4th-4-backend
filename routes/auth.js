const express = require('express');
const passport = require('passport');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

// "/auth/logout"
router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

// "/auth/kakao"
router.get('/kakao', passport.authenticate('kakao'));

// "/auth/kakao/callback"
router.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    failureRedirect: '/',
  }),
  (req, res) => {
    res.redirect('/');
  },
);

module.exports = router;

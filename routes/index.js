const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res) => res.json({
    message: "Welcome to the Store API",
    docs: "/api-docs",
    author: "Viszelle Cristhina Chacon"
  })
);

router.get('login', passport.authenticate('github'), (req, res) => {});

router.get('logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;
const router = require("express").Router();
const passport = require("../configs/passport")
const authController = require('../controllers/authController');

router.get(
    '/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
);

router.get('/google/callback', passport.authenticate('google'));

module.exports = router;

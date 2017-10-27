const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/login', passport.authenticate('local'), (req, res) => res.redirect('/'));

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', (req, res, next) => {
  passport.authenticate('facebook', (err, user) => {
    if (err) {
      console.log(err);
      return res.redirect('/');
    }
    if (!user) {
      console.log('user did not permit');
      return res.redirect('/');
    }
    req.login(user, (error) => {
      if (err) {
        console.log(err);
        return next(error);
      }
      console.log('all worked well');
      return res.redirect('/facebooklogin');
    });
    return null;
  })(req, res, next);
});

router.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, user) => {
    if (err) {
      console.log(err);
      return res.redirect('/');
    }
    if (!user) {
      console.log('user did not permit');
      return res.redirect('/');
    }
    req.login(user, (error) => {
      if (err) {
        console.log(err);
        return next(error);
      }
      console.log('all worked well');
      return res.redirect('/googlelogin');
    });
    return null;
  })(req, res, next);
});

router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback', (req, res, next) => {
  passport.authenticate('twitter', (err, user) => {
    if (err) {
      console.log(err);
      return res.redirect('/');
    }
    if (!user) {
      console.log('user did not permit');
      return res.redirect('/');
    }
    req.login(user, (error) => {
      if (err) {
        console.log(err);
        return next(error);
      }
      console.log('all worked well');
      return res.redirect('/twitterlogin');
    });
    return null;
  })(req, res, next);
});

router.get('/linkedin', passport.authenticate('linkedin'));

router.get('/linkedin/callback', (req, res, next) => {
  passport.authenticate('linkedin', (err, user) => {
    if (err) {
      console.log(err);
      return res.redirect('/');
    }
    if (!user) {
      console.log('user did not permit');
      return res.redirect('/');
    }
    req.login(user, (error) => {
      if (err) {
        console.log(err);
        return next(error);
      }
      console.log('all worked well');
      return res.redirect('/linkedinlogin');
    });
    return null;
  })(req, res, next);
});

router.get('/github', passport.authenticate('github'));

router.get('/github/callback', (req, res, next) => {
  passport.authenticate('github', (err, user) => {
    if (err) {
      console.log(err);
      return res.redirect('/');
    }
    if (!user) {
      console.log('user did not permit');
      return res.redirect('/');
    }
    req.login(user, (error) => {
      if (err) {
        console.log(err);
        return next(error);
      }
      console.log('all worked well');
      return res.redirect('/githublogin');
    });
    return null;
  })(req, res, next);
});

module.exports = router;

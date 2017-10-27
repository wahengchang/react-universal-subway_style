const LocalStrategy = require('passport-local').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const configAuth = require('./authConfig');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    console.log(JSON.stringify(user));
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    done(null, id);
  });

  passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields: configAuth.facebookAuth.profileFields,
    passReqToCallback: true,
  }, (req, token, refreshToken, profile, done) => {
    process.nextTick(() => {
      if (!req.user) console.log(profile);
      return done(null, profile);
    });
  }));

  passport.use(new GoogleStrategy({
    clientID: configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL,
  }, (token, tokenSecret, profile, done) => {
    process.nextTick(() => {
      console.log(profile);
      return done(null, profile);
    });
  }));

  passport.use(new TwitterStrategy({
    consumerKey: configAuth.twitterAuth.consumerKey,
    consumerSecret: configAuth.twitterAuth.consumerSecret,
    callbackURL: configAuth.twitterAuth.callbackURL,
  },
  (token, tokenSecret, profile, done) => {
    process.nextTick(() => {
      console.log(profile);
      return done(null, profile);
    });
  }));

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'passwd',
    passReqToCallback: true,
    session: false,
  }, (req, username, password, done) => {
    process.nextTick(() => {
      console.log(username);
      return done(null, username);
    });
  }));

  passport.use(new LinkedInStrategy({
    clientID: configAuth.LinkedInAuth.clientID,
    clientSecret: configAuth.LinkedInAuth.clientSecret,
    callbackURL: configAuth.LinkedInAuth.callbackURL,
    scope: ['r_emailaddress', 'r_basicprofile'],
    passReqToCallback: true,
  }, (req, accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
      console.log(profile);
      return done(null, profile);
    });
  }));

  passport.use(new GitHubStrategy({
    clientID: configAuth.githubAuth.clientID,
    clientSecret: configAuth.githubAuth.clientSecret,
    callbackURL: configAuth.githubAuth.callbackURL,
  }, (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
      console.log(profile);
      return done(null, profile);
    });
  }));
};

const GoogleStrategy = require('passport-google-oauth20').Strategy;  // Could use many different strateies (including local)
const mongoose = require('mongoose');
const keys = require('./keys');

module.exports = (passport) => {
    passport.use(
        new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.clientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true     // Heroku tries to load strategy using https, with proxy true we can use strategy using http
        }, (accessToken, refreshToken, profile, done) => {      // Callback from auth
            console.log(accessToken);
            console.log(profile);
        })
    )
}
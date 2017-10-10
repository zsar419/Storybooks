const GoogleStrategy = require('passport-google-oauth20').Strategy;  // Could use many different strateies (including local)
const mongoose = require('mongoose');
const User = mongoose.model('users');       // Mongoose model (schema declared)
const keys = require('./keys');

module.exports = (passport) => {
    passport.use(
        new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true     // Heroku tries to load strategy using https, with proxy true we can use strategy using http
        }, (accessToken, refreshToken, profile, done) => {      // Callback from auth
            const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));   // Removing everything after '?' => ?sz=50' from image string
            const newUser = {
                googleID: profile.id,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value,
                image: image
            };

            // Check for existing users
            User.findOne({
                googleID: profile.id
            }).then(user => {           // If user exists in DB, go to next step (done)
                if(user){
                    console.log(user);
                    done(null, user);   // where 'null' is error parameter
                }
                else                    // Create user
                    new User(newUser)
                    .save()
                    .then(user => done(null, user));

            })
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id).then(user => done(null, user));
    });
}
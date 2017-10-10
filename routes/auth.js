const express = require('express');
const passport = require('passport');
const router = express.Router();

// Using .../auth/{routes declared here}

// Authenticating user (logging in with google)
router.get('/google', passport.authenticate(    // Authenticaion mechanism in passport.js
    'google',   // using google passport strategy
    { scope: ['profile', 'email'] }
));

// Retrieving callback after google login request
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }), (req, res) => { // Redirect to home upon failed auth, Redirect to dashboard upon success
    res.redirect('/dashboard'); 
});

// User verification
router.get('/verify', (req, res) => {
    if(req.user) {          // If authenticated, we have access to user obj
        console.log(req.user);
    } else {
        console.log('Not authorized');
    }
});

// Logging out
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});
         
module.exports = router;

const express = require('express');
const passport = require('passport');
const router = express.Router();

// Using .../auth/{routes declared here}

router.get('/google', passport.authenticate(
    'google',   // using google passport strategy
    { scope: ['profile', 'email'] }
));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }), (req, res) => { // Redirect to home upon failed auth, Redirect to dashboard upon success
    res.redirect('/dashboard'); 
});
         
module.exports = router;

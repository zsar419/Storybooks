const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

// Passport config
require('./config/passport')(passport);

// Load Routes
const auth = require('./routes/auth');

const app = express();

app.get('/', (req, res) => {
    res.send('WORKING!');
});

// Use declared routes
app.use('/auth', auth);     // Anything which goes to auth will go to the routes declared in auth.js

const port = process.env.PORT || 5000;  // Use process port (if deployed online) else use port 5000 for local deployments
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});

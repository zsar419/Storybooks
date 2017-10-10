const express = require('express');
const path = require('path');           // Required for joining paths (accessing public css files etc.)
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const exphbs = require('express-handlebars');
const keys = require('./config/keys');  // Loading DB keys for connection
const { truncate, stripTags, formatDate, select, editIcon } = require('./helpers/hbs');   // Handlebars helpers

// Load models
require('./models/User');
require('./models/Story');

// Passport config
require('./config/passport')(passport);

// Load Routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const stories = require('./routes/stories');

mongoose.Promise = global.Promise;      // Replacing deprecated promise with new ES6
// Connection to DB
mongoose.connect(keys.mongoURI, {
    useMongoClient: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

const app = express();

/** MIDDLEWARE **/ 
// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Method override middleware
app.use(methodOverride('_method'));

app.use(cookieParser());
app.use(session({           // Express-session middleware
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));


// Handlebars middleware
app.engine('handlebars', exphbs({
    helpers: {
        truncate: truncate,
        stripTags: stripTags,
        formatDate: formatDate,
        select: select,
        editIcon: editIcon
    },
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Passport middleware - must be declared after cookie and express-session middleware
app.use(passport.initialize());
app.use(passport.session());

// Set global vars
app.use((req, res, next) => {           // Setting global user when request is made (for a client)
    res.locals.user = req.user || null;
    next();
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

/** ROUTES **/
// Use declared routes
app.use('/', index);
app.use('/auth', auth);         // Anything which goes to auth will go to the routes declared in auth.js
app.use('/stories', stories);

const port = process.env.PORT || 5000;  // Use process port (if deployed online) else use port 5000 for local deployments
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});

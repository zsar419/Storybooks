# Storybooks
### (insert web link here) ###

## Application ##
A simple application which allows you to share stories (blogs)
- Features:
    - ExpressJS - routing and API decleration
    - Handlebars - serversided views
    - Mongoose/MongoDB - backend database
    - Passport - authentication
    - Bcrypt - password hashing for secure storage

## Libraries used ##
+ExpressJS:
- npm install --save express
- Middleware:
    - Functions which have access to the request (req) and response (res) objects
    - http://expressjs.com/en/guide/using-middleware.html


+Handlebars (express middleware):
- Express handlebars module: https://github.com/ericf/express-handlebars (optimized for express js)
- Server templating engine
- Rendering templates on the server
    - npm install  --save express-handlebars
- Express-Handlebars uses views directory

+Mongoose (database connector):
- npm install --save mongoose
- Decleration of models and schemas, allows us to connect to local (mongoDB) or remote (mlab) database

+Express-session:
- Module: https://github.com/expressjs/session
- npm install --save express-session

+Cookie-parser (express middleware):
- Module: https://www.npmjs.com/package/cookie-parser
- npm install --save cookie-parser

+Body-parser (express middleware):
- Module: https://github.com/expressjs/body-parser
- Allows us to retrieve form body data (sumitted) and send it in http response
- npm install --save body-parser

+Moment
- Module: https://momentjs.com
- Used for formatting dates
- npm install --save moment

+Method-override:
- Module: https://github.com/expressjs/method-override
- Forms can only have method=get/post, this allows forms to use methods put and delete
- Using this forms can send put request to api which can then process that form and send back response (render new page)
- npm install --save method-override

Connect-Flash:
- Module: https://github.com/jaredhanson/connect-flash
- npm install --save connect-flash

+Passport:
- Module: http://passportjs.org/docs
- npm install --save passport
- NodeJS authentication library
- Has over 300+ strategies including:
    - single-sign-ons (google, fb, linkedin, ..., etc.)
    - OAuth, OAuth 2.0, OpenID, Basic/Digest auth
    - webtokens
    - local authentication (storing/retrieving user data to/from db)
    - SAML
    Google auth strategy:
        - Module: https://github.com/jaredhanson/passport-google-oauth2
        - npm install --save passport-google-oauth20

BcryptJS:
- Module: https://www.npmjs.com/package/bcryptjs
- npm install --save bcryptjs
- Hashes passwords before storing them in the DB (never store plaintext passwords in db)
- Installing passport strategies:
    - Local strategy (store to local DB):
        - npm install --save passport-local


## FrontEnd ##
Handlebars (pages rendered on server)

MaterializeCSS
- Module/CDN: http://materializecss.com/getting-started.html

Fontawesome:
- Module/CDN: https://www.bootstrapcdn.com/fontawesome/

CKEditor:
- Module/CDN: https://cdn.ckeditor.com

## Deployment procedure ##
- Mlab DB: used for prod deployments
- MongoDB: used for local deployments
- Deployed onto Heroku
    - Heroku web app settings contains Config Variables which define key variables utilized in keys_prod
    - keys_dev is ignored (gitignore)
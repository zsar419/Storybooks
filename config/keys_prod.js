// NOTE: THESE VARS ARE OBTAINED FROM HEROKU DEPLOYMENT ENVIRONMENT
module.exports = {
    mongoURI: process.env.MONGO_URI,
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET
}

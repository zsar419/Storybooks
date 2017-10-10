const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema creation
const StorySchema = new Schema({
    title: {
        type: String,
        required: true      // Change this to false if using other auth mechanisms (locla, fb etc.)
    },
    body: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'public',
    },
    allowComments: {
        type: Boolean,
        default: true
    },
    comments: {
        type: [{
            commentBody: {
                type: String,
                required: true
            },
            commentDate: {
                type: Date,
                default: Date.now
            },
            commentUser: {  // Reference to user model from comments
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }],
        required: false
    },
    user: {                 // Reference to user model for story author
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    date: {
        type: Date,
        default: Date.now
    },
});

// Create collection and add schema
// 3rd parameter prevents auto collection creation (storys) but rather allows us to create defined 'stories' collection in DB
mongoose.model('stories', StorySchema, 'stories');  
// module.exports = mongoose.model('stories', StorySchema);
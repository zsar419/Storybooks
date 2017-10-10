const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Story = mongoose.model('stories');       // Mongoose model (schema declared)
const User = mongoose.model('users');
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');

// Stories index
router.get('/', (req, res) => {
    Story.find({status: 'public'})
        .populate('user')           // Populates all fields from user collection
        .sort({ date: 'desc'})      // Sorting returned stories by desc order of date
        .then(stories => {
            res.render('stories/index', {
                stories: stories
            });
        });
});

// Show a single story
router.get('/show/:id', (req, res) => {     // input id
    Story.findOne({
        _id: req.params.id
    })
    .populate('user')
    .populate('comments.commentUser')       // Referencing user info from commentor
    .then(story => {
        if(story.status === 'public')       // If public, go to story
            res.render('stories/show', { story: story });
        else {
            if(req.user && req.user.id === story.user._id) {                  // If private, check whether its the authors story or not, if it is, then allow access
                res.render('stories/show', { story: story });
            } else {
                res.redirect('/stories');
            }
        }
    }); 
});

// List stories from a user
router.get('/user/:userId', (req, res) => {
  Story.find({user: req.params.userId, status: 'public'})
    .populate('user')
    .then(stories => {
      res.render('stories/index', {
        stories:stories
      });
    });
});

// List stories from a user
router.get('/user/:userId', (req, res) => {
    Story.find({user: req.params.userId, status: 'public'})
        .populate('user')
        .then(stories => {
        res.render('stories/index', {
                stories:stories
            });
        });
});

// Logged in users stories
router.get('/my', ensureAuthenticated, (req, res) => {
    Story.find({ user: req.user.id })
        .populate('user')
        .then(stories => {
        res.render('stories/index', {
                stories:stories
            });
        });
});

// Add story form
router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('stories/add');
});

// Edit story form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    Story.findOne({
        _id: req.params.id
    })
    .then(story => {
        if(story.user != req.user.id) {
            res.redirect('/stories');
        } else {
            res.render('stories/edit', { story: story });
        }
    });
});

// Process Add story
router.post('/', (req, res) => {
    let allowComments = false;
    if(req.body.allowComments) {    // Turn on comments only if they exist in story
        allowComments = true;
    }

    // Define story obj from request
    const newStory = {
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        allowComments: allowComments,
        user: req.user.id
    }

    new Story(newStory).save()
        .then(story => {
            res.redirect(`/stories/show/${story.id}`)
        })
}); 

// Edit form process
router.put('/:id', (req, res) => {
    Story.findOne({
        _id: req.params.id
    })
    .then(story => {
        let allowComments = false;
        if(req.body.allowComments)    // Turn on comments only if they exist in story
            allowComments = true;
        
        // New setting new/updated values 
        story.title = req.body.title;
        story.body = req.body.body;
        story.status = req.body.status;
        story.allowComments = allowComments;

        story.save()
            .then(story => {
                res.redirect('/dashboard')
            });
    });
}); 

// Delete story
router.delete('/:id', (req, res) => {
    Story.remove({ _id: req.params.id })
        .then(() => {
            res.redirect('/dashboard');
        });
});

// Adding comment for story
router.post('/comment/:id', (req, res) => {
    Story.findOne({ _id: req.params.id })
        .then(story => {
            const newComment = {
                commentBody: req.body.commentBody,
                commentUser: req.user.id
            }

            // Push to comments array
            story.comments.unshift(newComment);     // Adding comment to beginning of array
            story.save()
                .then(story => {
                    res.redirect(`/stories/show/${story.id}`);
                });
        });
});

module.exports = router;
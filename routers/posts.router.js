const express = require('express');
const postsRouter = express.Router();
const postsController = require('../controllers/posts.controller');
const mustBeLoggedIn = require('../middlewares/must-be-logged-in');
const isAdmin = require("../middlewares/is-admin");

// Read Posts
postsRouter.get('/api/posts', postsController.getAllPosts);

// Read Post
postsRouter.get('/api/posts/:postId', postsController.getPostById);

// Create Post
postsRouter.post('/api/posts', mustBeLoggedIn, isAdmin, postsController.createPost);

// Update Post
postsRouter.post('/api/posts/:postId', mustBeLoggedIn, postsController.updatePost);

// Delete Post
postsRouter.get('/api/posts/:postId/delete', mustBeLoggedIn, postsController.deletePost);

// Update Post Form
postsRouter.get('/update-post/:postId', postsController.updatePostForm);

module.exports = postsRouter;

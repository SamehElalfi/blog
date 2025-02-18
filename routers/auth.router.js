const express = require('express');
const authRouter = express.Router();

const authController = require('../controllers/auth.controller');

authRouter.post('/api/login', authController.login);

authRouter.get('/api/logout', authController.logout);

module.exports = authRouter;


// Authentication => who is this user?
// Authorization => what can this user do?

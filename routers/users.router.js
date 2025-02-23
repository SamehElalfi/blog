const express = require('express');
const usersRouter = express.Router();

const usersController = require('../controllers/users.controller');

usersRouter.get('/api/users', usersController.getAllUsers);


module.exports = usersRouter;

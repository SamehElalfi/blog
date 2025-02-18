const express = require('express');
const jwt = require('jsonwebtoken');
const mustBeLoggedIn = require("../middlewares/must-be-logged-in");
const dashboardRouter = express.Router();


dashboardRouter.get('/dashboard', mustBeLoggedIn, (req, res) => {
  res.send("Dashboard");
});


module.exports = dashboardRouter;

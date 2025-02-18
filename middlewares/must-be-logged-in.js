const jwt = require('jsonwebtoken');

function mustBeLoggedIn(req, res, next) {
  // Check if there is a cookie named token
  if (!req.cookies.token) {
    res.send("You are not logged in");
    return;
  }

  try {
    // Verify the token
    const payload = jwt.verify(req.cookies.token, 'very-secret');
    req.user = payload;

    next();
  } catch (error) {
    console.log(error);
    res.send("Invalid token");
    return;
  }
};

module.exports = mustBeLoggedIn;

const db = require('../db');
const jwt = require('jsonwebtoken');
const loginSchema = require('../schemas/login.schema');

module.exports.login = (req, res) => {
  loginSchema.parse(req.body);

  db.all(
    `SELECT * FROM users WHERE email=? AND password=? LIMIT 1`,
    [req.body.email, req.body.password],
    (err, users) => {
      if (err) {
        console.log(err);
        return;
      }

      if (users.length === 0) {
        res.send("Invalid email or password");
        return;
      }

      const token = jwt.sign({ email: users[0].email }, 'very-secret');
      res.cookie('token', token);

      res.redirect('/dashboard');
    });
};


module.exports.logout = (req, res) => {
  res.send("Logout");
};

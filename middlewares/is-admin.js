const db = require('../db');

function isAdmin(req, res, next) {
  const email = req.user.email;
  db.get("SELECT * FROM users WHERE email=?", [email], (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).send("Something went wrong!");
      return;
    }

    if (user.role === 'admin') {
      next();
    } else {
      res.status(403).send("You are not an admin. You're not allowed to do this!");
    }
  });
}

module.exports = isAdmin;

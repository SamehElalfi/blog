const db = require('../db');

module.exports.getAllUsers = (req, res) => {
  db.all("SELECT id,email,name FROM `users`", (err, users) => {
    if (err) {
      console.log(err);
      return;
    }

    res.json(users);
  });
};

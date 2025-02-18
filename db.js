// Connection File

const sqlit3 = require('sqlite3');

const db = new sqlit3.Database("database.db");

module.exports = db;

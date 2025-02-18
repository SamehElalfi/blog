
// -----------------------------------------------------

// SQLite
// SQL => Structured Query Language

// Database Schema (Structure of the database)

const sqlit3 = require('sqlite3');
const db = new sqlit3.Database("database.db");

// Query => Command to CRUD operations on data

db.run(`CREATE TABLE IF NOT EXISTS "posts" (
	"id"	INTEGER NOT NULL UNIQUE,
	"title"	TEXT NOT NULL,
	"body"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT) -- Primary Key
);`);

// db.run("INSERT INTO posts VALUES ('Hello', 'World')");

db.run(`CREATE TABLE IF NOT EXISTS "users" (
	"id"	INTEGER NOT NULL UNIQUE,
	"name"	TEXT NOT NULL,
	"email"	TEXT NOT NULL UNIQUE,
	"password"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT) -- Primary Key
);`);

db.run(`CREATE TABLE "comments" (
	"id"	INTEGER,
	"userId"	INTEGER,
	"content"	TEXT
);`);

// get all posts from database

// -- SELECT * FROM `posts`
// -- SELECT * FROM `posts` LIMIT 3
// -- SELECT * FROM `posts` WHERE `body` LIKE "world" -- Case insensitive (works with Capetal/Small)
// -- SELECT * FROM `posts` WHERE `body` LIKE "wor%"  -- Start with "wor"
// -- SELECT * FROM `posts` WHERE `body` LIKE "%."    -- End with dot "."
// -- SELECT * FROM `posts` WHERE `body` LIKE "% and %" -- Contains the world "and"
// -- SELECT * FROM `posts` WHERE `body` LIKE "% to %" OR `title` LIKE "%coding%" -- Search with multiple conditions

// db.all('SELECT * FROM `posts` WHERE `body` LIKE "% and %"', (err, rows) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(rows);
//   }
// });

// Update a post
// UPDATE `posts` SET `body`="new body without dot", `title`="Hello, World" WHERE `body` LIKE "%."
// db.run("UPDATE `posts` SET `title` = 'new title'")


// Delete a post
// DELETE FROM `posts` WHERE `id`=8
// DELETE FROM `posts` WHERE `body` LIKE "%."
// db.run("DELETE FROM `posts`");




// Memory based database => arrays => objects
// File System based database => folders => files (json/text/yaml)

// SQL Database => tables => rows => columns
// SQLite - MySQl - Postgres



// NoSQL Database => collections => documents => fields
// NoSQL => Not Only SQL

// MongoDB => collections => documents => fields


// -----------------------------------------------------

// SQL 												NoSQL
// tables											collections
// rows												documents (JSON)
// columns										fields
// Scehmaful									Schemaless

const postSchema = require('../schemas/post.schema');
const db = require('../db');
const jwt = require('jsonwebtoken');

const getAllPosts = (req, res) => {
  // Pagination
  const page = Number.parseInt(req.query.page) || 1;
  const limit = 3;  // Posts per page

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // Page           startIndex           endIndex
  // 1              0 = (1 -1) * 3       3 = 1 * 3
  // 2              3 = (2 -1) * 3       6 = 2 * 3
  // 3              6 = (3 -1) * 3       9 = 3 * 3

  // Get all posts
  db.all("SELECT id,title FROM `posts`", (err, posts) => {
    if (err) {
      console.log(err);
      return;
    }

    const filteredPosts = posts.slice(startIndex, endIndex); // 3 posts
    res.json(filteredPosts);
  });
};

const getPostById = (req, res) => {
  const postId = req.params.postId; // 2

  db.all(`SELECT * FROM posts WHERE id=${postId} LIMIT 1`, (err, posts) => {
    if (err) {
      console.log(err);
      return;
    }

    // []
    if (posts.length === 0) {
      res.status(404).send('Post not found');
      return;
    }

    res.json(posts[0]);
  });
};

const createPost = (req, res) => {
  try {
    const title = req.body.title;
    const body = req.body.body;
    const email = req.user.email;

    postSchema.parse(req.body);  // validate the request body

    db.run(
      `INSERT INTO posts (title, body, author) VALUES (?, ?, ?)`,
      [title, body, email],
      (err) => {
        if (err) {
          console.log(err);
          res.status(500).send("Something went wrong!");
          return;
        }

        res.json({ title, body });
      });

  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updatePost = (req, res) => {
  try {
    const postId = req.params.postId;
    const title = req.body.title;
    const body = req.body.body;

    postSchema.parse(req.body);

    db.run(`UPDATE posts SET title=?, body=? WHERE id=?`, [title, body, postId], (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong!");
        return;
      }

      res.json({ title, body });
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deletePost = (req, res) => {
  try {
    // Email of the current user (logged in)
    const payload = req.user;
    const email = payload.email;  // The logged-in user
    const postId = req.params.postId;

    db.get("SELECT * FROM users WHERE email=?", [email], (error, user) => {
      if (error) {
        console.log(error);
        res.status(500).send("Something went wrong!");
        return;
      }

      db.get("SELECT * FROM posts WHERE id=?", [postId], (err, post) => {
        if (err) {
          console.log(err);
          res.status(500).send("Something went wrong!");
          return;
        }

        if (post.author === user.email || user.role === "admin") {
          db.run(`DELETE FROM posts WHERE id=?`, [postId], (err) => {
            if (err) {
              console.log(err);
              res.status(500).send("Something went wrong!");
              return;
            }

            res.send('Post deleted');
          });
        } else {
          res.status(403).send('You are not allowed to delete this post');
          return;
        }
      });
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updatePostForm = (req, res) => {
  res.send(`
    <form action="/api/posts/${req.params.postId}" method="POST">
      <label>
        Title: <input type="text" name="title" />
      </label>

      <label>
        Body: <input type="text" name="body" />
      </label>

      <button type="submit">Submit</button>
    </form>
    `);
};

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost, updatePostForm };


// Backend Server (Application) (HTTP Server) Hyper Text Transfer Protocol
// Req => Res


// Email Server (SMTP Server) Simple Mail Transfer Protocol



// JWT

// Login
// payload = { email: "user@gmail.com" };
// t = jwt.sign(payload); // Creates a new token => "eyJhbGciOi.eyasfsw4ed5rycftvu6gi7yonupimoJlbWFpbCI6.UQ0d7TCfMHZQpm2ZYE"
// // Save the token in the cookies



// // Dashboard
// // get the token from the cookies
// t = req.cookies.token;
// payload = jwt.verify(t); // Verifies a token => return the payload
// loggedInUserEmail = payload.email;

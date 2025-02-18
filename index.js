const express = require("express");
const ejs = require("ejs");
const mailService = require('./mailer');
var cookieParser = require('cookie-parser');

const app = express();

// Middleware
app.engine('html', ejs.renderFile);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

// app.get('/send-mail', (req, res) => {
//   mailService.sendMail({
//     from: "sameh@gmail.com",
//     to: "user@gmail.com, user2@gmail.com",
//     subject: "Hello",
//     html: "<h1>Hello</h1>"
//   });
//   res.send("Send Mail");
// });


const postsRouter = require('./routers/posts.router');
app.use(postsRouter);

const usersRouter = require('./routers/users.router');
app.use(usersRouter);

const authRouter = require('./routers/auth.router');
app.use(authRouter);

const dashboardRouter = require('./routers/dashboard.router');
app.use(dashboardRouter);

app.all('*', (req, res) => {
  res.send("404 - <u>Not Found</u>");
});

app.listen('4000', () => {
  console.log("The server is running on http://localhost:4000");
});

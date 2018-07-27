"use strict";

/* Load all required dependencies */
const
  express = require("express"),
  bodyParser = require("body-parser"),
  morgan = require("morgan"),
  errorHandler = require("errorhandler"),
  routes = require("./routes/index.js");

/* Define structure of blog posts */

let blog = {
    posts: [{
        name: "Sample Blog Post",
        url: "www.foo.bar",
        text: "This is a sample post. Your body needs to have these titles",
        comments: [
            "Example Comment-1",
            "The comments are arrays!"
        ]
    }]
}


/* Create express server on app variable along with required middlewear  */
let app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(errorHandler());

app.use((req, res, next) => {
    req.blog = blog
    next()
})


/* Create calls to posts object */
app.get("/posts/", routes.post.getPosts);
app.get("/posts/:postId", routes.post.getPosts);
app.post("/posts/", routes.post.addPost);
app.put("/posts/:postId", routes.post.updatePost);
app.delete("/posts/:postId", routes.post.removePost);

/* Create calls to comments object */
app.get("/posts/:postId/comments/", routes.comments.getComments);
app.get("/posts/:postId/comments/:comment_id", routes.comments.getComments);
app.post("/posts/:postId/comments/", routes.comments.addComment);
app.put("/posts/:postId/comments/:comment_id", routes.comments.updateComment);
app.delete("/posts/:postId/comments/:comment_id", routes.comments.removeComment);


/* Start listening to server */
app.listen(3000);
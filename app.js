const express = require("express");
const bodyParser = require("body-parser");
const model = require('./model');
const routes = require('./mock/mockRoutes');
const db = require('./database');

const app = express();

//Url parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set("view engine", "ejs");


app.use("/public", express.static("public")); //Styling

app.use("/scripts", express.static(__dirname + "/scripts/")); //Front end script
app.use('/', routes); //For route testing

app.get("/api/triangle/", (req, res) => {
  res.render("index");
});

//Route for a triangle API
app.post("/api/triangle/", urlencodedParser, (req, res) => {
  model.tirangleLogic(req, res, db);
});

//
//PART II of the assignment
//

//Front page of a blog
app.get("/api/blog/", (req, res) => {
  model.getPosts(req, res, db);
});

//Create a new post
app.post("/api/createPost/", urlencodedParser, (req, res) => {
  model.createPosts(req, res, db);
});

//Create a new comment
app.post("/api/createComment/", urlencodedParser, (req, res) => {
  model.createComment(req, res, db);
});

//Delete a post
app.post("/api/delete/", urlencodedParser, (req, res) => {
  model.deletePost(req, res, db);
});

//Delete a comment
app.post("/api/deleteComment/", urlencodedParser, (req, res) => {
  model.deleteComment(req, res, db);
});

//Edit post
app.post("/api/editPost", urlencodedParser, (req, res) => {
  model.editPost(req, res, db);
});

//Edit comment
app.post("/api/editComment", urlencodedParser, (req, res) => {
  model.editComment(req, res, db);
});

module.exports = app;


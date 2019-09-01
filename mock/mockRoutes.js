const bodyParser = require("body-parser");
const routes = require('express').Router();
const mockDb = require('./mockDb');
const model = require('../model');

//Url parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

  routes.get("/api/blogMock/", (req, res) => {
    model.getPosts(req, res, mockDb);
  });
  
  //Create a new post
  routes.post("/api/createPostMock/", urlencodedParser, (req, res) => {
    model.createPosts(req, res, mockDb);
  });
  
  //Create a new comment
  routes.post("/api/createCommentMock/", urlencodedParser, (req, res) => {
    model.createComment(req, res, mockDb);
  });
  
  //Delete a post
  routes.post("/api/deleteMock/", urlencodedParser, (req, res) => {
    model.deletePost(req, res, mockDb);
  });
  
  //Delete a comment
  routes.post("/api/deleteCommentMock/", urlencodedParser, (req, res) => {
    model.deleteComment(req, res, mockDb);
  });
  
  //Edit post
  routes.post("/api/editPostMock", urlencodedParser, (req, res) => {
    model.editPost(req, res, mockDb);
  });
  
  //Edit comment
  routes.post("/api/editCommentMock", urlencodedParser, (req, res) => {
    model.editComment(req, res, mockDb);
  });

module.exports = routes;
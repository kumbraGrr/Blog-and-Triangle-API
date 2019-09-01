const Joi = require("joi");
const asyncLib = require("async");
const {stringToNum, lineLng, checking, compare, check} = require('./util');


module.exports = {
  tirangleLogic : (req, res) => {
    //Validation schema
      const schema = Joi.object().keys({
          a: Joi.string().required(),
          b: Joi.string().required(),
          c: Joi.string().required(),
        });
      
        Joi.validate(req.body, schema, (err, result) => {
          if (err) {
            return res.status(400).send(err);
          }
          //Convert string values to a number
          let a = stringToNum(result.a);
          let b = stringToNum(result.b);
          let c = stringToNum(result.c);
      
          //checkinging if all the input values are converted corectly to numbers
          if (!checking([a, b, c]) || !check(a,b) || !check(a,c) || !check(b,c)) {
            return res.render("result", { data: "Incorrect" });
          }
          //Measuring length of lines
          let lineLngAB = lineLng(a, b);
          let lineLngBC = lineLng(b, c);
          let lineLngAC = lineLng(a, c);

          let finalResult = compare(lineLngAB, lineLngBC, lineLngAC);
      
          return res.render("result", { data: finalResult });
        });
  },

  getPosts : (req, res, db) => {
    let sql = "SELECT * FROM posts"; //Select all of the posts
    db.query(sql, (err, results) => {
      if (err){
        return res.status(500).send(err);
      };
      
      asyncLib.eachSeries(
        Object.keys(results),
        function(i, callback) {
          //Query the database with async library.
  
          let sql2 = `SELECT * FROM comments WHERE fkId = ${results[i].id}`; //Get all the comments
  
          db.query(sql2, (err2, results2) => {
            if (err2){
              return res.status(500).send(err);
            };
  
            results[i].comment = results2;//Assign comments to a post
            callback();
          });
        },
        function(err) {
          if (err){
            return res.status(500).send(err);
          };
          return res.render("blog", { data: results });
        });
    });
},

createPosts : (req, res, db) => {
  //Validation schema
  const schema = Joi.object().keys({
    title: Joi.string()
      .min(3)
      .required(),
    textBody: Joi.string()
      .min(3)
      .required()
  });
  Joi.validate(req.body, schema, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    };
    
    let post = { title: result.title, body: result.textBody }; //Title and body of the post
    let sql = "INSERT INTO posts SET ?";
    db.query(sql, post, (err, result) => {
      if (err){
        return res.status(500).send(err);
      };

     return res.redirect("/api/blog/");
    });
  });
},

createComment : (req, res, db) => {
  //Validation schema
  const schema = Joi.object().keys({
    id: Joi.number().required(),
    textBody: Joi.string()
      .min(3)
      .required()
  });

  Joi.validate(req.body, schema, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }
   
    let post = { fkId: result.id, commentBody: result.textBody }; //Assign foregin key to a primary key and body of the comment
    let sql = "INSERT INTO comments SET ?";
    db.query(sql, post, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      };

      return res.redirect("/api/blog/");
    });
  });
},

deletePost : (req, res, db) => {
  //Validation schema
  const schema = Joi.object().keys({
    id: Joi.number()
      .required()
  });

  Joi.validate(req.body, schema, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }

    let sql = `DELETE FROM posts WHERE id=` + result.id; //Delete selected post. Because thee is no user verification it has to be based on the id from the front-end
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      };

     return res.redirect("/api/blog/");
    });
  });
},

deleteComment : (req, res, db) => {
  //Validation schema
  const schema = Joi.object().keys({
    commentId: Joi.number().required()
  });

  Joi.validate(req.body, schema, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }

    let sql = `DELETE FROM comments WHERE commentId=` + result.commentId; //Same delete logic as for post delete
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      };

      return res.redirect("/api/blog/");
    });
  });
},

editPost : (req, res, db) => {
  //Validation schema
  const schema = Joi.object().keys({
    id: Joi.number().required(),
    title: Joi.string().min(3).required(),
    textBody: Joi.string().min(3).required()
  });

  Joi.validate(req.body, schema, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }

    let sql = `UPDATE posts SET title = '${result.title}', body = '${result.textBody}' WHERE id = ${result.id}`; //Edit post selected by its Id in database
    db.query(sql, (err, result) => {
      if (err){
        return res.status(500).send(err);
      };

     return res.redirect("/api/blog/");
    });
  });
},

editComment : (req, res, db) => {
  //Validation schema
  const schema = Joi.object().keys({
    id: Joi.number().required(),
    textBody: Joi.string().min(3).required()
  });

  Joi.validate(req.body, schema, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }

    let sql = `UPDATE comments SET commentBody = '${result.textBody}' WHERE commentId = ${result.id}`; //Update comment based on its id
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      };

      return res.redirect("/api/blog/");
      });
    });
  }
};















var mysql = require('mysql');

const dbinfo = {
    host: "localhost",
    user: "",
    password: "",
    connectionLimit: 5,
    database: "" //In case of not "manual" creation of database remove this property
  };


/*
//For 'automatic' creation of database uncoment this and run the server 
////In case of 'automatic' creation of database you should remove "database" property from "dbinfo" 
//////Set desired name of the database at the variable dbName in the "dbAssignment.connect" method

 var dbAssignment =  mysql.createConnection(
    dbinfo
 );

 dbAssignment.connect(function(err) {
    const dbName = "mock"; //Please insert desired name here
    if (err) throw err;
    console.log("Connected!");

    dbAssignment.query(`USE ${dbName}`, function (err, result) {
        if (err) throw err;
        });

    dbAssignment.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`, function (err, result) {
        if (err) {
            console.log(err);
            return;
        };
        console.log("Database created");
    });

    dbinfo.database = dbName;

    const sql= "CREATE TABLE IF NOT EXISTS posts (id int(11) NOT NULL AUTO_INCREMENT,title varchar(255) DEFAULT NULL,body varchar(1024) DEFAULT NULL,date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,PRIMARY KEY (id))";
    dbAssignment.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            return;
        };
        console.log("Table posts created");

        let postsData = "INSERT INTO posts VALUES (1,'Great day','It was a such a great day today!!!','2019-08-30 08:43:50'),(2,'Did you know this?','A single strand of Spaghetti is called a “Spaghetto”','2019-08-30 18:24:23'),(3,'Hey guys','There is a boss in Metal Gear Solid 3 that can be defeated by not playing the game for a week; or by changing the date.','2019-08-30 18:25:49');";
        dbAssignment.query(postsData, function (err, result) {
            if (err) {
                console.log(err);
                return;
            };
            console.log("Table created");
      });
    });
    
    let createCommentsTable = "CREATE TABLE IF NOT EXISTS comments (commentId int(11) NOT NULL AUTO_INCREMENT,commentBody varchar(1024) NOT NULL,fkId int(11) DEFAULT NULL,date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,PRIMARY KEY (commentId),KEY fkId (fkId),CONSTRAINT comments_ibfk_1 FOREIGN KEY (fkId) REFERENCES posts (id) ON DELETE CASCADE)";
    dbAssignment.query(createCommentsTable, function (err, result) {
        if (err) {
            console.log(err);
            return;
        };
        console.log("Table comments created");

        let commentsData = "INSERT INTO `comments` VALUES (1,'I agree',1,'2019-08-30 08:44:03'),(2,'Haha I gotta try that!',3,'2019-08-30 18:26:09');";
         dbAssignment.query(commentsData, function (err, result) {
            if (err) {
                console.log(err);
                return;
            };
            console.log("Data for comments created created");
         });
      });
    
});
*/
var db = mysql.createPool(
dbinfo
);

// Attempt to catch disconnects 
db.on('connection', function (connection) {

    console.log('DB Connection established');

    connection.on('error', function (err) {
        console.error(new Date(), 'MySQL error', err.code);
    });
    connection.on('close', function (err) {
        console.error(new Date(), 'MySQL close', err);
    });
});

module.exports = dbinfo;
module.exports = db;


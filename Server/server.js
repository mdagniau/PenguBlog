var express = require('express');
var bodyParser = require ('body-parser');
var pg = require('pg');

//Connection to database
var connectionString = process.env.DATABASE_URL || 'postgres://pengu:pengu@localhost:5432/pengu';
var client = new pg.Client(connectionString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
    }
    console.log('connection ok');


  var app = express();

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  var server = app.listen(8090, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
  });



  /*********************************************************
   *   CREATION TABLES
   *********************************************************/

  	
//Creation table users
/*	client.query('CREATE TABLE IF NOT EXISTS users(id integer PRIMARY KEY, pseudo VARCHAR(255) not null, lastname VARCHAR(255) not null, firstname VARCHAR(255) not null, email VARCHAR(255) not null, password VARCHAR(255) not null)', function(err, result) {
    	if(err) {
			return console.error('error running query', err);
    	}
	});*/

    //Creation table articles
   /* client.query('CREATE TABLE IF NOT EXISTS articles(id integer PRIMARY KEY, title VARCHAR(255) not null, body TEXT not null, author VARCHAR(255) not null, date_creation date not null, date_update date)', function(err, result) {
    	if(err) {
			return console.error('error running query', err);
    	}
	});
	client.end();*/
    
    //Creation table comments
    /*client.query('CREATE TABLE IF NOT EXISTS comments(id integer PRIMARY KEY, id_article integer not null, title VARCHAR(255) not null, body TEXT not null, author VARCHAR(255) not null, date_creation date not null, date_update date CONSTRAINT fk_article_comment FOREIGN KEY (id_article) REFERENCES articles(id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE))', function(err, result) {
    	if(err) {
			return console.error('error running query', err);
    	}
	});
	client.end();*/

    //Creation table favoritesArticles
   /* client.query('CREATE TABLE IF NOT EXISTS favoritesArticles(id_user integer not null, id_article integer not null, PRIMARY KEY (id_user, id_article), KEY primary_key (id_favoritesArticles), CONSTRAINT fk_user_favoritesArticles FOREIGN KEY (id_user) REFERENCES users(id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE), CONSTRAINT fk_article_favoritesArticles FOREIGN KEY (id_article) REFERENCES articles(id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE)', function(err, result) {
    	if(err) {
			return console.error('error running query', err);
    	}
	});
	client.end();*/

    console.log('All tables are created');




    /*********************************************************
     * GET REQUESTS
     *********************************************************/

    app.post('/login', bodyParser.json(), function(req, res) {
      console.log(req.body);
      res.send('OK');
    });

    app.post('/addUser', bodyParser.json(), function(req, res) {
      console.log(req.body);
      res.send('OK');
    });



  /*var userConnected = client.query('SELECT * FROM users LIMIT 1');
  userConnected.on("end", function (result) {
    console.log(JSON.stringify(result, null, "    "));
    client.end();
  });*/

  client.end();
    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
});
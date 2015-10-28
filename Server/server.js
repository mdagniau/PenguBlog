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
  client.query('CREATE TABLE IF NOT EXISTS users(id integer PRIMARY KEY, pseudo VARCHAR(255) not null, lastname VARCHAR(255) not null, firstname VARCHAR(255) not null, email VARCHAR(255) not null, password VARCHAR(255) not null, CONSTRAINT uniq_pseudo UNIQUE (pseudo))', function(err, result) {
    	if(err) {
			return console.error('error running query', err);
    	}
	});

    //Creation table articles
  client.query('CREATE TABLE IF NOT EXISTS articles(id integer PRIMARY KEY, title VARCHAR(255) not null, body TEXT not null, author text not null, date integer not null, CONSTRAINT pk_author FOREIGN KEY (author) REFERENCES users (pseudo) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION)', function(err, result) {
    	if(err) {
			return console.error('error running query', err);
    	}
	});
    
    //Creation table comments
  client.query('CREATE TABLE IF NOT EXISTS commentaires(id integer NOT NULL, id_article integer NOT NULL, body text NOT NULL, author text NOT NULL, date_creation integer NOT NULL, CONSTRAINT id PRIMARY KEY (id), CONSTRAINT id_article FOREIGN KEY (id_article) REFERENCES articles (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION, CONSTRAINT pk_author FOREIGN KEY (author) REFERENCES users (pseudo) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION)', function(err, result) {
    	if(err) {
			return console.error('error running query', err);
    	}
	});

    //Creation table favoritesArticles
  /* client.query('CREATE TABLE IF NOT EXISTS favoritesArticles( id_user integer NOT NULL, id_article integer NOT NULL, CONSTRAINT "id_favoritesArticles" PRIMARY KEY (id_user, id_article), CONSTRAINT id_article FOREIGN KEY (id_article) REFERENCES articles (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION, CONSTRAINT id_user FOREIGN KEY (id_user) REFERENCES users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION)', function(err, result) {
    	if(err) {
			return console.error('error running query', err);
    	}
	});*/

    console.log('All tables are created');




    /*********************************************************
     * GET REQUESTS USER
     *********************************************************/

    app.post('/login', bodyParser.json(), function(req, res) {
      var query = 'SELECT * FROM users WHERE users.pseudo = \'' + req.body.pseudo +'\' AND users.password = \''+ req.body.password +'\' ';
      client.query(query, function(err, result) {
        if(err) {
          console.error('error running query', err);
        }
        res.statusCode = 200;
        res.send(result);
      });
    });

    app.post('/addUser', bodyParser.json(), function(req, res) {
      client.query('SELECT id FROM users', function(err, result) {
        var query = 'INSERT INTO users(id, pseudo, lastname, firstname, email, password) VALUES('+result.rowCount+',\''+req.body.pseudo+'\',\''+req.body.lastName+'\',\''+req.body.firstName+'\',\''+req.body.email+'\',\''+req.body.password+'\')';
        client.query(query, function(err, result) {
          if(err) {
            console.error('error running query', err);
          }
          res.send('OK'); 
        });
      });      
    });

    app.post('/updateUser', bodyParser.json(), function(req, res) {
        var query = 'UPDATE users SET lastname = \''+req.body.lastName+'\', firstname = \''+req.body.firstName+'\', email = \''+req.body.email+'\', password = \''+req.body.password+'\' WHERE pseudo = \'' +req.body.pseudo+'\'' ;
        client.query(query, function(err, result) {
          if(err) {
            console.error('error running query', err);
          }
          res.send('OK'); 
        });    
    });

    app.post('/deleteUser', bodyParser.json(), function(req, res) {
        var query = 'DELETE FROM users WHERE pseudo = \'' +req.body.pseudo+'\'' ;
        client.query(query, function(err, result) {
          if(err) {
            console.error('error running query', err);
          }
          res.send('OK'); 
        });    
    });

     /*********************************************************
     * GET REQUESTS ARTICLES
     *********************************************************/

    app.post('/addArticle', bodyParser.json(), function(req, res) {
      client.query('SELECT id FROM articles', function(err, result) {
        var query = 'INSERT INTO articles(id, title, body, date, author) VALUES('+result.rowCount+',\''+req.body.title+'\',\''+req.body.body+'\','+req.body.date+', \''+req.body.author+'\')';
        client.query(query, function(err, result) {
          if(err) {
            console.error('error running query', err);
          }
          res.send('OK'); 
        });
      });      
    });

    app.post('/deleteArticle', bodyParser.json(), function(req, res) {
      client.query('SELECT id FROM articles', function(err, result) {
        var query = 'DELETE FROM articles WHERE id =\''+req.body.idArticle+'\'';
        client.query(query, function(err, result) {
          if(err) {
            console.error('error running query', err);
          }
          res.send('OK'); 
        });
      });      
    });

    app.get('/getArticles', bodyParser.json(), function(req, res) {
      var query = 'SELECT * FROM articles';
      client.query(query, function(err, result) {
        if(err) {
          console.error('error running query', err);
        }
        res.statusCode = 200;
        res.send(result);
      });
    });

    app.post('/getArticlesByUser', bodyParser.json(), function(req, res) {
      var query = 'SELECT * FROM articles WHERE author = \''+req.body.pseudo +'\'';
      client.query(query, function(err, result) {
        if(err) {
          console.error('error running query', err);
        }
        res.statusCode = 200;
        res.send(result);
      });
    });

    /*********************************************************
     * GET REQUESTS FAVORITE ARTICLES
     *********************************************************/

    app.post('/addFavorite', bodyParser.json(), function(req, res) {
      client.query('SELECT id FROM favoritesarticles', function(err, result) {
        var query = 'INSERT INTO favoritesarticles(id, author, id_article) VALUES('+0+',\''+req.body.pseudo +'\', \'' + req.body.article+'\')';
        console.log("query "+query);
        client.query(query, function(err, result) {
          if(err) {
            console.error('error running query', err);
          }
          res.statusCode = 200;
          res.send(result);
        });
      });
    });

    app.post('/deleteFavorite', bodyParser.json(), function(req, res) {
      var query = 'DELETE FROM favoritesarticles WHERE user = \''+req.body.pseudo+'\' AND id_article = \''+req.body.article +'\'';
      client.query(query, function(err, result) {
        if(err) {
          console.error('error running query', err);
        }
        res.statusCode = 200;
        res.send(result);
      });
    });

    app.post('/getFavoritesByUser', bodyParser.json(), function(req, res) {
      var query = 'SELECT id_article FROM favoritesarticles WHERE user = \''+req.body.pseudo+'\' ';
      client.query(query, function(err, result) {
        if(err) {
          console.error('error running query', err);
        }
        res.statusCode = 200;
        res.send(result);
      });
    });

     /*********************************************************
     * GET REQUESTS COMMENTS
     *********************************************************/

    app.post('/addComment', bodyParser.json(), function(req, res) {
      client.query('SELECT id FROM commentaires', function(err, result) {
        var query = 'INSERT INTO commentaires(id, id_article, body, id_user, date_creation) VALUES('+result.rowCount+',\''+req.body.article+'\',\''+req.body.bodyComment+'\',\''+req.body.author+'\','+ req.body.date +')';
        client.query(query, function(err, result) {
          if(err) {
            console.error('error running query', err);
          }
          res.send('OK'); 
        });
      }); 
    });  

    app.post('/deleteComment', bodyParser.json(), function(req, res) {
      var query = 'DELETE FROM commentaires WHERE id= \''+req.body.idComment+'\'';
      client.query(query, function(err, result) {
        if(err) {
          console.error('error running query', err);
        }
        res.send('OK'); 
      }); 
    }); 

    app.post('/getCommentsByArticle', bodyParser.json(), function(req, res) {
      var query = 'SELECT * FROM commentaires WHERE id_article = \''+req.body.article+'\'';
      client.query(query, function(err, result) {
        if(err) {
          console.error('error running query', err);
        }
        res.statusCode = 200;
        res.send(result);
      });
    });  

});
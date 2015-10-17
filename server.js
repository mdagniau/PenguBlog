var pg = require('pg');
//var connectionString = process.env.DATABASE_URL || 'pengu:pengu//postgres:@localhost:5432/pengu';
var connectionString = process.env.DATABASE_URL || 'postgres://pengu:pengu@localhost:5432/pengu';
var client = new pg.Client(connectionString);
client.connect(function(err) {
	if(err) {
		return console.error('could not connect to postgres', err);
  	}
  	console.log('connection ok');
  	
  	//Creation table users
  	client.query('CREATE TABLE IF NOT EXISTS users(id integer PRIMARY KEY, pseudo VARCHAR(255) not null, lastname VARCHAR(255) not null, firstname VARCHAR(255) not null, email VARCHAR(255) not null, password VARCHAR(255) not null)', function(err, result) {
    	if(err) {
			return console.error('error running query', err);
    	}
	});
	client.end();

    //Creation table articles
    client.query('CREATE TABLE IF NOT EXISTS articles(id integer PRIMARY KEY, title VARCHAR(255) not null, body TEXT not null, author VARCHAR(255) not null, date_creation date not null, date_update date)', function(err, result) {
    	if(err) {
			return console.error('error running query', err);
    	}
	});
	client.end();
    
    //Creation table comments
    /*client.query('CREATE TABLE IF NOT EXISTS comments(id integer PRIMARY KEY, id_article integer not null, title VARCHAR(255) not null, body TEXT not null, author VARCHAR(255) not null, date_creation date not null, date_update date CONSTRAINT fk_article_comment FOREIGN KEY (id_article) REFERENCES articles(id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE))', function(err, result) {
    	if(err) {
			return console.error('error running query', err);
    	}
	});
	client.end();*/

    //Creation table favoritesArticles
    client.query('CREATE TABLE IF NOT EXISTS favoritesArticles(id_user integer not null, id_article integer not null, PRIMARY KEY (id_user, id_article), KEY primary_key (id_favoritesArticles), CONSTRAINT fk_user_favoritesArticles FOREIGN KEY (id_user) REFERENCES users(id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE), CONSTRAINT fk_article_favoritesArticles FOREIGN KEY (id_article) REFERENCES articles(id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE)', function(err, result) {
    	if(err) {
			return console.error('error running query', err);
    	}
	});
	client.end();

    console.log('All tables are created');

    

  /*var userConnected = client.query('SELECT * FROM users LIMIT 1');
  userConnected.on("end", function (result) {
    console.log(JSON.stringify(result, null, "    "));
    client.end();
  });*/


    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
});
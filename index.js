var express = require('express');
var app = express();
var pg = require('pg');
pg.defaults.ssl = true;

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var connString = process.env.DATABASE_URL || "postgres://localhost/mylocaldb";

app.get('/passwords/:difficulty', function (request, response) {
	var diff = request.params.difficulty;
	if (diff == "easy" || diff == "medium" || diff == "hard")
  pg.connect(connString, function(err, client, done) {
    client.query('SELECT * FROM words WHERE difficulty = \'' + request.params.difficulty + '\' ORDER BY random() LIMIT 22;'
	    , function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       {
	       var retrievedWords = [];
	       for (var i = 0; i < result.rows.length; i++) {
			retrievedWords.push(result.rows[i]["word"]);
	       }
	       response.send(JSON.stringify(retrievedWords)); 
       }
    });
  });
	else
		response.send("Invalid Difficulty!");
});

app.get('/', function (req, res) {
	res.send("Default Stuff");
	
})


var server = app.listen(process.env.PORT, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("wordvault app listening at http://%s:%s", host, port)
})

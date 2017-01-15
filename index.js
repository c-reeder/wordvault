var express = require('express');
var app = express();
var pg = require('pg');
pg.defaults.ssl = true;

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.get('/passwords/easy', function (request, response) {
	var words = getPasswords("Easy");
	response.send(JSON.stringify(words));

});

app.get('/passwords/medium', function (request, response) {
	var words = getPasswords("Medium");
	response.send(JSON.stringify(words));

});

app.get('/passwords/hard', function (request, response) {
	var words = getPasswords("Hard");
	response.send(JSON.stringify(words));

});

app.get('/', function (req, res) {
	res.send("Default Stuff");
	
})

function getPasswords(diff) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM words WHERE difficulty = \''
	    + diff
	    + '\' ORDER BY random() LIMIT 20;'
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
	       return retrievedWords;
       }
    });
  });
}


var server = app.listen(process.env.PORT, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})

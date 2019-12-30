var express = require('express');
var app = express();

const { Pool } = require('pg');

var connString = process.env.DATABASE_URL || "postgres://localhost/wordvault";

const pool = new Pool({
	connectionString: connString,
	ssl: true,
});

pool.on('error', (err, client) => {
	console.error('Unexpected error on idle client', err)
	process.exit(-1)
})

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.get('/words/:language/:difficulty', function (request, response) {
	var lang = request.params.language;
	var diff = request.params.difficulty;

	if (lang != "English" && lang != "Spanish") {
		response.send("Invalid Language: \"" + lang + "\"");
	}
	else if (diff == "easy" || diff == "medium" || diff == "hard") {
		pool.connect((err,client, done) => {
			if (err) throw err;
			client.query('SELECT * FROM words WHERE language = \'' + lang + '\' AND difficulty = \'' + diff + '\' ORDER BY random() LIMIT 22;', (err, res) => {
				done();
				if (err)
				{ console.error(err); response.send("Error " + err); }
				else
				{
					var retrievedWords = [];
					for (var i = 0; i < res.rows.length; i++) {
						retrievedWords.push(res.rows[i]["word"]);
					}
					response.send(JSON.stringify(retrievedWords)); 
				}
			});
		});
	} else
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


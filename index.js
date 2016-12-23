var express = require('express');
var app = express();

app.get('/', function (req, res) {
	res.send("Default Stuff");
})

app.get('/passwords', function (req, res) {
	var wordArray = ["Scrumptious", "Wonderful", "Delicious", "Handsome"];
	res.send(JSON.stringify(wordArray));
})

var server = app.listen(process.env.PORT, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})

var express = require('express');
var app = express();

app.get('/', function (req, res) {
	res.send("Default Stuff");
})

app.get('/passwords', function (req, res) {
	var wordArray = [
		"cat", "sun", "cup",
		"ghost", "flower", "pie",
		"cow", "banana", "snowflake",
		"bug", "book", "jar",
		"snake", "light", "tree",
		"lips", "apple", "slide",
		"socks", "smile", "swing",
		"coat", "shoe", "water",
		"heart", "hat", "ocean",
		"kite", "dog", "mouth",
		"milk", "duck", "eyes",
		"skateboard", "bird", "boy",
		"apple", "person", "girl",
		"mouse", "ball", "house",
		"star", "nose", "bed",
		"whale", "jacket", "shirt",
		"hippo", "beach", "egg",
		"face", "cookie", "cheese",
		"ice", "cream", "cone drum circle",
		"spoon", "worm", "spider web"
	];
	res.send(JSON.stringify(wordArray));
})

var server = app.listen(process.env.PORT, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})

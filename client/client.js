// Required Modules
var express    = require("express");
var app        = express();

	var port = process.env.PORT || 3000;

	app.use(express.static("client"));
	//app.use(express.static(__dirname));

	app.get("/", function(req, res) {
	    res.sendFile("./client/index.html");
	});

// Start Server
app.listen(port, function () {
    console.log( "Express server listening on port " + port);
});
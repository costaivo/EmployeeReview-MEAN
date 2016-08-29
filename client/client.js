// Required Modules
var express    = require("express");
var app        = express();

	// var port = process.env.PORT || 3000;
	var port=require("./client/constants/constants.env").constants.port;


	app.use(express.static("client"));

	app.get("/", function(req, res) {
	    res.sendFile("./client/index.html");
	});
	console.log(port);

// Start Server
app.listen(port, function () {
    console.log( "Express server listening on port " + port);
});
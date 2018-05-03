// express is the server that forms part of the nodejs program
var express = require('express');
var path = require("path");
var app = express();
	var fs = require('fs');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

	// adding functionality to allow cross-domain queries when PhoneGap is running a server
	app.use(function(req, res, next) {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
		res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		next();
	});

//upload question from question form app
app.post('/uploadData',function(req,res){
	// note that we are using POST here as we are uploading data
	// so the parameters form part of the BODY of the request rather than the RESTful API
	console.dir(req.body);

 	pool.connect(function(err,client,done) {
       	if(err){
          	console.log("not able to get connection "+ err);
           	res.status(400).send(err);
       	} 
//hold geometry value
var geometrystring = "st_geomfromtext('POINT(" + req.body.longitude + " " +req.body.latitude + ")'";
//insert sql of question , choice , answer and geometry into database	
var querystring = "INSERT into questions (question,choice_1,choice_2,choice_3,choice_4,answer,geom) values ('";
querystring = querystring + req.body.question + "','" + req.body.choice_1 + "','" + req.body.choice_2 + "','";
querystring = querystring + req.body.choice_3 + "','" + req.body.choice_4 + "'," + req.body.answer+","+geometrystring+"))";
       	console.log(querystring);
       	client.query( querystring,function(err,result) {
          done(); 
          if(err){
               console.log(err);
               res.status(400).send(err);
          }
          res.status(200).send("Update data successfully");
       });
    });

});

//upload user answer from quiz app
app.post('/uploadUseranswer',function(req,res){
	// note that we are using POST here as we are uploading data
	// so the parameters form part of the BODY of the request rather than the RESTful API
	console.dir(req.body);

 	pool.connect(function(err,client,done) {
       	if(err){
          	console.log("not able to get connection "+ err);
           	res.status(400).send(err);
       	} 

//insert sql of question , choice , answer and geometry into database	
var querystring = "INSERT into useranswers (user_id,user_answer,questionid) values (";
querystring = querystring + req.body.user_id + "," + req.body.user_answer + ","+req.body.questionid + ")" ;
       	console.log(querystring);
       	client.query( querystring,function(err,result) {
          done(); 
          if(err){
               console.log(err);
               res.status(400).send(err);
          }
          res.status(200).send("Answer Uploaded");
       });
    });

});


// get question
app.get('/getQuestion', function (req,res) {
     pool.connect(function(err,client,done) {
       if(err){
           console.log("not able to get connection "+ err);
           res.status(400).send(err);
       } 
        // use the inbuilt geoJSON functionality
        // and create the required geoJSON format using a query adapted from here:  http://www.postgresonline.com/journal/archives/267-Creating-GeoJSON-Feature-Collections-with-JSON-and-PostGIS-functions.html, accessed 4th January 2018
        // note that query needs to be a single string with no line breaks so built it up bit by bit

        	var querystring = " SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features  FROM ";
        	querystring = querystring + "(SELECT 'Feature' As type     , ST_AsGeoJSON(lg.geom)::json As geometry, ";
        	querystring = querystring + "row_to_json((SELECT l FROM (SELECT id,question, choice_1,choice_2,choice_3,choice_4,answer) As l      )) As properties";
        	querystring = querystring + "   FROM questions  As lg limit 100  ) As f ";
        	console.log(querystring);
        	client.query(querystring,function(err,result){

          //call `done()` to release the client back to the pool
           done(); 
           if(err){
               console.log(err);
               res.status(400).send(err);
           }
           res.status(200).send(result.rows);
       });
    });
});
	// adding functionality to log the requests
	app.use(function (req, res, next) {
		var filename = path.basename(req.url);
		var extension = path.extname(filename);
		console.log("The file " + filename + " was requested.");
		next();
	});
	

	// read in the file and force it to be a string by adding “” at the beginning
	var configtext = ""+fs.readFileSync("/home/studentuser/certs/postGISConnection.js");

	// now convert the configruation file into the correct format -i.e. a name/value pair array
	var configarray = configtext.split(",");
	var config = {};
	for (var i = 0; i < configarray.length; i++) {
		var split = configarray[i].split(':');
		config[split[0].trim()] = split[1].trim();
	}
	var pg = require('pg');
	var pool = new pg.Pool(config);
	console.log(config);


	
	// add an http server to serve files to the Edge browser 
	// due to certificate issues it rejects the https files if they are not
	// directly called in a typed URL
	var http = require('http');
	var httpServer = http.createServer(app); 
	httpServer.listen(4480);
	
	
	
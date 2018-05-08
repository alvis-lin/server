# How to make Question Setting app and quiz app?

## Introduction

Question Setting app is a web browser based application, which allows users to set the question to be asked in the quiz application and stores those questions in the database.
A Quiz App is a mobile location based application. This application will track the user’s location, and show up the question from a Question Setting app, when the user is near to the location of each question.
The user's answer would be stored in the database. Thus,there are three major components to build each application, which are web client, web server and database.
Web client is computer, mobile phone and laptop. Web client would request and response with the web server, which are internet, information server. The web server would query information by using SQL query from the database.

## Hardware requirement

Android 5 onward for testing the application on mobile phone

## Software requirement

SSH file transfer system such as Bitvise SFTP for windows and Fugu for Mac

Github (a version control system)

Phonegap

## Database

PostGres SQL

## Language used

### Client side code

HTML5

Javascript

CSS

### Server side code

Javascript (node.js)

SQL

## Link to download the code

Question Setting App : [question]

Quiz App: [quiz]

Server App: [server]

## Design Vision

Both applications use template available at [material-template] to create the web template.
The template are used in [question-index.html],[question-style.css],[quiz-index.html] and [quiz-style.css].
To be specific, both application used this template to create pretty header, tab bar, content section and button.

## What API used?

In both applications, leaflet API is applied to create map.

Step 1 - Import leaflet API leaflet.js and leaflet.css file into [question-index.html] and [quiz-index.html].

Example code

	</style>
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.1.0/dist/leaflet.css"integrity="sha512-wcw6ts8Anuw10Mzh9Ytw4pylW8+NAD4ch3lqm9lzAsTxg0GFeJgoAtxuCLREZSC5lUXdVyo/7yfsqFjQ4S+aKw=="crossorigin=""/>
	
	<script src="https://unpkg.com/leaflet@1.1.0/dist/leaflet.js"integrity="sha512-mNqn2Wg7tSToJhvHcqfzLMU6J4mkOImSPTxVZAdo+lcPlk+GhZmYgACEe0x35K7YzW1zJ7XyJV/TT1MrdXvMcA=="crossorigin=""></script>

	<style type="text/css">
		#mapid { height: 180px; }
	</style>

Step 2 - Create a map in [question-appActivity.js] and [quiz-appActivity.js]

Example code


	var mymap = L.map('mapid').setView([51.505, -0.09], 13);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {maxZoom: 18,attribution: 'Map data &copy; <ahref="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +'Imagery © <a href="http://mapbox.com">Mapbox</a>',id: 'mapbox.streets'}).addTo(mymap);


## Question Setting app

Noted that Phonegap server need to be opened every time that user's would like to test the application.
To open Phonegap server, type  "phonegap serve" into the bitvise terminal console.

### Overview

The Question Setting App is an browser based application for users to generate question to be asked in Quiz App.

### Task Requirement

The system allows user to fill in questions, four multiple choices answers, answer to the question and question's location.

The system allows user to track their location and pick the question's location on the map.

The system allows user to upload question's information to the database.

### Database table

Questions table is used in the Question Setting app. There are 8 columns in questions table, which are id, question, choice 1, choice 2, choice 3, choice 4, answer and geom.
All of the columns would store as string apart from id, answer and geom. id, answer and geom are stored as serial, integer and geometry respectively.
.

### Features

Featureset in this application composed of question information, location, upload to database and Refresh form and Refresh Map . 

#### Question Information

This part is for the user to fill in the question informations, which are questions, four multiple choices answers and answer of the question.
This part would be on the Question Setting content. HTML5 is used to create the text box and radio button for user to fill in the information.
Question and four multiple choices answer would use text box, but answer of the question would use radio button to avoid user from filling non-integer value.

Example code to create text box in [question-index.html]

** Noted that id would be used for getting the value, which user filled.

	<label for="question">Question</label><input type="text" size="25" id="question"/><br />

Example code to radio button in [question-index.html]

	Choice 1: <input type="radio" name="amorpm" id="1" /><br />


#### Location

This part is for the user to fill in the location's of question. Location information comprises of Latitude and Longitude.

There are three functions, which user could use for filling the question's location.

1.The system would allow the user to fill in the latitude and longitude in the text box to be the location of the question.
In this function, HTML5 is used creating the text box for filling latitude and longitude value.

2.The system would allow the user to click on the map to define the question's location. When user clicking on the map, the latitude and longitude location 
have to return to the text box.
In this function, HTML5 is used to hold the map and Javascript is used to define function for clicking on the map and return Latitude and Longitude value to the text box.

Example code for div that holding map in [question-index.html]

	<div id="mapid" style="width: 1000px; height: 500px;"></div>

Example code for clicking on the map function in [question-appActivity.js]

	mymap.on('click', function (e) {

    marker = new L.Marker(e.latlng, { draggable: true }).addTo(mymap);	

	});
	
Example code for returning value to the text box in [question-appActivity.js]

	//define latitude and longitude variable
	var latitude = marker.getLatLng().lat;
	//add value to text box
	document.getElementById("latitude").value = latitude ;
	
3.The system would allow the user to track their location and return latitude and longitude value to the text box.
 In this function, HTML5 is used to hold the map and button to track user's location and Javascript is used to define function for tracking user's location and return Latitude and Longitude value to text box.
 
 Example code for creating button in [question-index.html]
 
	<a href="#" class="mdl-button"onclick='trackLocation();return'><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">person_pin_circle</i>Track my location</a>
 
 Example code for tracking user's location in [question-appActivity.js]

	function trackLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		document.getElementById('showLocation').innerHTML = "Geolocation is not supported by this browser.";
		}
	}

	var marker;
	function showPosition(position) {
		marker = new L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap); //add user's location marker
		marker
		mymap.panTo(new L.LatLng(position.coords.latitude, position.coords.longitude), 18) //pan the map to user's location marker
	}

#### Upload to database

This part is for uploading the user's question information to httpServer.
When the user clicks "Start Upload" button, the data will start upload to httpServer.
There are two functions in this part. 

1. The system would get and process the value from text box and radio button, when the user clicks "Start Upload" button.
This function uses HTML5 to generate "Start Upload" button and Javascript to get and process the value from text box and radio button.

Example code for getting the value from text box and radio button in [question-uploadData.js]
**Noted that the value radio button would be stored as integer in database.

	function startDataUpload() {

	//get value from text box by id
	var question = document.getElementById("question").value;
	
	//define the variable that would be used in processData function
	var postString = "question="+question ;

	//get value from the radio button 
	if (document.getElementById("1").checked) {
 		 postString=postString+"&answer="+1;
	}
	if (document.getElementById("2").checked) {
 		 postString=postString+"&answer="+2;
	}
	if (document.getElementById("3").checked) {
 		 postString=postString+"&answer="+3;
	}
	if (document.getElementById("4").checked) {
 		 postString=postString+"&answer="+4;
	}
	
	processData(postString);
	}

2. The system would post the value to httpServer.
This function uses Javascript to post the value from text box and radio button to httpServer 
 
 Example code for posting the value to httpServer in [question-uploadData.js].
 
	function processData(postString) {
	   client = new XMLHttpRequest();
	   client.open('POST','http://developer.cege.ucl.ac.uk:30281/uploadData',true);
	   client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	   client.onreadystatechange = dataUploaded;  
	   client.send(postString);
	}

	function dataUploaded() {
	  if (client.readyState == 4) {
		document.getElementById("dataUploadResult").innerHTML = client.responseText;
		}
	}

#### Refresh form and Refresh Map 

This part is to give convenient to the user to refresh form and refresh map.
These two functions use HTML5 to create button for removing information in the form and the map.
The function is created in Javascript to remove text, checked in the button and maker location on the map.

Example code for removing value from text box and radio button in [question-uploadData.js]
	
	//removing value from text box
	document.getElementById("question").value = null;
	//removing value from radio button
	document.getElementById("1").checked = false;

Example code for removing marker on the map in [question-appActivity.js]

	mymap.removeLayer(marker); 
	
## Quiz app

Some fundamentally elements, which are already introduced in Question Setting App, would not be mentioned again in Quiz App such as how to add the map and how to add the button
Noted that Phonegap server need to be opened every time that user's would like to test the application.
To open Phonegap server, type  "phonegap serve" into the bitvise terminal console.

### Overview

The Quiz App is an android application for users to answer the quiz from Question Setting App.

### Task Requirement

The system allows user to track user's location.

The system would pop up the quiz, if the quiz's location is nearby the user.

The system allows user to fill in and upload the user id and user's answer to the database.

The system would tell the user, if the answer is correct or incorrect, and provide the answer for the user.

### Database table

useranswers table is used in the quiz app. There are 4 columns in user_answer table, which are id, user_id, user_answer and questionid. 
All of the column is stored in integer. Noted that questionid is the foreign key, which links with id from questions table.


### Features

There are four important featureset in Quiz App, which are user's location, get the question information, display the nearby question, checking user's answer and upload user's answer to database

#### User’s location

This feature is only track the user's location by not displaying the user's location on the map.

Here is the example code to track the user's location in [quiz-appActivity.js] .
Noted that in this case watchPosition is used instead of getCurrentPosition because the user's location would be tracked more than one time.

	function trackLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.watchPosition(showPosition);
	} else {
		document.getElementById('showLocation').innerHTML = "Geolocation is not supported by this browser.";
		}
	}
	
	var latitude;
	var longitude;
	function showPosition(position) {
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;
		return latitude ,longitude;
	}

#### Get the question Information

This feature is used Javascript for getting question from the httpServer and convert the text into GeoJSON file in order to get the location of the question.

Example of getting question information from httpServer in [quiz-appActivity.js].

	var questionslayer;

	function getQuestions(){
		client = new XMLHttpRequest();
		client.open('GET','http://developer.cege.ucl.ac.uk:30281/getQuestion');
		client.onreadystatechange = questionsResponse;
		client.send();
	}
	
	function questionsResponse(){
	if(client.readyState == 4){
		var questionsdata = client.responseText;
		loadquestionslayer(questionsdata);
		}
	}

Example of converting text into GeoJSON in [quiz-appActivity.js].

	function loadquestionslayer(questionsdata){
				//convert the text to JSON
				var questionsjson = JSON.parse(questionsdata);				
				questionslayer = L.geoJson(questionsjson)
			}

#### Display the nearby question 

In order to display the nearby question, the distance between user's location and question's location should be calculated.
500 meters is criterion for displaying the question. The rule is set that the question, which has the distance less than 500 meters from the user's location, would be popped up on the map.
HTML5 is used to hold the map and create button to display the question. All of the functions are created by Javascript in [quiz-appActivity.js]

The code to calculate distance between two locations.

	function calculateDistance(lat1, lon1, lat2, lon2, unit) {
	var radlat1 = Math.PI * lat1/180;
	var radlat2 = Math.PI * lat2/180;
	var radlon1 = Math.PI * lon1/180;
	var radlon2 = Math.PI * lon2/180;
	var theta = lon1-lon2;
	var radtheta = Math.PI * theta/180;
	var subAngle = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	subAngle = Math.acos(subAngle);
	subAngle = subAngle * 180/Math.PI; 
	dist = (subAngle/360) * 2 * Math.PI * 3956; 
	// where radius of the earth is 3956 miles
	if (unit=="K") { dist = dist * 1.609344 ;} // convert miles to km
	if (unit=="N") { dist = dist * 0.8684 ;} // convert miles to nautical miles
	return dist;
	}

The code used to display question's location, which is less than 500 meters to user's location.
The below code is also pop up text box for user to fill in user's id, the question, radio button for selecting the answer of four multiple choice, button for uploading question's id ,user's id and user's answer
It is the combination between HTML5 and Javascript.

	//The below function will pop up nearby question, upload user id, user answer
	var questionnear;
	var q_a_id; //define variable to hold id of question. This will upload to database as foreign key.
	var a; //define variable for the answer of the question
	//extract latitude and longitude form GEOJSON
	function questioncoords (feature , latlng){
		//calculate question distance and popup question
		var distance = calculateDistance(latitude,longitude, feature.geometry.coordinates[1],feature.geometry.coordinates[0], 'K');
		//add distance as one of properties
		feature.properties.distance = distance;
		//user id text box
		user_id = '<label for="user_id">User ID:</label><input type="text" size="10" id="user_id"/>';
		//define question id, question, choices and answer variable
		q_id = feature.properties.id;
		q = feature.properties.question;
		c_1 = feature.properties.choice_1;
		c_2 = feature.properties.choice_2;
		c_3 = feature.properties.choice_3;
		c_4 = feature.properties.choice_4;
		answer = feature.properties.answer;
		//button for answer question
		radio_b1 = '<input type="radio" name="amorpm" id="1" />';
		radio_b2 = '<input type="radio" name="amorpm" id="2" />';
		radio_b3 = '<input type="radio" name="amorpm" id="3" />';
		radio_b4 = '<input type="radio" name="amorpm" id="4" />';
		//upload button and result message
		upload_b = '<a href="#" class="mdl-button"onclick="checkResult();return"><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">publish</i>Answer</a>';
		upload_r = '<div id="dataUploadResult">Upload Result</div>'
		//information in popup
		q_c = user_id+"<br />"+"<b>"+q+"</b>"+"<br />"+radio_b1+c_1+"<br />"+radio_b2+c_2+"<br />"+radio_b3+c_3+"<br />"+radio_b4+c_4+"<br />"+upload_b+"<br />"+upload_r+"<br />";
		//if distance between question and user's location less than 500 meters pop up the question
		if (feature.properties.distance < 0.5) {
			q_a_id = q_id;	//define id of the question that is less than 500 meters from  user's location
			a = answer;		//define answer of the question that is less than 500 meters from  user's location
			questionnear = L.marker(latlng).addTo(mymap.panTo(latlng,22)).bindPopup(q_c).openPopup();	//pop up the question
		}
		}
		
questioncoords function and trackLocation function should be combined with getQuestions function to enable the usage.
It is because the latitude and longitude of user's location and question's location are received from those two functions and
calculateDistance function uses latitude and longitude of both user and question.

Example of calling two function in one function

	function questionTrack(){
		trackLocation(),getQuestions();
	}

The questionTrack function is then applied to "Track My Location" button in [quiz-index.html].

#### Checking user's answer 

This part is to check if the user's answer is correct or incorrect. 
There is two steps to check the user's answer.

1. Get of user's answer from the radio button and define it as integer values, which are 1,2,3 and 4. The value is define as integer because the answer of the question stored as integer and we want to compare
between the two values.

	if (document.getElementById("1").checked) {
 		 user_answer = 1;
		}
		if (document.getElementById("2").checked) {
		user_answer = 2;
		}
		if (document.getElementById("3").checked) {
		user_answer = 3;
		}
		if (document.getElementById("4").checked) {
		user_answer = 4;
		}

2. Compare the user's answer with the question's answer. If the answer is the same, tell the user that it is correct. If the answer is not the same, tell the user that it is incorrect and show the correct answer to the user.

	if (user_answer === a) {
		return	alert ("correct answer");
	}else{
		return alert("wrong answer. The answer is choice "+a); 
	}
	}


#### Upload user's answer to database

The button to upload the answer is "answer" button generated in [quiz-appActivity.js]. 

	upload_b = '<a href="#" class="mdl-button"onclick="checkResult();return"><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">publish</i>Answer</a>';
	
The checkResult function combines two functions together, which are startDataUpload and processResult.

startDataUpload function would upload question id, user id and user's answer to httpServer.
Question id is a foreign key for linking with the id in questions table.
The method is similar to how to upload the question's information to database.
The example code is in [question-uploadUseranswer.js].

The processResult function would check the correctness of user's answer.


## Server 

Noted that httpServer.js need to be opened every time that user's would like to get or post information to the database.
To open http server, type  "node httpServer.js&" in to the bitvise terminal console.

### Overview

Server side is a mandatory component for both Question Setting App and Quiz App as these two applications need to get and post information from and to the database.

### Task Requirement

The server would get information of the question from Question Setting App and store it in the central database.

The server would post information of question from the central database to the quiz app.

The server would get information of user's answer from the Quiz App and store it in the central database.

### Features

There are four features in server side, which are form node js program, connect to postGIS database, post information and get information.
Javascript is used to form node js server. All of the code is available in [server-httpServer].


#### Form node js program

This part is to form part of node js program to connect between web client, web server and database.

	var express = require('express');
	var path = require("path");
	var app = express();
		var fs = require('fs');
	var bodyParser = require('body-parser');

	app.use(bodyParser.urlencoded({
	  extended: true
	}));
	app.use(bodyParser.json());
	
In addition, the functionality to query while phonegap server is running is also added.

	app.use(function(req, res, next) {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
		res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		next();
	});

#### Connect to postGIS database

1.Put host, user, database, password and port in PostGISConnection.js file and put the file in certs folder in Bitvise

2. Add the code to connect with PostGISConnection.js file in 

	var configtext = ""+fs.readFileSync("/home/studentuser/certs/postGISConnection.js");

	var configarray = configtext.split(",");
	var config = {};
	for (var i = 0; i < configarray.length; i++) {
		var split = configarray[i].split(':');
		config[split[0].trim()] = split[1].trim();
	}
	var pg = require('pg');
	var pool = new pg.Pool(config);
	console.log(config);

	var http = require('http');
	var httpServer = http.createServer(app); 
	httpServer.listen(4480);

#### Post information

The Question Setting App and Quiz App need to post question's information and user's answer information respectively to the main database.
The code is the combination between node js Javascript and SQL language. SQL is used for inserting the data into the database.

Example of code to post the question's information from httpServer to the questions table in the database.

	app.post('/uploadData',function(req,res){

	console.dir(req.body);

 	pool.connect(function(err,client,done) {
       	if(err){
          	console.log("not able to get connection "+ err);
           	res.status(400).send(err);
       	} 

	var geometrystring = "st_geomfromtext('POINT(" + req.body.longitude + " " +req.body.latitude + ")'";
		
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

#### Get information

The Quiz App need to get question's information from the main database.
The code is the combination between node js Javascript and SQL language. SQL is used for query the data from the database.

Example of code to get the question's information from questions table in the database.

	app.get('/getQuestion', function (req,res) {
		 pool.connect(function(err,client,done) {
		   if(err){
			   console.log("not able to get connection "+ err);
			   res.status(400).send(err);
		   } 

				var querystring = " SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features  FROM ";
				querystring = querystring + "(SELECT 'Feature' As type     , ST_AsGeoJSON(lg.geom)::json As geometry, ";
				querystring = querystring + "row_to_json((SELECT l FROM (SELECT id,question, choice_1,choice_2,choice_3,choice_4,answer) As l      )) As properties";
				querystring = querystring + "   FROM questions  As lg limit 100  ) As f ";
				console.log(querystring);
				client.query(querystring,function(err,result){

			   done(); 
			   if(err){
				   console.log(err);
				   res.status(400).send(err);
			   }
			   res.status(200).send(result.rows);
		   });
		});
	});



[question]: https://github.com/sariyadilak/question
[quiz]: https://github.com/sariyadilak/quiz
[server]: https://github.com/sariyadilak/server
[material-template]: https://getmdl.io/templates/text-only/index.html
[question-index.html]: https://github.com/sariyadilak/question/blob/master/ucesriy/www/index.html
[question-style.css]: https://github.com/sariyadilak/question/blob/master/ucesriy/www/styles.css
[question-appActivity.js]: https://github.com/sariyadilak/question/blob/master/ucesriy/www/js/appActivity.js
[question-uploadData.js]: https://github.com/sariyadilak/question/blob/master/ucesriy/www/js/uploadData.js
[quiz-index.html]: https://github.com/sariyadilak/quiz/blob/master/ucesriy/www/index.html
[quiz-style.css]: https://github.com/sariyadilak/quiz/blob/master/ucesriy/www/styles.css
[quiz-appActivity.js]: https://github.com/sariyadilak/quiz/blob/master/ucesriy/www/js/appActivity.js
[question-uploadUseranswer.js]: https://github.com/sariyadilak/quiz/blob/master/ucesriy/www/js/uploadUseranswer.js
[server-httpServer]: https://github.com/sariyadilak/server/blob/master/httpServer.js
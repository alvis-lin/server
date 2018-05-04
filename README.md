# How to make question form app and quiz app?

## Introduction

There are three major components to build each application, which are web client, web server and database.

## Hardware requirement

Android 5 onward

Computer

## Software requirement

Bitvise SFTP (SSH file transfer system)

## Database

PostGres SQL

## Language used

### Client side code

HTML5

Javascript

CSS

### Server side code

Javascript

## Link to download the code

Question Form App : [question]

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


## Question Form app

### Overview

The Question Form App is an browser based application for users to generate question to be asked in Quiz App.

### Task Requirement

The system allow user to fill in question, four multiple choices answer, answer to the question and question's location

The system allow user to track their location and pick the question's location on the map

The system allow user to upload question's information to the database.

### Features

Featureset in this application composed of question information, location and upload to database. 

#### Question Information

This part is for the user to fill in the question informations, which are question, four multiple choices answer and answer of the question.
This part would be on the Question Form content. HTML5 is used to create the text box and radio button for user to fill in the information.
Question and four multiple choices answer would use text box, but answer of the question would use radio button to avoid user from filling non-integer.

Example code to create text box in [question-index.html]

** Noted that id would be used for getting the value, which user filled.

	<label for="question">Question</label><input type="text" size="25" id="question"/><br />

Example code to radio button in [question-index.html]

	Choice 1: <input type="radio" name="amorpm" id="1" /><br />


#### Location

This part is for the user to fill in the location's of question. Location information comprises of Latitude and Longitude.

There are three functions, which user could use for filling the question's location.

1.The system would allow the user to fill in the latitude and longitude text box to be the location of the question.
In this function, HTML5 is used creating the text box for filling latitude and longitude value.

2.The system would allow the user to click on the map to define the question's location. The latitude and longitude location when user clicking on the map
have to return to the text box.
In this function, HTML5 is used to hold the map and Javascript is used to define function for clicking on the map and return Latitude and Longitude value to text box.

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
 
 Example code for tracking user's location button in [question-index.html]
 
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
	
	
#### Button

#### Upload to database


## Quiz app

### Overview

The Quiz App is an android application for users to answer the quiz from Question Form App.

### Task Requirement

The system allow user to track user's location.

The system would pop up the quiz, if the quiz's location is nearby the user.

The system allow user to fill in and upload the user id and answer to the database.

The system would tell the user, if the answer is correct or incorrect, and provide the answer for the user.

### Features

#### User’s location

#### Question Information

#### User’s answer

#### Upload to database

## Server 

### Task Requirement

The server would get information of the question from Question Form App and store it in the central database.

The server would post information of question from the central database to the quiz app.

The server would get information of user's answer from the Quiz App and store it in the central database.

### Features

#### Get information

#### Post information











 




[question]: https://github.com/sariyadilak/question
[quiz]: https://github.com/sariyadilak/quiz
[server]: https://github.com/sariyadilak/server
[material-template]: https://getmdl.io/templates/text-only/index.html
[question-index.html]: https://github.com/sariyadilak/question/blob/master/ucesriy/www/index.html
[question-style.css]: https://github.com/sariyadilak/question/blob/master/ucesriy/www/styles.css
[question-appActivity.js]: https://github.com/sariyadilak/question/blob/master/ucesriy/www/js/appActivity.js
[quiz-index.html]: https://github.com/sariyadilak/quiz/blob/master/ucesriy/www/index.html
[quiz-style.css]: https://github.com/sariyadilak/quiz/blob/master/ucesriy/www/styles.css
[quiz-appActivity.js]: https://github.com/sariyadilak/quiz/blob/master/ucesriy/www/js/appActivity.js

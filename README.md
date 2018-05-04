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

## Question Form app

### Overview

The question form application is an browser based application for users to generate question to be asked in Quiz App.

### Task Requirement

Allow user to fill in question, four multiple choices answer, answer to the question and question's location

Allow user to track their location and pick the question's location on the map

Allow user to upload question's information to the database.
 
### Design Vision

This application uses template available at [material-template] to create the web template.
The template is used in [question-index.html] and [question-style.css].
To be specific, this application used this template to create pretty header, tab bar, content section and button.

### Features

### What API used?

In this application, leaflet API is applied to create map.

Step 1 - Import leaflet API leaflet.js and leaflet.css file into [question-index.html].

Example code

	</style>
		<!-- the following links add the CSS and Javascript required for the Leaflet Map -->
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.1.0/dist/leaflet.css"integrity="sha512-wcw6ts8Anuw10Mzh9Ytw4pylW8+NAD4ch3lqm9lzAsTxg0GFeJgoAtxuCLREZSC5lUXdVyo/7yfsqFjQ4S+aKw=="crossorigin=""/>
	
	<script src="https://unpkg.com/leaflet@1.1.0/dist/leaflet.js"integrity="sha512-mNqn2Wg7tSToJhvHcqfzLMU6J4mkOImSPTxVZAdo+lcPlk+GhZmYgACEe0x35K7YzW1zJ7XyJV/TT1MrdXvMcA=="crossorigin=""></script>
	<!-- the following CSS is used to set the size of the Map -->
	<style type="text/css">
		#mapid { height: 180px; }
	</style>

Step 2 - Create a map in [question-appActivity.js]

Example code

	// load the map
	var mymap = L.map('mapid').setView([51.505, -0.09], 13);
			// load the tiles
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {maxZoom: 18,attribution: 'Map data &copy; <ahref="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +'Imagery © <a href="http://mapbox.com">Mapbox</a>',id: 'mapbox.streets'}).addTo(mymap);








 




[question]: https://github.com/sariyadilak/question
[quiz]: https://github.com/sariyadilak/quiz
[server]: https://github.com/sariyadilak/server
[material-template]: https://getmdl.io/templates/text-only/index.html
[question-index.html]: https://github.com/sariyadilak/question/blob/master/ucesriy/www/index.html
[question-style.css]: https://github.com/sariyadilak/question/blob/master/ucesriy/www/styles.css
[question-appActivity.js]: https://github.com/sariyadilak/question/blob/master/ucesriy/www/js/appActivity.js

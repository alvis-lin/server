# How to make question form app and quiz app?

## Introduction

There are three major components to build each application, which are web client, web server and database.

## Hardware requirement

Android 5 onward

Computer

## Software requirement

Bitvise SFTP (SSH file transfer system)

## Database

PG admin

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
The template is used in [question-index] and [question-style].
To be specific, this application used this template to create pretty header, tab bar, content section and button.




 

#### PhoneGap CLI

The hello-world template is the default when you create a new application using the [phonegap-cli][phonegap-cli-url].

    phonegap create my-app

Create an app using this template specifically:

    phonegap create my-app --template hello-world

To see a list of other available PhoneGap templates:

    phonegap template list

## [config.xml][config-xml]

#### android-minSdkVersion (Android only)

Minimum SDK version supported on the target device. Maximum version is blank by default.

This template sets the minimum to `14`.

    <preference name="android-minSdkVersion" value="14" />

#### &lt;access ...&gt; (All)

This template defaults to wide open access.

    <access origin="*" />

It is strongly encouraged that you restrict access to external resources in your application before releasing to production.

For more information on whitelist configuration, see the [Cordova Whitelist Guide][cordova-whitelist-guide] and the [Cordova Whitelist Plugin documentation][cordova-plugin-whitelist]

## [www/index.html][index-html]

#### Content Security Policy (CSP)

The default CSP is similarly open:

    <meta http-equiv="Content-Security-Policy" content="default-src * 'unsafe-inline'; style-src 'self' 'unsafe-inline'; media-src *" />

Much like the access tag above, you are strongly encouraged to use a more restrictive CSP in production.

A good starting point declaration might be:

    <meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: 'unsafe-inline' https://ssl.gstatic.com; style-src 'self' 'unsafe-inline'; media-src *" />

For more information on the Content Security Policy, see the [section on CSP in the Cordova Whitelist Plugin documentation][cordova-plugin-whitelist-csp].

Another good resource for generating a good CSP declaration is [CSP is Awesome][csp-is-awesome]


[question]: https://github.com/sariyadilak/question
[quiz]: https://github.com/sariyadilak/quiz
[server]: https://github.com/sariyadilak/server
[material-template]: https://getmdl.io/templates/text-only/index.html
[question-index]: https://github.com/sariyadilak/question/blob/master/ucesriy/www/index.html
[question-style]: https://github.com/sariyadilak/question/blob/master/ucesriy/www/styles.css

# nutshell

## Purpose
Here lies our knowledge of Javascript in a nutshell! We demonstrate our knowledge of Axios REST API calls, Firebase, JQuery, vanilla JavaScript, Bootstrap, and SASS

Each component was created by an individual user, with some shared fucntionality spread on each page 

## To View

**Note: This project requires you to have your own Google Firebase Account**

1. Clone repository to local machine.
1. run the following command in your termial to download webpage dependencies: ```npm install```
1. Open `apiKeys.json.example`
    * In Firebase, create a project
    * Select the 'webpage' app ![webpage directions](https://github.com/Waysidetester/firebase-Todo/blob/master/images/open-web-app.PNG?raw=true)
    * Match each key in the config variable to the keys available in `apiKeys.json.example`
    * Input the value of each key
    * Rename the file `apiKeys.json`
1. You will need to create a realtime database in Firebase and start in test mode ![init database](https://github.com/Waysidetester/firebase-Todo/blob/master/images/realtimeDatabase.PNG?raw=true)
1. Import the `./db/!base.json` file into the database for seed data. ![select import](https://github.com/Waysidetester/firebase-Todo/blob/master/images/import-option.PNG?raw=true) ![select import](https://github.com/Waysidetester/firebase-Todo/blob/master/images/import-json.PNG?raw=true). Under each separate key, import the corresponding json file

1. run the following command in your terminal to initiate the app: ```npm start```
This should automatically open a new tab in your default browser and run the web app, which pulls data from the Firebase app you have created.

![screenshot](https://github.com/nss-evening-cohort-8/nutshell-cashews/blob/master/img/screenshot.PNG?raw=true)
* Alternitavely, You can visit [here](https://nutshell-cashews.firebaseapp.com/)

## Notes

This project lacks extensive styling. Simple Bootstrap classes as well as a few standard css properties are used to make the page barley viewable. 

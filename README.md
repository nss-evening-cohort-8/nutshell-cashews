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
    * Select the 'webpage' app ![webpage directions](./images/open-web-app.PNG)
    * Match each key in the config variable to the keys available in `apiKeys.json.example`
    * Input the value of each key
    * Rename the file `apiKeys.json`
1. You will need to create a realtime database in Firebase and start in test mode ![init database](./images/realtimeDatabase.PNG)
1. Import the `./db/toDo.json` file into the database for seed data. ![select import](./images/import-option.PNG) ![select import](./images/import-json.PNG)

1. run the following command in your terminal to initiate the app: ```npm start```
This should automatically open a new tab in your default browser and run the web app, which pulls data from the Firebase app you have created.

* Alternitavely, You can visit [here](https://nutshell-cashews.firebaseapp.com/)

## Notes

This project lacks extensive styling. Simple Bootstrap classes as well as a few standard css properties are used to make the page barley viewable. Feel free to browse some of my other projects that include styling to please your eyes.
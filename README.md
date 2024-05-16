This application is an Electronic Health Record (EHR) web application for the QU Nursing Department . This app can dynamically handle patient records, live updates, and synchronize instructors to student user accounts across various simulation lab sections. This system will be used by QU nursing students and associated staff.

This system's database is hosted online - cockroach db, models for each table are defined within /backend/models. Here the definitions for each model can be changed, but must also be reflected with an update to db schema.
Within /backend/server.js - the main server, authentication, routing, and database connection - sequelize is defined. The commented out code for the usage of a mysql workbench database is also housed for ease of use for testing and if it is decided to move the database to a local school ran server rather than online. If this is decided credentials for mysql db will need to be inputted within backend/config/config.json

backend/config/passport.js - houses the local strategies for encryption/decryption for signups and logins, an instructor cannot be signed up through the registration frontend form, this needs to be manually inserted. Routing for this authentication can be found in /backend/routes/auth.js , as a reminder all defined routing subroutes can be found within the server.js for each corresponding usage.

Within /frontend/components are housed the react jsx files for each view, App.js houses the paths for each imported component. The main css file is index.css - houses the styling for login, registration, sectionDash, patientDash.

To run this application locally you will need to start the backend & frontend
1. Navigate to backend/frontend folder
2. run npm start for both folders
List of scripts can be found in package.json

The patientDashboard is very busy and should be brokedown further

![screenshot](ehr1.png)

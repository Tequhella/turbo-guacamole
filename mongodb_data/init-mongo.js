// init-mongo.js

// Create or switch to the user_form database
db = db.getSiblingDB('user_form');

// Create the users collection
db.createCollection('users');

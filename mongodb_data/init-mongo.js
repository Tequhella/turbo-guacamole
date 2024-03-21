// init-mongo.js

// Create or switch to the user_form database
db = db.getSiblingDB('user_form');

// Create the admins collection
db.createCollection('admins');

// Add an admin in the collection admins
db.admins.insert({
  "username": "root",
  "password": "root",
  "role": "admin"
});

// Create the users collection
db.createCollection('users');

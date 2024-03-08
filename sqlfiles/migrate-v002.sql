USE user_form;

CREATE TABLE users(
    id INT PRIMARY KEY NOT Null,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    email VARCHAR(100),
    birthdate DATE,
    city VARCHAR(100),
    zipcode VARCHAR(5)
);

CREATE TABLE admins(
    id INT PRIMARY KEY NOT Null,
    username VARCHAR(100),
    password VARCHAR(500),
    role VARCHAR(50)
);

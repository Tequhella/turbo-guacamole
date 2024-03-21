USE user_form;

CREATE TABLE users(
    _id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    email VARCHAR(100),
    birthdate DATE,
    city VARCHAR(100),
    zipcode VARCHAR(5)
);

CREATE TABLE admins(
    _id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    username VARCHAR(100),
    password VARCHAR(500),
    role VARCHAR(50)
);

INSERT INTO admins (username, password, role) VALUES ("root", "root", "admin");

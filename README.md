# usermanagement-node-mysql

A Simple User Management Application API using MySQL and Express JS

## Features

- Signin using the user credentials
- CRUD(Create, Read, Update, Delete) User
- Provides set of APIs that are session controlled using express-session
- Unit Testing Implemented using Jest JS and supertest

## Installation

Preferred Node and NPM versions
node : v14.20.0
npm : v6.14.15 

1.Run the SQL command from user_management.sql to your server

2.Install the dependencies

```sh
npm install
```

3.Run the API:
```sh
npm run dev
```
## Unit Testing
(For Unit Testing) Run this in a separate console:
```sh
npm test
```
## Manual Testing

API SENDING GUIDE

-----------------------

!! SPECIAL NOTE:

You must login first using the login api before using the other APIs (for the session purpose);
I will display response 401 for all other APIs requests if you didn't login first

Also make sure that you imported the initial data for the database table users before you login , 
because the credentials for admin account will be there. (See in user_management.sql)

-----------------------

LOGIN API

Method: POST
Endpoint: http://localhost:8080/login

Headers:
Content-Type: application/json

Request Body:
(See /sample-requestbody/signin.json)

-----------------------

GET USERS

Method: GET
Endpoint: http://localhost:8080/users

-----------------------

GET USER BY ID

Method: GET
Endpoint: http://localhost:8080/users/<USER ID>
(e.g http://localhost:8080/users/1)

-----------------------

ADD USER

Method: POST
Endpoint: http://localhost:8080/users

Headers:
Content-Type: application/json

Request Body:
(See /sample-requestbody/adduser.json)

-----------------------

UPDATE USER

Method: POST
Endpoint: http://localhost:8080/users/update

Headers:
Content-Type: application/json

Request Body:
(See /sample-requestbody/updateuser.json)

-----------------------

DELETE SINGLE USER

Method: DELETE
Endpoint: http://localhost:8080/users/delete/<USER ID>
(e.g http://localhost:8080/users/delete/1)

-----------------------

DELETE MULTIPLE USER

Method: DELETE .
Endpoint: http://localhost:8080/users/deleteusers

Headers:
Content-Type: application/json

Request Body:
(See /sample-requestbody/deleteusers.json)

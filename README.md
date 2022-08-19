# Creating a World Clone

This project was born from an SQL/Async project completed as part of my apprenticeship that grew legs and got expansions to allow for reading of user details from a database.

`TO DO`

* Implement User Creation
* User Lookup Capability to find username or scores/streaks
* Worldgame itself

### The Basic Setup

You will need to run `npm install` in the terminal to install all of our project dependencies.

Next run `npm run dev` to spin up our server. We can use this server to host our front-end. This can be found in the /public folder.

  

## Element 1: Async

We use Asyncronous functions to take the contents of the username and password elements in the form, using async functions to look these up in a database of user details. This then returns a welcome message 

Async calls are also used in response to lookups for user details, either a search for username via HTTP requests or to query for a users score streaks.

`TO DO`
* Implement some form of authentification as database is currently an open book



## Element 2: CSS Arrangements

The layout for the app will be written predominantly in a seperate stylesheet used to manipulate the content of the html elements. The intent is to dynamically change the layout based on what is going on at any given time, from manipulating the appearance of login/registration details to colouring of letters in the main game.

## Element 3: HTTP Queries and Routing

Two routes set, one for Score Queries and one for User Queries. These can  handle get/post/delete style HTTP Requests. Documentation can be found in the comments section of the routers
`TODO` Add Documentation for this to Readme

## Element 4: Databases
Two tables set in database, one for user information and the other to store any scores that they may have earned in their games. 
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=8198307&assignment_repo_type=AssignmentRepo)
# ASync, the SQL: Too fast, too curious!

The repository for this project has a few extras in it! As we go through the week, we will be building on this project, as we're learning asynchronous code and databases.

#### The Basic Setup

You will need to run `npm install` in the terminal to install all of our project dependencies.

Next run `npm run dev` to spin up our server. We can use this server to host our front-end. This can be found in the /public folder.

  

## Part 1: Async, I can!

  

We are going to get our user to enter a username and password and then authenticate them with our server. The username is "testUser" and their password is "Multiverse!". The purpose of this assignment is to use the browser Fetch API to make a call to a server and check login credentials.

  

(A quick note now - This is not actually the best way to authenticate a user, but for our purposes, it allows us to play around with some asynchronous content.

  

#### To DO :pencil:

  

- [x ] index.html has been provided with a basic structure. Look through and and find the id attributes that have been assigned to the various elements.

- [x ] In your script.js file, assign these elements to a variable. (How do we get an object from our DOM?)

- [ x] We will need to declare our function to handle the logic of submitting our data payload to our server. This will be triggered by the user when they hit the submit button. *A great name might be `onSubmit` to help remind*

- [ x] We will need to register an event listener (We'll be listening for the 'submit' event). Note, this can be done on the form element itself, and and not necessarily on the button. This will help us get our user inputs more easily. Don't forget when you are declaring the event listener, you will pass it your function as an argument. Don't call this function when you pass it!

- [x ] Returning to our `onSubmit` function, this will need a parameter that accepts the event. When we pass the function to our event listener, we do not call the function ( we don't use parenthesis). That means we can't pass arguments. However, as we are not calling the function, the event listener is calling it, it will pass the event for us! We should then build our function so that it accepts it.

- [x ] Inside this function, we are going to use the browser's Fetch API to make a call to our server (our own server :grin:) We hosted this server when we ran `npm run dev`. We are going to make a different type of request for this project called a POST request. Here is the code for that.
  
```js
fetch('http://localhost:3000', {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  method: 'POST',
  body: JSON.stringify(payload),
});
```

- [ x] Looking at the above code, we are passing a value on the 'body' key. This is a variable that we need to create. It will be an object needs keys of username and password. (The server will look for these)

- [ x] Our server will either return an object with a key of loggedIn and an appropriate boolean response.  Based on this, we should update our DOM with the results.

  

#### Extension

I've included a simple loading spinner. You can also update the DOM while we are awaiting a return from our server.

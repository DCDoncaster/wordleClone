//This is where I'll need to registered users in the long run
const express = require('express');
const {Users} = require('./db/myDataBaseQueries');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.get('/', (req, res) => {
  res.send(express.static(path.join(__dirname, 'public')));
});


// app.get('/users/:user', async(req,res)=>{
//   let newString = req.params.user.toLowerCase()
//   console.log(newString)
//   const queriedUser = await Users.findOne({where: { username: newString}})
//   let {firstName, surname} = queriedUser
//   console.log(firstName + surname)
//   res.sendStatus(200)
// })

// localhost:3000/users/find?firstname=Uri&surname=Aagaard  - finds username from first and last name supplied
app.get("/users/find", async (req,res) =>{
  console.log(req.query.firstname)
  const findUserName = await Users.findOne({where: {firstName: req.query.firstname, surname: req.query.surname}})
  let {username} = findUserName
  console.log(username)
  res.send(username)
})

app.post('/', async (req, res) => {

  const { username, password } = req.body;

  //check the received username exists in the database
  let doesExist = await Users.count({
    where: {
      username: username
    }
  })
//If exists count will be 1, if not 0. Use this to determine whether it exists and run from there. 
if (doesExist > 0){
  let pulledRecord = await Users.findOne({
    where: {
        username: username
    }
})
  // await setTimeout(() => {
    if (password === pulledRecord.password) {   
    let payload = {
    loggedIn: true,
    firstName: pulledRecord.firstName
  }
      res.send(payload);
      
      return;
    }
    res.send({ loggedIn: false });
    return;
  // }, Math.random() * 4000);
}
//This is where we do things if the username doesn't exist
res.send({ loggedIn: 'register'}) 
//need to take this and use it to manipulate the input on the front end.
}
);

app.listen(PORT, () => {
  console.log(`Server is up and running on http://localhost:${PORT}.`);
});


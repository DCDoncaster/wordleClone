//This is where I'll need to registered users in the long run
const express = require('express');
const {User} = require('./db/myDataBaseQueries');
const user = require('./routes/users')
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());
app.use('/users',user)


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



app.post('/', async (req, res) => {
  const { username, password } = req.body;
  //check the received username exists in the database
  let doesExist = await User.count({
    where: {
      username: username
    }
  })
//If exists count will be 1, if not 0. Use this to determine whether it exists and run from there. 
if (doesExist > 0){
  let pulledRecord = await User.findOne({
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

//creates new user if receives via post request - needs validation putting in 
app.post('/createUser',async(req,res)=>{
  await User.create(req.body)
  res.send('User Created')
})


app.listen(PORT, () => {
  console.log(`Server is up and running on http://localhost:${PORT}.`);
});


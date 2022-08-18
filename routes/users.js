const {User} = require('../db/myDataBaseQueries');
const express = require('express')
const router = express.Router()
const{check, validationResult} = require('express-validator')




// router.get('/users/:user', async(req,res)=>{
//   let newString = req.params.user.toLowerCase()
//   console.log(newString)
//   const queriedUser = await User.findOne({where: { username: newString}})
//   let {firstName, surname} = queriedUser
//   console.log(firstName + surname)
//   res.sendStatus(200)
// })

// localhost:3000/users/find?firstname=Uri&surname=Aagaard  - finds username from first and last name supplied
router.get("/", async (req,res) =>{
    console.log(req.query.firstname + req.query.surname)
    const findUserName = await User.findOne({where: {firstName: req.query.firstname, surname: req.query.surname}})
    
    let {username} = findUserName
    console.log(username)
    res.send(username)  //can this be used to email to the email address on file?
  })
  //delete user based on username and password being supplied. 
  router.delete('/', async(req,res)=>{
    await User.destroy({
      where: {   
        username: req.body.username,
        password: req.body.password
      }
    })
    res.send('User Deleted')  //TODO - add in some form of check that password matches and respond differently if not
  })
  
  //creates new user if receives via post request - needs validation putting in 
router.post('/',async(req,res)=>{
  await User.create(req.body)
  res.send('User Created')
})
  
module.exports = router
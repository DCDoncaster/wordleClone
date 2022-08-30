
const { User, Score } = require("../db/myDataBaseQueries");
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// router.get('/users/:user', async(req,res)=>{
//   let newString = req.params.user.toLowerCase()
//   console.log(newString)
//   const queriedUser = await User.findOne({where: { username: newString}})
//   let {firstName, surname} = queriedUser
//   console.log(firstName + surname)
//   res.sendStatus(200)
// })

// localhost:3000/users/find?firstname=Uri&surname=Aagaard  - finds username from first and last name supplied
router.get("/", async (req, res) => {
  console.log(req.query.firstname + req.query.surname);
  const findUserName = await User.findOne({
    where: { firstName: req.query.firstname, surname: req.query.surname },
  });

  let { username } = findUserName;
  console.log(username);
  res.send(username); //can this be used to email to the email address on file?
});
//DONE delete user based on username and password being supplied.
router.delete("/", async (req, res) => {
  await User.destroy({
    where: {
      username: req.body.username,
      password: req.body.password,
    },
  });
  res.send("User Deleted"); //TODO - Adjust resopnse if password does not match/not found
});

//TODO - add password change functionality



//DONE creates new user if receives via post request - needs validation putting in
router.post(
  "/",
  check("username").not().trim().isEmpty(),
  check("password")
    .not()
    .trim()
    .isEmpty(),
  check("firstName").not().trim().isEmpty(),
  check("surname").not().trim().isEmpty(),
  check("age")
    .not()
    .trim()
    .isEmpty()
    .isNumeric("Age should be entered as a number"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ error: errors.array() });
    }
    await User.create(req.body);
    res.send("User Created");
  }
);



//finds a score for games by user
router.get('/userScores', async (req,res)=>{
  const pulledUser = await User.findOne({
    where:{username: req.query.username},
    include: {model: Score, as: 'owner'},
    required: true
  })
  const {score, gameID} = pulledUser.owner[0] //destructjure the object to a variable and then send it back after
  res.send({score, gameID})
})



module.exports = router;

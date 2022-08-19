const { User, Score } = require("../db/myDataBaseQueries");
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

//get players with score of x on game x
router.get(
  "/",
  check("gameID").not().trim().isEmpty(),
  check("score")
    .not()
    .trim()
    .isNumeric()
    .isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ error: errors.array() });
    }
    const getScore = await Score.findOne({
      where: { gameID: req.query.gameID, score: req.query.score },
      include: { model: User },
      required: true,
    });
    res.send(getScore.users[0].username);
  }
);

// Doesn't do anything - stored 'just in case'
// let testFunc = async () =>{
//   const testUser = await User.findOne({where: { //finds users record
//       username: 'user-10'}})
//   const testScore = await Score.findOne({where: { //finds score, in this case we'd probably create a new one when playing - maybe, depends how scores work
//       gameID: 2    }})
//       await testScore.addUser(testUser) //This adds the score to the user in question, use this when a game is completed
//       console.log(testScore)
// }

module.exports = router;

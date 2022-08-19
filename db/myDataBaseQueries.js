const {db} = require('../db');
const {Sequelize, DataTypes} = require('sequelize')

const User = db.define('user', {
    username:{
        type: DataTypes.STRING,
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING
    },
    firstName:{
        type: DataTypes.STRING
    },
    surname: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.NUMBER
    }
})

const Score = db.define('score', {
    score:{
        type: DataTypes.NUMBER,
    },
    gameID: {
        type: DataTypes.NUMBER
    },
    userID: {
        type: DataTypes.NUMBER
    }
})

User.belongsToMany(Score, {through: 'achievement', as: 'owner'})
Score.belongsToMany(User,{through: 'achievement'})

// let testFunc = async () =>{
//   const testUser = await User.findOne({where: { //finds users record
//       username: 'user-10'}})
//   const testScore = await Score.findOne({where: { //finds score, in this case we'd probably create a new one when playing - maybe, depends how scores work
//       gameID: 2    }})
//       await testScore.addUser(testUser) //This adds the score to the user in question, use this when a game is completed
//       console.log(testScore)
// }









module.exports = {User, Score}
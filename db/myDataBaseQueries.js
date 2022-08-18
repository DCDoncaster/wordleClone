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











module.exports = {User, Score}
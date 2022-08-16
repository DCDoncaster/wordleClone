const path = require('path')
const { Sequelize, DataTypes } = require('sequelize')

const db = new Sequelize({
    dialect: 'sqlite',
    storage: 'db/Wordle.sqlite',
    logging: false
    })

module.exports = {db}


'use strict';
const sequelize = require('../../config/database')
const Sequelize = require('sequelize')
const User      = require('./users')

const db        = {}
db.sequelize    = sequelize;
db.Sequelize    = Sequelize;
db.user         = User(sequelize, Sequelize)

module.exports = db;

const Sequelize         = require('sequelize')
const config            = require('../config.json')

const sequelize         = new Sequelize(config.development.database, config.development.username, config.development.password,{
        host            : config.development.host, 
        dialect         : config.development.dialect,
        pool: {
            max     : 5,
            min     : 0,
            acquire : 30000,
            idle    : 10000
        },
        define: {
            underscored     : true,
            freezeTableName : true, //use singular table name
            timestamps      : true,  // I do not want timestamp fields by default
        },
        dialectOptions: {
            dateStrings : true,
            typeCast    : function (field, next) { // for reading from database
                if (field.type === 'DATETIME') {
                    return field.string()
                }
                return next()
            },
        },
    }
);

module.exports          = sequelize
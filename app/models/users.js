'use strict';
const { Model } = require('sequelize');
const bcrypt    = require('bcryptjs')
module.exports  = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    firstname: {
      type : DataTypes.STRING,
      required: [true, "Nama depan di isi"]
    },
    lastname: {
      type : DataTypes.STRING,
      required: [true, "Nama Belakang di isi"]
    },
    email: {
      type : DataTypes.STRING,
      required: [true, "Email di isi"],
      unique: true,
      match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Email tidak valid",
      ],
    },
    password: {
      type: DataTypes.STRING,
      required: [true, "password harus di isi"],
      minlength: 6,
      select: false,
    },
    image: {
      type : DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Users',
    timestamps : true,
    paranoid: true,
    freezeTableName :  true,
    hooks: {
      beforeCreate : async(user) => {
        if(user.password){
          const salt = await bcrypt.genSaltSync(10)
          user.password = bcrypt.hashSync(user.password,salt);
        }
      },
      beforeUpdate : async(user) => {
        if(user.password){
          const salt    = await bcrypt.genSaltSync(10)
          user.password = bcrypt.hashSync(user.password,salt);
        }
      }
    }
  });
  return Users;
};
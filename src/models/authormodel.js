const SQLConnection = require("../db/connection");
const {DataTypes} = require("sequelize");
const Book = require('../books/bookmodel');


const Author = SQLConnection.define('Author', {
  author_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  author_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Author.hasMany(Book, { as: 'Books' });

module.exports = Author;

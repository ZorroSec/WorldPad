const Sequelize = require("sequelize")
const db = require("../db/db")


const Post = db.define('Post',
    {
        Id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        Nome:{
            type: Sequelize.STRING,
            allowNull: false
        },
        Publicacao:{
            type: Sequelize.STRING,
            allowNull: false
        },
        DataPost:{
            type: Sequelize.DATE,
            allowNull: false
        },
        Path: {
            type: Sequelize.STRING,
            allowNull: false
        }
})

module.exports = Post
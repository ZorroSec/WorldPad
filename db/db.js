const Sequelize = require("sequelize")

const componentSequelize = new Sequelize("worldpad", "root", '', {
    dialect:"mysql",
    host:"localhost"
})

module.exports = componentSequelize
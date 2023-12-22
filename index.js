const Sequelize = require("sequelize")
const db = require("./db/db")
const post = require("./post/post")

post.create(
    {
        Nome: "Zezao",
        Publicacao: "Hello World",
        DataPost: Date()
    }
)

post.findAll().then(data=>{
    console.log(data)
})
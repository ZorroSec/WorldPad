const Sequelize = require("sequelize")
require("dotenv").config()
const db = require("./db/db")
const post = require("./post/post")
const express = require("express")
const bodyParser = require("body-parser")
const { engine } = require("express-handlebars")
const mysql = require("mysql2")
const connection = require("./connection/connection")
const app = express()
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/public/', express.static('/public/'))
app.use('/public/css/', express.static('/public/css/'))
app.use('/public/js/', express.static('/public/js/'))
// post.create(
//     {
//         Nome: "Zezao",
//         Publicacao: "Hello World",
//         DataPost: Date()
//     }
// )

// post.findAll().then(data=>{
//     console.log(data)
// })
app.get('/', (req,res)=>{
    connection.query("SELECT * FROM posts", (results, fields)=>{
        res.render('home', { data: fields })
    })
})
app.get('/post/:id',(req, res)=>{
    // connection.query(`SELECT * FROM posts WHERE id = ${id}`)
    const { id } = req.params
    console.log(req.params.id)
    connection.query(`SELECT * FROM posts WHERE id = ${id}`, (results, fields)=>{
        console.log(fields[0]['nome'])
        res.json({
            results: fields
        })
        
    })
})
app.listen(process.env.PORT, (err)=>{
    if(!err){
        console.log({
            message: 'success'
        })
    }
})
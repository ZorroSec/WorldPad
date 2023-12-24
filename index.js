const Sequelize = require("sequelize")
require("dotenv").config()
const db = require("./db/db")
const post = require("./post/post")
const express = require("express")
const bodyParser = require("body-parser")
const { engine } = require("express-handlebars")
const mysql = require("mysql2")
// const upload = require('./app/upload/upload')
const connection = require("./connection/connection")
const Post = require("./post/post")
const app = express()
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('views/images', express.static('views/images'))
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
        console.log(fields)
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
app.get('/add', (req, res)=>{
    res.render('add')
})
app.post('/add', upload.single('file'), (req, res)=>{
    function submitBtn(){
        const file = req.file
        const data = req.body.data
        const post = req.body.post
        const nome = req.body.nome
        const dataItems = {
            Nome: nome,
            Publicacao: post,
            DataPost: data,
            Path: req.file.filename
        }
        Post.create({
            Nome: nome,
            Publicacao: post,
            DataPost: data,
            Path: req.file.path

        })
        console.log(dataItems)
    }
    res.render('add', { submitBtn: submitBtn() })
})
app.listen(process.env.PORT, (err)=>{
    if(!err){
        console.log({
            message: 'success'
        })
    }
})
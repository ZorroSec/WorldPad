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
    connection.query("SELECT * FROM posts ORDER BY id DESC", (results, fields)=>{
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
        // res.json({
        //     results: fields
        // })
        res.render('post', { post: fields })
    })
})
app.get('/add', (req, res)=>{
    res.render('add')
})
app.post('/add', (req, res)=>{
    function submitBtn(){
        const data = req.body.data
        const post = req.body.post
        const nome = req.body.nome
        const dataItems = {
            Nome: nome,
            Publicacao: post,
            DataPost: data,
        }
        Post.create({
            Nome: nome,
            Publicacao: post,
            DataPost: data,
        })
        console.log(dataItems)
        res.redirect('/')
    }
    res.render('add', { submitBtn: submitBtn() })
})
app.get('/delete/:id', (req, res)=>{
    connection.query(`DELETE FROM posts WHERE id = ${req.params.id}`, (results, fields)=>{
        console.log('Deleted!!')
        res.redirect('/')
    })
})
app.listen(process.env.PORT, (err)=>{
    if(!err){
        console.log({
            message: 'success'
        })
    }
})
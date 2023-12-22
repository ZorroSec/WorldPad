const Sequelize = require("sequelize")
const db = require("./db/db")
const post = require("./post/post")
const express = require("express")
const bodyParser = require("body-parser")
const { engine } = require("express-handlebars")
const app = express()
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('public/', express.static('public/'))
app.use('public/css/', express.static('public/css/'))
app.use('public/js/', express.static('public/js/'))
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
    post.findAll().then(data=>{
        res.render('home', { post: post })
    })
})

app.listen(3000, (err)=>{
    if(!err){
        console.log({
            message: 'success'
        })
    }
})
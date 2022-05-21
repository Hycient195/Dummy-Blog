var PORT = process.env.PORT || 3002

const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const routes = require('./routes/route')
const app = express()

app.set('view engine', 'ejs')

app.use(express.static('./public'))
app.use(express.json())
app.use(cookieParser())

const DB_URL = 'mongodb+srv://Hycient:passwords@cluster0.d6mr2.mongodb.net/blog-database?retryWrites=true&w=majority'
// const DB_URI = "mongodb://localhost/blog-database"
mongoose.connect(DB_URL, {
    useNewUrlParser : true,
    useUnifiedTopology : true
})


    
mongoose.connection
    .then(()=>{
        app.listen(PORT, ()=>{
            console.log('Server is started on port ' + PORT)
        })
        console.log('Connected sucessfully to database')
    })
    .catch((err)=>{
        console.log('an error occoured', err)
    })

app.use(routes)


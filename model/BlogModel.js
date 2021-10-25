const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Blog = new Schema({
    title : {
        type : String, 
        required : true
    },
    content : {
        type : String, 
        required : true
    },
    submitter : {
        type : String,
        required : true
    }
}, {timestamps : true})

const BlogModel = mongoose.model('blog', Blog)
module.exports = BlogModel

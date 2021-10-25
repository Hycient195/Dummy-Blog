const BlogModel = require('../model/BlogModel')
const UserModel = require('../model/UserModel')
const checkUser = require('../middlewares/checkUser')
const jwt = require('jsonwebtoken')



const maxAge = 2 * 24 * 60 * 60
const createToken = (id) =>{
    return jwt.sign({id}, 'signing secret', {expiresIn : maxAge})
}


const errorHandler = (err) =>{
    const errors = {
        firstname : '', lastname : '',
        username : '', password : '' 
    }


    if(err.message === 'username is incorrect'){
        errors.username = 'user is not registered'
    }
    if(err.message === 'password is incorrect'){
        errors.password = 'incorrect password'
    }

    if(err.message.includes('user validation failed')){

        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message
        })

    }

    return errors
}

 

module.exports.signup_post = async(req, res) =>{
    console.log(req.body)
    try {      
        const user = await UserModel.create(req.body)
        const token = createToken(user._id)
        res.cookie('jwt', token , {httpOnly : true, maxAge : maxAge * 1000})
        res.json({user})

    } catch (err) {
        const error = errorHandler(err)
        res.json({error})

    }
}


module.exports.login_post = async(req, res) =>{
    const { username, password } = req.body
    // console.log(req.body)

    try {
        const user = await UserModel.login(username, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly : true, maxAge : maxAge * 1000})
        res.json({user})

    } catch (err) {
        const error = errorHandler(err)
        res.json({error})
        console.log(error)
        res.render('new-post-error')

    }
}

module.exports.new_post_post = async(req, res) =>{

    try {
        const post = await BlogModel.create(req.body)
        console.log(post)
        res.json({post})
    } catch (err) {
        res.json({err})
        console.log(err)
    }

}

    // app.get('/blog-posts',(req,res)=>{
    //     BlogModel.find({})
    //         .then((blogs)=>{
    //             res.render('homepage', {
    //                 data : blogs,
    //                 user : user,
    //                 heading : null
    //             })
    //         })
    // })


// module.exports.new_post_post = (req, res) =>{
//     try {
//         UserModel.findOne({})
//         let Blog = new BlogModel({
//             title : req.body.title,
//             content : req.body.content,
//             submitter : user[0].username
//         })
//         Blog.save()
//             .then(()=>{
//                 console.log('some')
//                 BlogModel.find({}).sort({createdAt : -1})
//                     .then((blogs)=>{

//                         // if(false){
//                             res.redirect('/blogs')
//                             // res.render('homepage', {
//                             //     data : blogs,
//                             //     user : user[0].username,
//                             //     heading : ''
//                             // })
//                         // }else{
//                         //     // console.log('No logged in user')
//                         //     alert('Soething occoured, no user')
//                         // }
//                     })
//                     .catch(()=>{
//                         console.log('erronous')
//                         res.render('new-post-error')
//                     })
                   
                   
                
//             })
//             .catch(()=>{
//                 // console.log(err)
//                 res.render('new-post-error')
//             })
//         }catch{
//             res.render('new-post-error')
//         }
//         // res.redirect('/blogs')
//         console.log(req.body)

    
// }




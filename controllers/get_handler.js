const BlogModel = require('../model/BlogModel')
const UserModel = require('../model/UserModel')


module.exports.homepage_redirect = (req, res) =>{
    res.redirect('/home')
}

module.exports.homepage_get = async (req, res) =>{

    const posts = await BlogModel.find({}).sort({createdAt : -1})

    try {
        res.locals.posts = posts
        res.locals.heading = ''
        res.render('homepage')
    } catch (err) {
        console.log(err)
        res.send('error in recovering posts')
    }
    
}

        /* Making a new post */
module.exports.new_post_get = (req, res) =>{

    res.render('new-post')

}

module.exports.single_blog_get = async(req, res) =>{

    let _id = req.params._id

    const post = await BlogModel.findById(_id)
    res.locals.post = post

    res.render('single-blog', {
        data : post
    })

}

module.exports.login_page_get = (req, res) =>{
    res.locals.required = ''
    res.render('login-page',{message : ''})
}

module.exports.signup_page_get = (req, res) =>{
    res.render('sign-up-page')
}

//     /* Searching for a post */
module.exports.search_post_get = (req, res) =>{
    let search = req.query.search.toLowerCase()
    BlogModel.find({}).sort({createdAt : -1})

    .then((result)=>{

        let arr = []
        res.locals.posts = arr
        res.locals.heading =  `Top search results for "${search}"`

        result.map((blog)=>{
            if(blog.title.toLowerCase().includes(search) | blog.submitter.toLowerCase().includes(search)){

                arr.push(blog)
            }               
        })
        res.render('homepage')

        console.log(arr)
    })
    .catch(()=>{
        console.log('blog post not found')
    })
    console.log(req.query.search)
}


module.exports.logout_get = (req, res) =>{
    res.cookie('jwt', '', {maxAge : 1})
    res.redirect('/home')
}

const jwt = require('jsonwebtoken')

const authenticator = async(req, res, next) =>{
    const token = req.cookies.jwt

    if(token){
        jwt.verify(token, 'signing secret', (error, decodecToken)=>{
            if(error){
                res.locals.required = "You need to be logged in to make a new post!"
                // res.redirect('/login-page')
                res.render('login-page')
                console.log('an error occoured in authentication')
            }
            else{
                console.log(decodecToken)
                res.locals.required = ""
                next()
            }
        })
    }
    else{
        res.locals.required = "You need to be logged in to make a new post!"
        // res.redirect('/login-page')
        res.render('login-page')
        console.log('an error occoured in authentication')
    }
}

module.exports = authenticator
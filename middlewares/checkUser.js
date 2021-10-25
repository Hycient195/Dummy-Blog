const jwt = require('jsonwebtoken')
const UserModel = require('../model/UserModel')



const checkUser = (req, res, next) =>{
    const cookies = req.cookies.jwt
    if(cookies){
        const auth = jwt.verify(cookies, 'signing secret', async(err, decodedToken)=>{
            if(err){
                res.locals.user = ''
                console.log('unable to verify token')
                next()
            }
            else{
                const user = await UserModel.findById(decodedToken.id)
                res.locals.user = user
                console.log(decodedToken)
                next()
            }
        })
        
    }
    else{
        res.locals.user = ''
        console.log('unable to verify token')
        next()
    }
}

module.exports = checkUser
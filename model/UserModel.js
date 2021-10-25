const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstname : {
        type : String,
        lowercase : true,
        required : [true, 'firstname field is empty']
    },
    lastname : {
        type : String,
        lowercase : true,
        required : [true, 'lastname field is empty']
    },
    username : {
        type : String,
        unique : true,
        required : [true, 'username field is empty']
    },
    password : {
        type : String,
        required : [true, 'password field is empty'],
        minlength : [5, 'minimum password length is 5 characters']
    },
    gender : {
        type : String,
        required : false
    }
    // male : {
    //     type : String,
    //     required : false
    // },
    // female : {
    //     type : String,
    //     required : false
    // }
}, {timestamps : true})

UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.statics.login = async function(username, password){
    const user = await this.findOne({username : username})
    if(user){
        const auth = await bcrypt.compare(password, user.password)
        if(auth){
            return user
        }
        else{
            throw Error('password is incorrect')
        }
    }
    else{
        throw Error('username is incorrect')
    }    
}

const UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel
const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail,'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6,'Password should have a minimum of 6 characters']
    }
})

//Mongoose hooks
//Fire a function after the doc is saved
userSchema.post('save',function (doc,next){
    console.log('user has just beenn saved in db', doc);
    next();
})

//Fire a function just before the doc is saved
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    console.log('user about to be saved in db',this) //this refers to the local instance of the user before saving it to the db
    next();
})

const User = mongoose.model('userr',userSchema);

module.exports = User;
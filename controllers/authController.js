const User = require('../models/user');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

//handle errors
const handleErrors = (err) =>{
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    //duplicate error code
    if(err.code === 11000){
        errors.email = 'that email is already registered';
        return errors;
    }

    //validation errors
    if(err.message.includes('userr validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

//create jwt
const maxAge = 3*24*60*60;
const createToken = (id) =>{
    return jwt.sign({ id },keys.jwebtoken.secret,{
        expiresIn: maxAge
    })
}

module.exports.home = (req,res) => {
    res.render('home');
}

module.exports.loginGet = (req,res) =>{
    res.render('login');
}

module.exports.loginPost = (req,res) =>{
    const { email, password } = req.body;
    console.log(email, password);
    res.send('Logging In')
}

module.exports.signupGet = (req,res) =>{
    res.render('signup');
}

module.exports.signupPost = async (req,res) =>{
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie('jwt',token, { httpOnly: true, maxAge: maxAge*1000 })
        res.status(201).json({user: user._id});
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({errors});
    }
}
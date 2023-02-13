const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cookieParser = require('cookie-parser');
const { requireAuth,checkUser } = require('./controllers/authMiddleware');

const app = express();

//set the view engine
app.set('view engine','ejs');

//middleware
app.use(express.json()); //comes before routes
app.use(cookieParser());



const dbURI = 'mongodb+srv://library:elibrary@trial.nacabxh.mongodb.net/E-Library?retryWrites=true&w=majority';
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then((result)=>{
        app.listen(3000);
    })
    .catch((err)=>{
        console.log(err)
    })

    //route
    app.get('*',checkUser)
    app.get('/',requireAuth,(req,res)=>{
        res.render('home');
    });
    app.use(authRoutes);
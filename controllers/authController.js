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

module.exports.signupPost = (req,res) =>{
    const { email, password } = req.body;
    console.log(email, password);
    res.send('Signing Up')
}
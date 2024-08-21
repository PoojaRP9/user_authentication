const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const User = require("../models/user.model");


async function getUserProfile(req,res){
    // if token is valid then only we will reach here and in req.user we will have our user data
    console.log(req.user);
    res.render('home',{user:req.user});

}

async function homePage(req, res) {

    // here we will check whether the user is logged in or not
    const token = req.cookies['token'];
    let user;

    // verify the token
    if (token) {
        const tokenVerify = jwt.verify(token, "Nodejs_secret_key");

        if (tokenVerify) {
            user = await User.findById(tokenVerify._id);
        }
    }

    res.render('home', { user })
}


async function userSignup(req, res) {
    if (req.method === "POST") {
        // we will add user here
        const data = req.body;
        const user = await User.create({
            name: data.name,
            email: data.email,
            contact: data.contact,
            password: data.password
        });
        if (user) {
            res.redirect('/login');
        } else {

            res.redirect('/signup');
        }
    } else {
        res.render('signup');
    }
}

async function userLogin(req, res) {
    if (req.method === "POST") {
        // we will get user
        const data = req.body;
        const user = await User.findOne({ email: data.email });

        if (user) {
            // if email exits then check whether he has entered the password correct or not


            // const isPasswordValid = await bcrypt.compare(userData.password, user.password);


            if (user.password === data.password) {
                // user has entered the email and password correctly now login the user
                /* we will create a token for user and token will be stroed in cookie and
                every time when we hit request we will check with that whether the token is valid or not
                if not valid we will redirect to login page and make user login again
                if valid then we will get the user data and process with the operations in

                // we will use _id of user to create the token so that when we get token we can get the userid

                */
                const token = jwt.sign({ _id: user._id }, "Nodejs_secret_key");
                console.log('token')
                res.cookie('token', token);

                // now user is loggin we redirect to home page
                res.redirect('/');

            } else {
                // incorrect password then rediect to login page with message enter valid password
                res.redirect('/login');
            }
        } else {
            // user does not exist redirect to signup page after displaying the message
            res.redirect('/signup')
        }
    } else {
        res.render('login');
    }
}

async function userLogout(req,res) {
    res.clearCookie('token');
    res.redirect('/');
}
module.exports = { homePage, userSignup, userLogin,userLogout ,getUserProfile}

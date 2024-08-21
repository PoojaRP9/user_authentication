// this funciton we will use as a middleware to verify token for authorization purposes

const jwt = require("jsonwebtoken");
const User = require("../models/user.model");


async function verifyToken(req, res, next) {
    try {
        const token = req.cookies['token'];
        console.log("not working");
        // verify the token
        if (token) {
            const tokenVerify = jwt.verify(token, "Nodejs_secret_key");

            if (tokenVerify) {
                req.user = await User.findById(tokenVerify._id);
                next();
            }else{
                throw "Invalid token";
            }

        }
        next();

    } catch (error) {
        next(error);
    }

}

module.exports =  verifyToken ;
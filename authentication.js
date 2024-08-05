const session = require("express-session");
const sessionId = session({
    secret:"123456",
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:7 * 60 * 60 * 1000,
        httpOnly:true,
        sameSite:"strict", //cookie sent from the same site only
    },
});

const isAuth = (req,res,next) => {
    if(req.session.isAuth) {
        return next();
    }else {
        return res.redirect("/login");
    }
};

module.exports = {sessionId ,isAuth};
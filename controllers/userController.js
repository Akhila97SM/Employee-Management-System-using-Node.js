const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const user = require("../models/userModel");
const { sendOtp } = require("../config/otpGeneration");

// otp generation function
function otpGeneration() {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const experiationotp = Date.now() + 2 * 60 * 1000;

    return { otp, experiationotp };
}

// register(signup)
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body);
    if (!username || !email || !password) {
        return res.status(400).json({ error: "* All fields are required" })
    }
    const userAvailable = await user.findOne({ email });
    if (userAvailable) {
        return res.status(400).json({ error: "* User already registered" })
    }
    else {

        //Hash password

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed password:", hashedPassword);

        const { otp, experiationotp } = otpGeneration();

        req.session.signupData = { username, email, password: hashedPassword, otpGeneration: otp, experiationotp };

        sendOtp(email, otp); //send OTP to email

        return res.json({ message: "Register user with OTP" });

    }
});

// otp verify

const otpVerify = asyncHandler(async (req, res) => {
    const { otp } = req.body;
    console.log(otp);
    if (!req.session.signupData) {
        return res.render("otp", {
            error: "Data not found"
        });
    }

    const { username, email, password, otpGeneration, experiationotp } = req.session.signupData;
    if (Date.now() > experiationotp) {
        delete req.session.signupData;
        return res.render("otp", { otpMissmatch: "otp expired" });
    }

    if (otp === otpGeneration) {
        const userdata = await user.create({
            username,
            email,
            password,
        });

        delete req.session.signupData;
        return res.redirect("/Login");
    } else {
        return res.render("/otp", {
            error: "incorrect otp",
        });
    }
});

// User Login 

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log("login ", req.body);
    try {
        const userCheck = await user.findOne({ email })
        if (!userCheck) {
            return res.status(404).json({ error: "User not found with this email" });
        } else {
            const passwordCheck = await bcrypt.compare(password, userCheck.password);
            if (passwordCheck) {
                req.session.isAuth = true;

                return res.status(200).json({ message: "Login successful" })

            } else {
                return res.status(401).json({ error: "The password you have entered is incorrect" });

            }

        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Error during login" });
    }

});

const currentUser = asyncHandler(async (req, res) => {
    res.json({ message: "current user information" });

});

const logout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error in destroying session:", err);
            return next(err);
        }
        res.redirect("/login");
    });
};





module.exports = { registerUser, loginUser, currentUser, otpVerify, logout };




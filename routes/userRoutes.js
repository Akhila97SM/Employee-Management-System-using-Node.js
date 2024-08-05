const express = require("express");
const { registerUser,
    loginUser,
    currentUser,
    otpVerify,
    logout
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/otp", otpVerify);

router.post("/current", currentUser);

router.get("/logout",logout)

module.exports = router;
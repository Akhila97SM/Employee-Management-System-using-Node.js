const dotenv = require("dotenv").config();
const nodemailer = require("nodemailer");

// send otp
const sendOtp = async (email, otp) => {
    const otpmail = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailData = {
        from: process.env.EMAIL,
        to: email,
        subject: "Your One Time Password for Verification",
        text: `OTP IS ${otp}`,
    };
    try {
        await otpmail.sendMail(mailData);
        console.log("OTP SEND SUCCESSFULLY");
        console.log(mailData);
    } catch (error) {
        console.error(error);
        throw new Error("Error in sending OTP");
    }
};
module.exports = { sendOtp };



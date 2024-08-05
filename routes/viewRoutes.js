const express = require("express");
const { renderindex ,renderviewdetails, renderlogin, rendersignup,renderotp,trashbox} = require("../controllers/viewController");
const router = express.Router();
const {isAuth}=require("../authentication");


router.get("/login",renderlogin)
router.get("/signup",rendersignup)
router.get("/otp",renderotp)
router.get("/",isAuth,renderindex)
router.get("/viewdetails",renderviewdetails)
router.get("/trash",trashbox)

module.exports = router;

  
const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const path = require ("path");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser")
const{sessionId}=require("./authentication")
const dotenv = require("dotenv").config();


connectDb()
const app = express();


const port = process.env.PORT || 3000;
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(cookieparser())
app.use(sessionId);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(errorHandler);


// set EJS as view engine
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

// static files
app.use(express.static("public"));
app.use(express.static(path.join()));

//* employee route is created to manage employee datas(crud)
app.use('/employees',require("./routes/employeeRoutes"));

//* user route is created to manage user datas
app.use('/users',require("./routes/userRoutes"));

//* view route is created to manage view datas
app.use('/',require("./routes/viewRoutes"));


app.listen(port,()=>{
    console.log(`server is running on port http://localhost:${port}/`);
}); 



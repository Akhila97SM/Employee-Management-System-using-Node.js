const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
    salutation: {
        type: String,
        required: [true, "enter the salutation"],
    },
    firstName: {
        type: String,
        required: [true, "enter the firstname"]
    },
    lastName: {
        type: String,
        required: [true, "enter the lastname"]
    },

    email: {
        type: String,
        required: [true, "enter the email"]
    },

    phone: {
        type: String,
        required: [true, "enter the mobilenumber"]
    },
    username: {
        type: String,
        required: [true, "enter the username"]
    },
    password: {
        type: String,
        required: [true, "enter the password"]
    },

    dob: {
        type: String,
        required: [true, "enter the date of birth"]
    },

    gender: {
        type: String,
        required: [true, "enter the gender"]
    },

    qualifications: {
        type: String,
        required: [true, "enter the qualification"]
    },

    address: {
        type: String,
        required: [true, "enter the address"]
    },

    country: {
        type: String,
        required: [true, "enter the country"]
    },

    state: {
        type: String,
        required: [true, "enter the state"]
    },
    city: {
        type: String,
        required: [true, "enter the city"]
    },
    pinzip: {
        type: String,
        required: [true, "enter the address"]
    },
    image: {
        type: String,
        required:false
    },
    is_deleted:{
        type: Boolean,
        default: false
    },
   deletedAt:{
       type:Date,
       default:null
   }
},
 {
    timestamps: true,
   }
);


module.exports = mongoose.model("employee",employeeSchema);
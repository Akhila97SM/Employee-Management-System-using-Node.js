const employeeModel = require("../models/employeeModel");

// Get all employees

async function getAllEmployees() {
    try {
        const employees = await employeeModel.find().sort({ createdAt: -1 });
        return employees;
    } catch (error) {
        throw new Error("Users cannot get")
    }
}

// CREATE EMPLOYEE

const createEmployee = async (data) => {
    const {
        salutation,
        firstName,
        lastName,
        emailAddress,
        mobileNumber,
        newDob,
        gender,
        qualification,
        address,
        city,
        state,
        pinzip,
        country,
        username,
        password,
    } = data;

    if (
       ! salutation ||
       ! firstName ||
       ! lastName ||
       ! emailAddress ||
       ! mobileNumber ||
       ! newDob ||
       ! gender ||
       ! qualification ||
       ! address ||
       ! city ||
       ! state ||
       ! pinzip ||
       ! country ||
       ! username ||
       !password 
    ) {
        throw new Error("All fields are required");
    }

    return await employeeModel.create ({
        salutation,
        firstName,
        lastName,
        emailAddress,
        mobileNumber,
        newDob,
        gender,
        qualification,
        address,
        city,
        state,
        pinzip,
        country,
        username,
        password,
    });
};

// delete employee

async function deleteEmployee(employeeId) {
    try {
        const deleteEmployee = await employeeId.findByIdAndDelete(employeeId);
        if(!deleteEmployee) {
            throw new Error("employee not found");
        }
        return deleteEmployee;
    } catch (error) {
        throw new Error("error in deleting Employee");
    }
}


module.exports = {getAllEmployees,createEmployee,deleteEmployee};

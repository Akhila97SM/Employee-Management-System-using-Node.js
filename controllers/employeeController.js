// CRUD operations controller

const asyncHandler = require("express-async-handler");
const employee = require("../models/employeeModel");
const errorHandler = require("../middleware/errorHandler");
const upload = require("../config/multer");
const empService = require("../service/empService");

//get employees

const getEmployees = asyncHandler(async (req, res) => {
  try {
    const employees = await empService.getAllEmployees();
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({error:error.message});
  }
});

//create new employee

const createEmployee = asyncHandler(async (req, res) => {
    console.log("The request body is:", req.body);
    const { salutation, firstName, lastName, email, phone, username, password, dob, gender, qualifications, address, country, state, city, pinzip } = req.body;
    if (!salutation || !firstName || !lastName || !email || !phone || !username || !password || !dob || !gender || !qualifications || !address || !country || !state || !city || !pinzip) {
        return res.status(400);
        throw new Error("All fields are mandatory !");
    }
    let body = {
      salutation,
      firstName,
      lastName, email,
      phone, username,
      password, dob,
      gender, qualifications,
      address, country, state, pinzip,
      city
  }
    const employees = await employee.create(body);
    res.status(201).json(employees);
});

//img upload

const postimg = async (req, res) => {
    if (req.file) {
        const imgpath = `public/uploads/${req.file.filename}`
        await employee.findByIdAndUpdate(req.params.id, { image: imgpath });
        res.status(200).json({ message: "image uploaded" });
    } else {
        res.status(400).json({ message: "image uploaded failed" });
    }
}

// get Employee

const getEmployee = asyncHandler(async (req, res) => {
    const employees = await employee.findById(req.params.id);
    if (!employees) {
        res.status(404);
        throw new Error("employee not found");
    }
    res.status(200).json(employees);
});

// update employee

const updateEmployee = asyncHandler(async (req, res) => {
    const employees = await employee.findById(req.params.id);
    if (!employees) {
        res.status(404);
        throw new Error("employee not found");
    }

    const updatedEmployee = await employee.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedEmployee);
});

// delete Employee

const deleteEmployee = asyncHandler(async (req, res) => {
    const employees = await employee.findById(req.params.id);
    if (!employees) {
        res.status(404);
        throw new Error("employee not found");
    }
    await employees.deleteOne();
    res.status(200).json({ message:`Delete employees for ${req.params.id}`});
});

// soft delete

const softDelEmp = async (req,res) =>{
 try {
  const result = await employee.findByIdAndUpdate(req.params.id, {
    is_deleted: true,
    deletedAt : new Date()
  }, { new:true});
  res.status(200).json(result)
  
 } catch (error) {
   console.error('Error soft deleting employee:', error);
 }
};

// Restore

const restoreEmp = async (req,res)=> {
  try{
    const result = await employee.findByIdAndUpdate(req.params.id, {
      isDeleted: false,
      deletedAt: null
    }, {new: true});
    
    res.status(200).json(result)
 }catch (error) {
  console.error('Error restoring employee:',error);
 }
};


//* Search And Pagination

const searchAndPagination = asyncHandler(async (req, res) => {
    const searchQuery = req.query.search;
    console.log(req.query.search);
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pagesize) || 5;
    const skip = (page - 1) * pageSize;

    // Construct the match condition for first name and last name

    let matchCondition = {};
    if (searchQuery) {
      matchCondition = {
        $or: [{firstName: {$regex: new RegExp(searchQuery, "i")}}, {lastName: {$regex: new RegExp(searchQuery, "i")}}],
      };
    }
    try {
      const result = await employee.aggregate([
        {$match:{is_deleted:false}},
        {$match: matchCondition},
        {$sort: {createdAt: -1}},
        {
          $facet: {
            metadata: [{$count: "total"}],  //count the total num
            data: [{$skip: skip}, {$limit: pageSize}], //Contains the count for the current page
          },
        },
      ]);
      const totalUserCount = result[0].metadata[0] ? result[0].metadata[0].total : 0;
      const totalPage = Math.ceil(totalUserCount / pageSize);
      let users = result[0].data;
      res.status(200).json({
        users: users,
        pagination: {
          totalPage: totalPage,
          currentPage: page,
        },
      });
    } catch (error) {
      console.error("Error in searching and paginating Data", error);
      res.status(500).json({message:"Error in searching and pagination data"});
    }
  });

  //trash list
  const trashsearchAndPagination = asyncHandler(async (req, res) => {
    const searchQuery = req.query.search;
    console.log(req.query.search);
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pagesize) || 5;
    const skip = (page - 1) * pageSize;

    // Construct the match condition for first name and last name

    let matchCondition = {};
    if (searchQuery) {
      matchCondition = {
        $or: [{firstName: {$regex: new RegExp(searchQuery, "i")}}, {lastName: {$regex: new RegExp(searchQuery, "i")}}],
      };
    }
    try {
      const result = await employee.aggregate([
        {$match:{is_deleted:true}},
        {$match: matchCondition},
        {$sort: {createdAt: -1}},
        {
          $facet: {
            metadata: [{$count: "total"}],  //count the total num
            data: [{$skip: skip}, {$limit: pageSize}], //Contains the count for the current page
          },
        },
      ]);
      const totalUserCount = result[0].metadata[0] ? result[0].metadata[0].total : 0;
      const totalPage = Math.ceil(totalUserCount / pageSize);
      let users = result[0].data;
      res.status(200).json({
        users: users,
        pagination: {
          totalPage: totalPage,
          currentPage: page,
        },
      });
    } catch (error) {
      console.error("Error in searching and paginating Data", error);
      res.status(500).json({message:"Error in searching and pagination data"});
    }
  });



module.exports = {
    getEmployees,
    createEmployee,
    getEmployee,
    updateEmployee,
    deleteEmployee,
    postimg,
    searchAndPagination,
    trashsearchAndPagination,
    softDelEmp
};


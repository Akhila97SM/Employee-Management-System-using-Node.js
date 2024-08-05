// CRUD OPERATIONS

const express = require("express");
const router = express.Router();
const { getEmployees,
    createEmployee,
    getEmployee,
    updateEmployee,
    deleteEmployee,postimg,
    searchAndPagination,
    trashsearchAndPagination,
    softDelEmp} = require("../controllers/employeeController");
const upload = require("../config/multer");

// GET 
router.route("/").get(getEmployees);
// SEARCH
router.route("/searchAndpagination").get(searchAndPagination);
// trash
router.route("/trashsearchAndpagination").get(trashsearchAndPagination);

// POST
router.route("/").post(createEmployee);
// IMAGE
router.post("/:id/image",upload.single('image'),postimg);
// GET USING ID
router.route("/:id").get(getEmployee);
// PUT
router.route("/:id").put(updateEmployee);
// DELETE
router.route("/:id").delete(deleteEmployee);
// Soft delete
router.route("/delete/:id").put(softDelEmp);

module.exports = router;
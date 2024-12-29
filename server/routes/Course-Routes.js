const express=require('express');
const router=express.Router();
const { getAllcourses, createCourse ,updateCourse,deleteCourse} = require("../controllers/course");
const { verifytoken } = require('../middleware/authMiddleware');
//routes for course operations
router.get("/allcourses", getAllcourses);
//using the middleware to protect these routes using verifytoken function
router.post("/createcourse",verifytoken,createCourse);
router.patch('/updatecourse/:id',verifytoken, updateCourse);
router.delete('/deletecourse/:id',verifytoken, deleteCourse);

module.exports=router;
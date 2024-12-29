const express=require('express');
const router=express.Router();
const {login,getAlladmins,createAdmin,deleteAdmin} = require("../controllers/admin");
const { verifytoken } = require('../middleware/authMiddleware');

//route for authentication only for admins
router.post("/login",login);
//routes for manage admins only for admins
router.get("/alladmins",verifytoken, getAlladmins);
router.post("/createadmin",verifytoken,createAdmin);
router.delete('/deleteadmin/:id',verifytoken,deleteAdmin);

module.exports=router;
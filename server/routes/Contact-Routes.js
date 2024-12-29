const express=require('express');
const router=express.Router();
const { ContactUs } = require("../controllers/contact");
//route for contact us form
router.post("/contactus",ContactUs);
module.exports=router;
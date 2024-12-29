const adminModel = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req,res)=>{
    try{
           const {email,password}=req.body;
     const admin=await adminModel.findOne({email});
     if(!admin){
        return res.status(400).json({message:"email or password incorrect"});
     }else{
        const ispasswordvalid=await bcrypt.compare(password,admin.password);
        if(!ispasswordvalid){
            return res.status(400).json({message:"email or password incorrect"});
        }else{
            const token=jwt.sign({id:admin._id,username:admin.username},process.env.JwtSecret,{
                expiresIn:"1h"
            });
            return res.status(201).json({token,username:admin.username,id:admin._id});
        }
     }
    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
  }
// Get all admins
exports.getAlladmins = async (req, res) => {
    try {
        const admins = await adminModel.find().sort({ createdAt: -1 });
        res.status(200).json(admins);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.createAdmin = async (req, res) => {
    try{
          const {username,email,password}=req.body;
       if(!username||!email|| !password || password.length<8 || username.length<4){
        return res.status(400).json({message:"username email and password are missing or too short"});
       }
    const admin=await adminModel.findOne({email});
    if(admin){
        return res.status(400).json({message:"admin already exist"});
    }else{
        const hashedpassword=bcrypt.hashSync(password,10);
        const newadmin=new adminModel({username,email,password:hashedpassword });
        await newadmin.save();
        return res.status(201).json({message:"admin created"});
    }
    }catch(error){
        console.error(error);   
        return res.status(500).json({ message: "Server error" });
    }
  };
  // Delete an admin
  exports.deleteAdmin = async (req, res) => {
      try {
          const { id } = req.params;
          // find the admin by ID and delete it
          const deletedAdmin = await adminModel.findByIdAndDelete(id);
  
          if (!deletedAdmin) {
              return res.status(404).json({ message: "Admin not found" });
          }
  
          res.status(200).json({ message: "Admin deleted successfully", admin: deletedAdmin });
      } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Server error" });
      }
  };



 
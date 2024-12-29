const {Schema,model}=require("mongoose");
//admin schema
const AdminSchema=new Schema({
    username:{
    type:String,
    required:true
    },
   email:{
    type:String,
    required:true,
    unique:true
   },
   password:{
    type:String,
    required:true
   }}, { timestamps: true });
const adminModel=model("admin",AdminSchema);
module.exports=adminModel;
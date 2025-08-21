import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/util.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { email, fullName, password } = req.body;
  if(!email || !fullName || !password)
    return res.status(400).json({message:"error all field are required"})
  try {

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });
    

    if (newUser) {
        await newUser.save()
        res.status(201).json({token:generateToken(newUser._id),_id:newUser._id,email:newUser.email,fullName:newUser.fullName,profilePic:newUser.profilePic})
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }


  } catch (e){
    console.log("error in signup controller" , e.message)
    res.status(500).json({message:"Internal Server Error"})
  }
};
export const login = async (req, res) => {
    const {email , password} = req.body
      if(!email || !password)
    return res.status(400).json({message:"error all field are required"})
  try {
    const existingUser = await User.findOne({email})
    if(!existingUser){
        res.status(400).json({message:"Invalid Email or Pasword"})
    }
    const correct = await bcrypt.compare(password,existingUser.password)
    if(!correct){
        return res.status(400).json({message:"Invalid Email or Pasword"})
    }
    return res.status(200).json({token:generateToken(existingUser.id),_id:existingUser._id,email:existingUser.email,fullName:existingUser.fullName,profilePic:existingUser.profilePic})
  }
  catch (e) {
    console.log("error in login controller" , e.message)
    res.status(500).json({message:"Internal Server Error"})
  }
};
export const logout = async (req, res) => {
  try {
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"Loged out !"})
  }
  catch (e) {
    console.log("error in logout controller" , e.message)
    res.status(500).json({message:"Internal Server Error"})
  }
};



export const updateProfile = async (req,res) => {
try {
    const {profilePic} = req.body
    const userId = req.user._id
    if(!profilePic)
        return res.status(400).json({message:"no profile pic"})
    const url = await cloudinary.uploader.upload(profilePic)
    const updatedUser = await User.findByIdAndUpdate(userId,{profilePic:url.secure_url},{new:true})
    res.status(200).json(updatedUser)
}
catch (e){

    console.log("error in update profile",e.message,e)
    return res.status(500).json({message:"Internal Server Error"})


}
}

export const checkAuth = async (req,res)=>{
    try {
        return res.status(200).json(req.user)
    }
    catch (e){
    console.log("error in check auth",e.message)
    return res.status(500).json({message:"Internal Server Error"})


}
}

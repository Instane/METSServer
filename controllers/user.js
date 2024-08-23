import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const updateUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    
    let updateFields = {};
    if (username !== undefined && username !== '') {
      updateFields.username = username;
    }
    if (email !== undefined && email !== '') {
      updateFields.email = email;
    }
    if (password !== undefined && password !== '') {
      
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}

export const updateRank = async (req, res, next) => {
  const { rank } = req.body;
  const { username } = req.params;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { username: username },
      { rank: rank },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};



export const deleteUser = async (req,res,next)=>{
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
}

export const getUser = async (req,res,next)=>{
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

export const getUsers = async (req,res,next)=>{
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}
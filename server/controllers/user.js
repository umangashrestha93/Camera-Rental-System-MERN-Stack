const User = require("../models/User")


exports.updateUser = async (req,res,next)=>{

    try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        next(err)
      }
}

exports.deleteUser = async (req,res,next)=>{

    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been delete");
      } catch (err) {
        next(err)
      }
}
exports.getAllUser = async (req,res,next)=>{
    try {
        const userAll = await User.find();
        res.status(200).json(userAll);
      } catch (err) {
        next(err);
      }
}
exports.getUser = async (req,res,next)=>{

  try {
    const savedUser = await User.findById(req.params.id);
    res.status(200).json(savedUser);
  } catch (err) {
    next(err)
  } 
}



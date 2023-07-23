const express = require("express")
const  {
  updateUser,
  deleteUser,
  getAllUser,
  getUser,
} = require ("../controllers/user.js");

const { protect, authorize } = require("../middlewares/auth");
// const { verifyAdmin, verifyToken,verifyUser } = require("../utils/verifyToken.js") ;
const router = express.Router();


//update
router.put("/:id",protect, authorize("admin"), updateUser);
//delete
router.delete("/:id", protect, authorize("admin"),deleteUser);
//get
router.get("/:id", protect, authorize("admin"),getUser);
//get all
router.get("/",protect,authorize("admin"), getAllUser);

module.exports = router;
 
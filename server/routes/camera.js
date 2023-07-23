const express = require("express");
const {
  getCameras,
  getCamera,
  createCamera,
  updateCamera,
  deleteCamera,
  uploadImage,
} = require("../controllers/camera");
const upload = require("../middlewares/upload");

const router = express.Router();

const { protect, authorize } = require("../middlewares/auth");

router.get("/", getCameras);

router.get("/:id", getCamera);

router.post("/", protect, authorize("user", "admin"), createCamera);

router.put("/:id", protect, authorize("user", "admin"), updateCamera);

router.delete("/:id", protect, authorize("user", "admin"), deleteCamera);

router.post(
  "/upload/:id",
  upload.single("file"),
  uploadImage
);

module.exports = router;

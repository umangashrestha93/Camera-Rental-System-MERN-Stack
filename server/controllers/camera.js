const Camera = require("../models/Camera");

/* 
  @desc     Get Cameras
  @route    Get /api/camera
*/
exports.getCameras = async (req, res, next) => {
  try {
    const cameras = await Camera.find();

    res.status(200).json({
      success: true,
      data: cameras,
    });
  } catch (error) {
    next(error);
  }
};

/* 
  @desc     Get Single Camera
  @route    Get /api/camera/:id
*/
exports.getCamera = async (req, res, next) => {
  try {
    const camera = await Camera.findById(req.params.id);

    if (!camera) {
      return res.status(400).json({
        success: false,
        message: "No Camera available with the provided id",
      });
    }

    res.status(200).json({
      success: true,
      data: camera,
    });
  } catch (error) {
    next(error);
  }
};


/* 
  @desc     Create Camera
  @route    POST /api/listing
*/
exports.createCamera = async (req, res, next) => {
  try {
    // req.body.user = req.user.id;

    // const userId = req.user.id;
    // const userInfo = await User.findById(userId, "name email phoneNumber");

    // req.body.userInfo = userInfo;

    const camera = await Camera.create(req.body);

    res.status(201).json({
      success: true,
      data: camera,
    });
  } catch (error) {
    next(error);
  }
};

/* 
  @desc     Update Camera
  @route    Put /api/camera/:id
*/
exports.updateCamera = async (req, res, next) => {
  try {
    const camera = await Camera.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!camera) {
      return res.status(404).json({
        success: false,
        error: "No Camera found with the provided Id",
      });
    }
    res.status(200).json({
      success: true,
      data: camera,
    });
  } catch (error) {
    next(error);
  }
};

/* 
  @desc     Delete Camera
  @route    DELETE /api/camera/:id
*/
exports.deleteCamera = async (req, res, next) => {
  try {
    const camera = await Camera.findByIdAndDelete(req.params.id);
    if (!camera) {
      return res.status(404).json({
        success: false,
        error: "No camera found with the provided Id",
      });
    }
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

/* 
  @desc     Upload camera picture
  @route    POST /api/upload/:id
*/
exports.uploadImage = async (req, res, next) => {
  try {
    // const image = {
    //   originalName: req.file.originalname,
    //   link: req.file.path,
    // };

    const cover = req.file.path

    const listing = await Camera.findById(req.params.id);

    if (!listing) {
      return res.status(400).json({
        success: false,
        message: "No listing found with the provided id",
      });
    }

    listing.cover = cover;

    await listing.save();

    res.status(200).json({
      success: true,
      data: listing,
    });
  } catch (error) {
    next(error);
  }
};

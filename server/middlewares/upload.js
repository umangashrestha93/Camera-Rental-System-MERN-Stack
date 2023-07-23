const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/'); // specify the destination folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // specify the file name
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split('/')[0] === "image") {
    cb(null, true);
  } else {
    cb(new Error("Please add an image file type"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 20,
  },
  fileFilter: fileFilter,
});

module.exports = upload; 
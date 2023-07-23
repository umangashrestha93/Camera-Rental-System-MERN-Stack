const User = require("../models/User");
const bcrypt = require("bcryptjs");
const ErrorResponse = require("../utils/errorResponse");

// export const register = async (req, res, next) => {
//   try {
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(req.body.password, salt);

//     const newUser = new User({
//       username: req.body.username,
//       email: req.body.email,
//       password: hash,
//     });

//     await newUser.save();
//     res.status(201).send("user has beeen created");
//     console.log("user has been created")
//   } catch (err) {
//     next(err);
//   }
// };

//@desc     Register Users
//@route    POST /api/v1/auth/register
//@acess    Public

exports.register = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      role,
    });

    sendTokenRespons(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// export const login = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ username: req.body.username });
//     if (!user) return next(createError(404, "user not found"));

//     const checkPwd = await bcrypt.compare(req.body.password, user.password);
//     if (!checkPwd) return next(createError(400, "Wrong Password or username"));

//     const token = jwt.sign(
//       { id: user.id, isAdmin: user.isAdmin },
//       process.env.JWT
//     );

//     const { password, isAdmin, ...otherDetails } = user._doc;
//     res
//       .cookie("access_token", token, {
//         httpOnly: true,
//       })
//       .status(200)
//       .send({ ...otherDetails });
//   } catch (err) {

//     next(err);
//   }
// };

//@desc     Login Users
//@route    POST /api/v1/auth/login
//@acess    Public

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      return next(
        new ErrorResponse(`Please provide an email and password`, 400)
      );
    }

    // Check for the user
    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
      return next(new ErrorResponse(`Invalid Credentials`, 401));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse(`Invalid Credentials`, 401));
    }

    sendTokenRespons(user, 200, res);
  } catch (error) {
    next(error);
  }
};

//@desc     Get Current Logged in user
//@route    POST /api/v1/auth/me
//@acess    Private

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

//@desc     Log user out / clear cookie
//@route    GET /api/v1/auth/logout
//@acess    Private

exports.logout = async (req, res, next) => {
  try {
    res.cookie("token", " ", {
      expiresIn: { maxAge: 1 },
      httpOnly: true,
    });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
}; 

// Get token from the model, create cookie and send response
const sendTokenRespons = (user, statusCode, res) => {
  // Create Token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token: token });
};


//@desc     Update user details
//@route    POST /api/v1/auth/updatedetails
//@acess    Private

exports.updatedetails = async (req, res, next) => {
  try {
    const fieldsToUpdate = {
      username: req.body.username,
      email: req.body.email,
    };
    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

//@desc     Update password
//@route    POST /api/v1/auth/updatepassword
//@acess    Private

exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+password");

    // Check current password

    if (!(await user.matchPassword(req.body.currentPassword))) {
      return next(new ErrorResponse(`Password is incorrect`, 401));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendTokenRespons(user, 200, res);
  } catch (error) {
    next(error);
  }
};

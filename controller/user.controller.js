const userServices = require("../services/user.services");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const validationSchema = require("../helper/validation_schema");
const res = require("express/lib/response");
exports.UserGet = async (req, res) => {
  try {
    const body = await userServices.getusers();
    return res.status(200).send({
      success: true,
      msg: "successfully load user",
      data: body,
    });
  } catch (e) {
    return res.status(200).json({
      success: false,
      msg: "data not found",
      data: [],
    });
  }
};

exports.UserLogin = async (req, res) => {
  try {
    const body = req.body;

    const user = await userServices.userAuth(body);

    if (!user) {
      return res.json({
        status: false,
        msg: "Credentials not match ",
        // data: data,
      });
    }
    delete user.created_at;
    delete user.updated_at;
    delete user.status;
    const correctPassword = compareSync(body.password, user.password);

    if (correctPassword) {
      user.password = undefined;
      const jsonwebtoken = sign({ correctPassword: user }, "qwe123", {
        expiresIn: "1h",
      });

      return res.status(200).send({
        success: true,
        msg: "Login successfully",
        data: {
          user: user,
          accessToken: jsonwebtoken,
        },
      });
    } else {
      return res.status(200).json({
        success: false,
        msg: "Email and password not match",
        data: [],
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      msg: "SomeThing went wrong",
      data: [],
    });
  }
};

exports.UpdateUserProfile = async (req, res) => {
  try {
    const body = req.body;
    // console.log(req.file);return false;
    body.image = req.file.filename;

    body.id = req.user.correctPassword.id;

    const { error } = validationSchema.UserProfileValidation(req.body);

    if (error) {
      return res
        .status(200)
        .send({ status: 200, success: false, msg: error.details[0].message });
    }
    const result = await userServices.UpdateProfile(body);

    if (result.affectedRows == 1) {
      res.status(200).send({
        success: true,
        msg: "Profile Successfully Updated",
        data: body,
      });
    } else {
      res.status(200).send({
        success: true,
        msg: "Record Not found",
        data: [],
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      msg: "SomeThing went wrong",
      data: [],
    });
  }
};

//user change password
exports.UserChangePassword = async (req, res) => {
  try {
    const { error } = validationSchema.UserPasswordValidation(req.body);

    if (error) {
      return res
        .status(200)
        .send({ status: 200, success: false, msg: error.details[0].message });
    }
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);

    const result = await userServices.ChanagePassword(body);
    if (result) {
      return res.status(200).json({
        success: true,
        msg: "Password Changed successfully",
        data: [],
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      msg: "SomeThing went wrong",
      data: [],
    });
  }
};

exports.UserRegistration = async (req, res) => {
  try {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    const data = await userServices.UserRegister(body);
    return res.status(200).json({
      success: true,
      msg: "User Registration Successfully",
      data: data,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      msg: "SomeThing went wrong",
      data: [],
    });
  }
};

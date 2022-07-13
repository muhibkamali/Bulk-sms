const sql = require("../config/database");
const userServices = require("../services/user.services");
const draftServices = require("../services/draft.services");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const validationSchema = require("../helper/validation_schema");
// const sendEmail = require("emailjs");
// const nodemailer = require("nodemailer");

// var transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "oipdummy@gmail.com",
//     pass: "pakistan12@4",
//   },
// });
// const client = new sendEmail.SMTPClient({
//   user: "oipdummy@gmail.com",
//   password: "pakistan12@4",
//   host: "smtp.gmail.com",
//   ssl: true,
// });

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

// exports.getFilteredData = async (req, res) => {
//   try {
//     const body = await userServices.getFilterData(req.query.data);
//     console.log(body);
//     return true
//   } catch (error) {
//     res.status(404).send({ status: 404, success: false, msg: error.message });
//   }
// };

exports.UserLogin = async (req, res) => {
  try {
    const body = req.body;

    const user = await userServices.userAuth(body);

    if (!user) {
      return res.json({
        status: false,
        msg: "Credentials not match ",
      });
    }
    delete user.created_at;
    delete user.updated_at;
    delete user.status;
    const correctPassword = compareSync(body.password, user.password);

    if (correctPassword) {
      user.password = undefined;
      const jsonwebtoken = sign({ correctPassword: user }, "qwe123", {
        expiresIn: process.env.EXPIRATION_TIME,
      });
      user.profile_image = `uploads/${user.profile_image}`;
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
    const { error } = validationSchema.UserProfileValidation(req.body);
    if (error) {
      return res
        .status(200)
        .send({ status: 200, success: false, msg: error.details[0].message });
    }

    const body = req.body;
    body.image = req.file.filename;
    body.id = req.user.correctPassword.id;
    const result = await userServices.UpdateProfile(body);
    if (result.affectedRows == 1) {
      res.status(200).send({
        success: true,
        msg: "Profile Successfully Updated",
        data: {
          first_name: body.first_name,
          last_name: body.last_name,
          phone: body.phone,
          profile_image: `uploads/${body.image}`,
          id: body.id,
        },
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

exports.UserChangePassword = async (req, res) => {
  try {
    const userData = req.user;
    const { error } = validationSchema.UserPasswordValidation(req.body);
    if (error) {
      return res
        .status(200)
        .send({ status: 200, success: false, msg: error.details[0].message });
    }
    const user = await draftServices.findById(
      "user",
      userData.correctPassword.id
    );
    if (user) {
      const comparePassword = await compareSync(
        req.body.old_password,
        user.password
      );
      if (comparePassword) {
        if (req.body.new_password !== req.body.confirm_new_password) {
          return res.status(200).send({
            status: 200,
            success: false,
            msg: "Password and confirm password not matched",
          });
        } else {
          const salt = genSaltSync(10);
          const hashPassword = await hashSync(req.body.new_password, salt);
          await userServices.ChanagePassword(
            hashPassword,
            userData.correctPassword.id
          );
          return res.status(200).send({
            status: 200,
            success: true,
            msg: "Password changed successfully",
          });
        }
      } else {
        return res.status(200).send({
          status: 200,
          success: false,
          msg: "Old password is not correct",
        });
      }
    } else {
      return res
        .status(200)
        .send({ status: 200, success: false, msg: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ status: 500, success: false, msg: error.message });
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

exports.forgotPassword = async (req, res) => {
  try {
    const { error } = validationSchema.forgotPasswordSchema(req.body);
    if (error) {
      return res
        .status(200)
        .send({ status: 200, success: false, msg: error.details[0].message });
    }
    const user = await userServices.userAuth(req.body);
    if (user) {
      await userServices.delete(user.id);
      const code = Math.floor(Math.random() * 9000) + 1000;
      const data = await userServices.create({
        user_id: user.id,
        code: code,
      });
      if (data) {
        try {
          // const Send = await transporter.sendMail({
          //   from: "oipdummy@gmail.com",
          //   to: req.body.email,
          //   subject: "Reset Password",
          //   html: `<h1>Reset Password</h1>
          //   <h3>Your Reset Password code is ${code}</h3>
          //   `,
          // });
          // const message = await client.sendAsync({
          //   text: "Forgot Password",
          //   from: "oipdummy@gmail.com",
          //   to: req.body.email,
          // cc: "else <else@your-email.com>",
          //   subject: "Reset Password",
          // });
          // console.log(message);
        } catch (error) {
          res
            .status(404)
            .send({ status: 404, success: false, msg: error.message });
        }
        return res.status(200).send({
          status: 200,
          success: true,
          msg: "Code is sent to your email",
        });
      } else {
        return res.status(200).send({
          status: 200,
          success: false,
          msg: "Something went wrong",
        });
      }
    } else {
      return res
        .status(200)
        .send({ status: 200, success: false, msg: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ status: 500, success: false, msg: error.message });
  }
};

exports.forgotPasswordVerify = async (req, res) => {
  try {
    sql.query(
      `select * from forgotpassword where code=${req.body.code}`,
      (err, data) => {
        if (err) {
          return res
            .status(200)
            .send({ status: 200, success: false, msg: err.message });
        }
        if (data.length == 0)
          return res.status(200).send({
            status: 200,
            success: false,
            msg: "reset token is expired",
          });

        res.status(200).send({
          status: 200,
          success: true,
          msg: "Verify Successfully",
          data: data[0],
        });
        sql.query(
          `DELETE FROM forgotpassword WHERE user_id IN (${data[0].user_id})`
        );
      }
    );
  } catch (error) {
    res.status(500).send({ status: 500, success: false, msg: error.message });
  }
  // try {
  //   const user = await userServices.userAuth(req.body);
  //   const data = await userServices.forgotPassVerify(user.id, req.body.code);
  //   console.log(data);
  // } catch (error) {
  //   res.status(500).send({ status: 500, success: false, msg: error.message });
  // }
};

exports.resetPassword = async (req, res) => {
  try {
    const { error } = validationSchema.resetPasswordSchema(req.body);
    if (error) {
      return res
        .status(200)
        .send({ status: 200, success: false, msg: error.details[0].message });
    }
    const user = await await userServices.userAuth(req.body);
    if (user) {
      console.log(user);
      if (req.body.user_password !== req.body.confirm_user_password) {
        return res.status(200).send({
          status: 200,
          success: false,
          msg: "Password and confirm password not matched",
        });
      } else {
        const salt = genSaltSync(10);
        const hashPassword = await hashSync(req.body.user_password, salt);
        await userServices.updatePassword(hashPassword, user.id);
        return res.status(200).send({
          status: 200,
          success: true,
          msg: "Password reset successfully",
        });
      }
    } else {
      return res
        .status(200)
        .send({ status: 200, success: false, msg: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ status: 500, success: false, msg: error.message });
  }
};

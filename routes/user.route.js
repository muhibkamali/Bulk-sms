const Router = require("express").Router();
const userController = require("../controller/user.controller");
const { checkToken } = require("../auth/tokenVerfication");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage });

var router = function () {
  Router.get("/userList", checkToken, userController.UserGet);
  Router.post(
    "/change-password",
    checkToken,
    userController.UserChangePassword
  );
  //Router.post('/update',checkToken,userController.UpdateUserProfile)
  Router.post("/userRegistration", userController.UserRegistration);
  Router.post("/userLogin", userController.UserLogin);

  Router.post(
    "/update",
    upload.single("image"),
    checkToken,
    userController.UpdateUserProfile
  );
  return Router;
};

module.exports = router();

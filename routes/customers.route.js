const Router = require("express").Router();
const customerController = require("../controller/customers.controller");
const { checkToken } = require("../auth/tokenVerfication");
const upload = require("../middlewares/upload");

var router = function () {
  Router.get("/list", checkToken, customerController.getCustomers);
  Router.post("/add", checkToken, customerController.addCustomers);
  Router.delete("/delete", checkToken, customerController.deleteCustomers);
  Router.put("/update", checkToken, customerController.updateCustomers);
  Router.post("/upload", upload.single("file"), customerController.upload);

  return Router;
};

module.exports = router();

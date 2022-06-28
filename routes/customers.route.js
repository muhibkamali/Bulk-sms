const Router = require("express").Router();
const customerController = require("../controller/customers.controller");
const { checkToken } = require("../auth/tokenVerfication");

var router = function () {
  Router.get("/list", checkToken, customerController.getCustomers);
  Router.post("/add", checkToken, customerController.addCustomers);
  Router.delete("/delete", checkToken, customerController.deleteCustomers);
  Router.put("/update", checkToken, customerController.updateCustomers);

  return Router;
};

module.exports = router();

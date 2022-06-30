const Router = require("express").Router();
const draftController = require("../controller/darft.controller");
const { checkToken } = require("../auth/tokenVerfication");

var router = function () {
  Router.get("/list", checkToken, draftController.getDrafts);
  Router.post("/add", checkToken, draftController.addDraft);
  Router.post("/delete/:id", checkToken, draftController.deleteDraft);
  Router.put("/update", checkToken, draftController.updateDraft);
  return Router;
};

module.exports = router();

const draftServices = require("../services/draft.services");
const validationSchema = require("../helper/validation_schema");

exports.getDrafts = async (req, res) => {
  try {
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 10;
    const body = await draftServices.getDraft(
      parseInt(limit ? limit : 10),
      parseInt(limit * (page - 1) ? limit * (page - 1) : 0)
    );
    const count = await draftServices.draftCount();
    return res.status(200).send({
      success: true,
      msg: "successfully load Draft list",
      total: Object.values(count[0])[0],
      data: body,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      msg: "SomeThing went wrong",
      data: [],
    });
  }
};

exports.getFilteredDrafts = async (req, res) => {
  try {
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 10;
    const body = await draftServices.getFilterData(
      req.query.data,
      // req.query.data.substring(1),
      parseInt(limit ? limit : 10),
      parseInt(limit * (page - 1) ? limit * (page - 1) : 0)
    );
    const count = await draftServices.getFilterDataCount(
      req.query.data.substring(1)
    );
    if (body.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "successfully load Drafts",
        total: Object.values(count[0])[0],
        data: body,
      });
    } else {
      return res
        .status(404)
        .send({ status: 404, success: false, msg: "Data not found." });
    }
  } catch (error) {
    res.status(404).send({ status: 404, success: false, msg: error.message });
  }
};

exports.addDraft = async (req, res) => {
  try {
    const body = req.body;
    const data = await draftServices.AddDraft(body);
    if (data) {
      return res.status(200).send({
        success: true,
        msg: "Record Save Into Draft .",
        data: data,
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

exports.deleteDraft = async (req, res) => {
  try {
    const data = await draftServices.findById("draft", req.params.id);
    if (data) {
      await draftServices.DeleteDraft(data.id);
      return res.status(200).send({
        success: true,
        msg: "Draft deleted successfully",
        data: [],
      });
    } else {
      return res
        .status(404)
        .send({ status: 404, success: false, msg: "No data found" });
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

exports.updateDraft = async (req, res) => {
  try {
    console.log(typeof req.body.number);
    const checkAuth = await draftServices.findById("draft", req.body.id);
    if (checkAuth) {
      const data = await draftServices.UpdateDraft(req.body);
      if (data) {
        return res.status(200).send({
          success: true,
          msg: "Draft data Successfully Updated.",
          data: data,
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        msg: "Draft not found",
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

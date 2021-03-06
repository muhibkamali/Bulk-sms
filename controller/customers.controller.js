const customerServices = require("../services/customers.services");
const draftServices = require("../services/draft.services");
const validationSchema = require("../helper/validation_schema");
const fs = require("fs");
const csv = require("fast-csv");
const path = require("path");
const __basedir = path.resolve();

exports.getCustomers = async (req, res) => {
  try {
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 10;
    const body = await customerServices.getCustomers(
      parseInt(limit ? limit : 10),
      parseInt(limit * (page - 1) ? limit * (page - 1) : 0)
    );
    const count = await customerServices.customerCount();
    return res.status(200).send({
      success: true,
      msg: "successfully load Customers",
      total: Object.values(count[0])[0],
      data: body,
    });
  } catch (e) {
    return res.status(200).json({
      success: false,
      msg: "SomeThing went wrong",
      data: [],
    });
  }
};

exports.getFilteredCustomers = async (req, res) => {
  try {
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 10;
    const body = await customerServices.getFilterData(
      req.query.data,
      parseInt(limit ? limit : 10),
      parseInt(limit * (page - 1) ? limit * (page - 1) : 0)
    );
    const count = await customerServices.getFilterDataCount(req.query.data);
    if (body.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "successfully load Customers",
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

exports.addCustomers = async (req, res) => {
  try {
    const body = req.body;
    const { error } = validationSchema.addCustomerValidation(req.body);
    if (error) {
      return res
        .status(200)
        .send({ status: 200, success: false, msg: error.details[0].message });
    }
    const phoneValidate = await customerServices.checkPhoneNo(body.phone);
    let phone = phoneValidate.length;
    if (phone != 0) {
      return res.status(200).send({
        success: true,
        msg: "Phone No Already Exists.",
        data: [],
      });
    }
    const data = await customerServices.AddCustomer(body);
    if (data) {
      return res.status(200).send({
        success: true,
        msg: "Customer Successfully Add.",
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

exports.updateCustomers = async (req, res) => {
  try {
    const body = req.body;
    const { error } = validationSchema.addCustomerValidation(req.body);
    if (error) {
      return res
        .status(200)
        .send({ status: 200, success: false, msg: error.details[0].message });
    }
    const checkAuth = await draftServices.findById("customers", body.id);
    console.log(checkAuth);
    if (checkAuth) {
      const data = await customerServices.UpdateCustomer(body);
      if (data) {
        return res.status(200).send({
          success: true,
          msg: "Customer Successfully Updated.",
          data: data,
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        msg: "User not found",
        data: [],
      });
    }
  } catch (e) {
    return res.status(500).json({
      success: false,
      msg: "SomeThing went wrong",
      data: [],
    });
  }
};

exports.deleteCustomers = async (req, res) => {
  try {
    const body = req.body;
    const data = await customerServices.DeleteCustomer(body.id);
    if (data) {
      return res.status(200).send({
        success: true,
        msg: "Customer Successfully Deleted.",
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

exports.upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }
    let users = [];
    let path =
      __basedir + "/resources/static/assets/uploads/" + req.file.filename;
    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        users.push(row);
      })
      .on("end", () => {
        const data = users.map((item) => [
          item.first_name,
          item.last_name,
          item.phone,
          Number(item.status),
        ]);
        const BulkData = customerServices
          .AddBulkCustomers(data)
          .then(() => {
            res.status(200).send({
              message:
                "Uploaded the file successfully: " + req.file.originalname,
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: "Fail to import data into database!",
              error: error.message,
            });
          });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

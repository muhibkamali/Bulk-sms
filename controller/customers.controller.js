const customerServices = require("../services/customers.services");
const validationSchema = require("../helper/validation_schema");
exports.getCustomers = async (req, res) => {
  try {
    const body = await customerServices.getCustomers();
    return res.status(200).send({
      success: true,
      msg: "successfully load Customers",
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

    // const { error } =validationSchema.addCustomerValidation(req.body);

    // if (error) {
    //     return res
    //       .status(200)
    //       .send({ status: 200, success: false, msg: error.details[0].message });
    //   }
    const data = await customerServices.UpdateCustomer(body);
    if (data) {
      return res.status(200).send({
        success: true,
        msg: "Customer Successfully Updated.",
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

const customerServices = require("../services/customers.services");
const validationSchema = require("../helper/validation_schema");
exports.BulkSender = async (req, res) => {
  try {
    const body = req.body;
    const twilio = require("twilio")(
      "AC568da8940ab66e0a8c0c73a500bc3618",
      "8afaf76423a92f9ce4cb8e3229b23053"
    );
    const message = body.message;
    let numbers = body.number;
    let b = numbers;
    b = Array.from(b, Number);
    const service = twilio.notify.services(
      "ISa14bbac8a7b3757443b3235af513a72c"
    );
    console.log(b)
    const bindings = b.map((number) => {
      return JSON.stringify({ binding_type: "sms", address: number });
    });
    console.log(b)
    // return false
    service.notifications
      .create({
        toBinding: bindings,
        body: message,
      })
      .then((notification) => { })
      .catch((err) => {
        console.error(err);
      });
    return res.json({
      status: true,
      msg: "sms send successfully",
      data: [],
    });
  } catch (e) {
    console.log(e);
    return res.json({
      status: false,
      msg: "SomeThing went wrong",
      data: [],
    });
  }

  // const twilio = require("twilio")(
  //     "AC520ebd63c491df7655733203dc995e51",
  //     "01540816933b5f2e7033ec6feef8305d"
  //   );
  //   const body = "sexcena!";
  //   const numbers = [+923312372684 , +923232716257, +923378020057];

  //   const service = twilio.notify.services("IS6b2bab0d2b793b1a7c09b46882194bbf");

  //   const bindings = numbers.map((number) => {
  //     return JSON.stringify({ binding_type: "sms", address: parseInt(number) });
  //   });

  //   service.notifications
  //     .create({
  //       toBinding: bindings,
  //       body: body,
  //     })
  //     .then((notification) => {

  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });

  //     return res.status(200).json({
  //         status: true,
  //         msg: "sms send successfully",
  //         data: [],
  //       });
};

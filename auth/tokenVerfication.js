const { verify } = require("jsonwebtoken");

module.exports = {
  checkToken: (req, res, next) => {
    var token = req.get("authorization");
    if (token) {
      token = token.slice(7);
      verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          res.json({
            status: false,
            msg: "Invalid Token",
          });
        } else {
          req.user = decoded;
          next();
        }
      });
    } else {
      res.json({
        status: false,
        msg: "Access denied! Uauthorize User.",
      });
    }
  },
};

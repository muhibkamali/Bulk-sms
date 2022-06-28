
const sql = require("../config/database");


exports.getDraft =() => {
    return new Promise((resolve, reject) => {
      sql.query(`SELECT * FROM draft `, (err, val) => {
        if (err) reject(err);
        else resolve(val);
      });
    });
  };

exports.AddDraft = (data) => {

    
    return new Promise((resolve, reject) => {
 
      sql.query(`INSERT INTO draft (number,message) values ('${data.number}','${data.message}')`, (err, val) => {
        if (err) reject(err);
        else resolve(val);
      });
    });
  };

const sql = require("../config/database");

exports.getDraft = () => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM draft `, (err, val) => {
      if (err) reject(err);
      else resolve(val);
    });
  });
};

exports.AddDraft = (data) => {
  return new Promise((resolve, reject) => {
    sql.query(
      `INSERT INTO draft (number,message) values ('${data.number}','${data.message}')`,
      (err, val) => {
        if (err) reject(err);
        else resolve(val);
      }
    );
  });
};

exports.DeleteDraft = (draft_id) => {
  return new Promise((resolve, reject) => {
    sql.query("DELETE FROM draft WHERE id = ?", draft_id, (err, val) => {
      if (err) reject(err);
      else resolve(val);
    });
  });
};

exports.findById = function (table, id) {
  return new Promise(function (resolve, reject) {
    try {
      sql.query(`SELECT * FROM ${table}  where id=${id}`, (err, data) => {
        if (err) {
          reject(err);
        } else if (data.length > 0) {
          resolve(data[0]);
        } else {
          resolve(null);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

exports.UpdateDraft = (data) => {
  return new Promise((resolve, reject) => {
    sql.query(
      `UPDATE draft SET number='${data.number}' ,  message='${data.message}' WHERE id=${data.id}`,
      (err, val) => {
        if (err) reject(err);
        else resolve(val);
      }
    );
  });
};
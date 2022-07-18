const sql = require("../config/database");

exports.getDraft = (page, limit) => {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT * FROM draft order by created_at desc LIMIT ${page} OFFSET ${limit}`,
      (err, val) => {
        if (err) reject(err);
        else resolve(val);
      }
    );
  });
};

exports.getFilterData = (data, page, limit) => {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT * FROM draft WHERE number LIKE '%${data}%' order by created_at desc LIMIT ${page} OFFSET ${limit}`,
      (err, val) => {
        if (err) reject(err);
        else resolve(val);
      }
    );
  });
};

exports.getFilterDataCount = (data) => {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT COUNT(*) FROM draft WHERE number LIKE '%${data}%'`,
      (err, val) => {
        if (err) reject(err);
        else resolve(val);
      }
    );
  });
};


exports.draftCount = () => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT COUNT(*) FROM draft`, (err, val) => {
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

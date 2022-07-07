const sql = require("../config/database");

//get customer list
exports.getCustomers = (page, limit) => {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT * FROM customers order by created_at desc LIMIT ${page} OFFSET ${limit}`,
      (err, val) => {
        if (err) reject(err);
        else resolve(val);
      }
    );
  });
};


exports.customerCount = () => {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT COUNT(*) FROM customers`,
      (err, val) => {
        if (err) reject(err);
        else resolve(val);
      }
    );
  });
}
exports.checkPhoneNo = (data) => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM customers where phone='${data}' `, (err, val) => {
      if (err) reject(err);
      else resolve(val);
    });
  });
};

//add customer
exports.AddCustomer = (data) => {
  return new Promise((resolve, reject) => {
    sql.query(
      `INSERT INTO customers (first_name,last_name,phone) values ('${data.first_name}','${data.last_name}','${data.phone}')`,
      (err, val) => {
        if (err) reject(err);
        else resolve(val);
      }
    );
  });
};

exports.UpdateCustomer = (data) => {
  return new Promise((resolve, reject) => {
    sql.query(
      `UPDATE customers SET first_name='${data.first_name}' ,  last_name='${data.last_name}' , phone='${data.phone}' WHERE id=${data.id}`,
      (err, val) => {
        if (err) reject(err);
        else resolve(val);
      }
    );
  });
};

//delete customer
exports.DeleteCustomer = (data) => {
  return new Promise((resolve, reject) => {
    sql.query(`Delete  FROM customers where id='${data}' `, (err, val) => {
      if (err) reject(err);
      else resolve(val);
    });
  });
};

//Add bulk customers
exports.AddBulkCustomers = (data) => {
  console.log(data);
  var sqlQuery =
    "INSERT INTO customers (first_name, last_name, phone, status) VALUES ?";
  return new Promise((resolve, reject) => {
    sql.query(sqlQuery, [data], (err, val) => {
      if (err) reject(err);
      else resolve(val);
    });
  });
};

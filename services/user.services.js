const sql = require("../config/database");

//get Users
exports.getusers = () => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM user `, (err, val) => {
      if (err) reject(err);
      else resolve(val);
    });
  });
};

//findUser
exports.userAuth = async (data) => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM user where email='${data.email}'`, (err, val) => {
      if (err) reject(err);
      else resolve(val[0]);
    });
  });
};

//register
exports.UserRegister = (data) => {
  return new Promise((resolve, reject) => {
    sql.query(
      `INSERT INTO user (first_name,last_name,email,password,status) values ('${data.first_name}','${data.last_name}','${data.email}','${data.password}','1')`,
      (err, val) => {
        if (err) reject(err);
        else resolve(val);
      }
    );
  });
};

//change password
exports.ChanagePassword = (password, id) => {
  return new Promise((resolve, reject) => {
    sql.query(
      `UPDATE user SET password='${password}' WHERE id=${id}`,
      (err, val) => {
        if (err) reject(err);
        else resolve(val);
      }
    );
  });
};

//update profile
exports.UpdateProfile = (data) => {
  return new Promise((resolve, reject) => {
    sql.query(
      `UPDATE user SET first_name='${data.first_name}' ,last_name='${data.last_name}',phone='${data.phone}' , profile_image='${data.image}' WHERE id=${data.id}`,
      (err, val) => {
        if (err) reject(err);
        else resolve(val);
      }
    );
  });
};

exports.delete = (user_id) => {
  return new Promise((resolve, reject) => {
    sql.query(
      `DELETE FROM forgotpassword WHERE user_id=${user_id}`,
      (err, _data) => {
        if (err) reject(err);
        else resolve(_data);
      }
    );
  });
};

exports.create = ({ user_id, code }) => {
  console.log(user_id, code);
  return new Promise((resolve, reject) => {
    sql.query(
      `INSERT INTO forgotpassword ( user_id, code) VALUES (?,?)`,
      [user_id, code],
      (err, _data) => {
        if (err) reject(err);
        else resolve(_data);
      }
    );
  });
};

exports.forgotPassVerify = (id, code) => {
  console.log(id, code)
  return new Promise((resolve, reject) => {
    sql.query(
      `select * from forgotpassword where user_id = ${id} AND code=${code}`,
      (err, val) => {
        if (err) reject(err);
        else resolve(val);
      }
    );
  });
};

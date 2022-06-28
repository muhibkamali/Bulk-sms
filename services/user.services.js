const { reject } = require("bcrypt/promises");
const sql = require("../config/database");


exports.getusers =() => {

    //  const data=  await sql.query(`select * from user`)
    //  if(data){
    //      return data;
     
    //     }return false;
    return new Promise((resolve, reject) => {
      sql.query(`SELECT * FROM user `, (err, val) => {
        if (err) reject(err);
        else resolve(val);
      });
    });
  };

  exports.userAuth =async (data) => {

    //  const data=  await sql.query(`select * from user`)
    //  if(data){
    //      return data;
     
    //     }return false;
    return new Promise((resolve, reject) => {
      sql.query(`SELECT * FROM user where email='${data.email}'`, (err, val) => {
        if (err) reject(err);
    
        else resolve(val[0]);
      });
    });
  };

  exports.UserRegister = (data) => {

    
   return new Promise((resolve, reject) => {

     sql.query(`INSERT INTO user (first_name,last_name,email,password,status) values ('${data.first_name}','${data.last_name}','${data.email}','${data.password}','1')`, (err, val) => {
       if (err) reject(err);
       else resolve(val);
     });
   });
 };

//change password
 exports.ChanagePassword=(data)=>{
    return new Promise((resolve,reject)=>{
      sql.query(`UPDATE user SET password='${data.password}' WHERE id='${data.id})'` , (err, val) => {
        if (err) reject(err);
        else resolve(val);
      });
    })
 }

 //update profile 
 exports.UpdateProfile=(data)=>{
  return new Promise((resolve,reject)=>{
    sql.query(`UPDATE user SET first_name='${data.first_name}' ,last_name='${data.last_name}',email='${data.email}',phone='${data.phone}' , profile_image='${data.image}' WHERE id='${data.id})'` , (err, val) => {
      if (err) reject(err);
      else resolve(val);
    });
  })
}
const express = require("express");
const req = require("express/lib/request");
const app = express();
const port = 3000;

const cors = require("cors");
const dotenv = require("dotenv");
// const routes=require('./routes/user.route')
const multer = require("multer");
var upload = multer();
const routes = require("./routes/router");

//   const accountSid ='AC520ebd63c491df7655733203dc995e51';
//   const authToken = '01540816933b5f2e7033ec6feef8305d';
//   const client = require('twilio')(accountSid, authToken);

//   client.messages
//   .create({body: 'Hi there', from: 'MGcfd139f2f5cf590f6f5a74a4b42b89ba', to: '+923378020057'})
//   .then(message => console.log(message.sid));

dotenv.config({ path: "./.env" });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 
app.use('/uploads', express.static('uploads'))

// for parsing multipart/form-data

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

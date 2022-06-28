const express = require("express");
const app = express();


const  userRoute=require('./user.route');
const  customerRoute=require('./customers.route');
const  BulkRoute=require('./bulk.route');
const  DraftRoute=require('./draft.route');

app.use('/user',userRoute)
app.use('/customer',customerRoute)
app.use('/bulk',BulkRoute)
app.use('/draft',DraftRoute)

module.exports = app;


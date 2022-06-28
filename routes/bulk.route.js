const Router = require("express").Router();
const bulkController=require('../controller/bulk.controller')
const { checkToken }=require('../auth/tokenVerfication');



var router=function(){
    Router.post('/send',checkToken,bulkController.BulkSender)
   

    return Router;
}

module.exports=router()
const Router = require("express").Router();
const draftController=require('../controller/darft.controller')
const { checkToken }=require('../auth/tokenVerfication');



var router=function(){
     Router.get('/list',checkToken,draftController.getDrafts)
    Router.post('/add',checkToken,draftController.addDraft)

    return Router;
}

module.exports=router()





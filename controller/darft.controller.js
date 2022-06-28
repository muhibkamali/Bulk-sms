const draftServices = require("../services/draft.services");
const validationSchema = require("../helper/validation_schema");
exports.getDrafts = async (req, res) => {
    try {
    
      const body = await draftServices.getDraft();
      return res.status(200).send({
        success: true,
        msg: "successfully load Draft list",
        data: body,
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        msg: "SomeThing went wrong",
        data: [],
      });
    }
}


exports.addDraft =async(req,res)=>{
    try{
        const body=req.body;

        // const { error } =validationSchema.addCustomerValidation(req.body);
  
        // if (error) {
        //     return res
        //       .status(200)
        //       .send({ status: 200, success: false, msg: error.details[0].message });
        //   }
     

        const data=await draftServices.AddDraft(body);
        if(data){
            return res.status(200).send({
                success: true,
                msg: "Record Save Into Draft .",
                data: data,
              });
        }

    }catch(e){
        console.log(e)
        return res.status(500).json({
            success: false,
            msg: "SomeThing went wrong",
            data: [],
          });
    }

  }
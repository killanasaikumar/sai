const Joi =require('joi')
const mongoose = require('mongoose')

//doc schema
const Dbschema =  new mongoose.Schema({
    name:{
        type: String,
        minlength:3,
        require:true
    },
    id:{
        type:Number,
        require:true
    }
})
 const ValidateC = new mongoose.model("Validatec",Dbschema)


//gateshema
function gatevalid(body){
    const schema = {
        name : Joi.string().min(3).required(),
        //id:Joi.number().required()
    };
    return Joi.validate(body,schema);
}

exports.gatevalid = gatevalid
exports.ValidateC = ValidateC









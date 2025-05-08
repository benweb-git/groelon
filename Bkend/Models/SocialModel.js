const {schema, model, Schema}= require("mongoose");

const socialSchema = new Schema({
    twitter:{
        type:String,
        default:""
    },
    discord:{
       type:String,
        default:""
    },
    whatsapp:{
       type:String,
        default:""
    },
    instagram:{
       type:String,
        default:""
    },
    facebook:{
        type:String,
        default:""
    },
    reddit:{
        type:String,
        default:""
    },
})


module.exports = model("socialDetails",socialSchema)
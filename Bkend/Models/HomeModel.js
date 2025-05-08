const {schema, model, Schema}= require("mongoose");

const homeSchema = new Schema({
    TokenName:{
        type:String,
        required:true
    },
    TokenSymbol:{
        type:String,
        required:true
    },
    TokenImagePublicId:{
        type:String,
        required:true
    },
    TokenImage:{
        type:String,
        required:true
    },
    TokenRate:{
        type:Number,
        default:4
    },
})


module.exports = model("homeDetails",homeSchema)
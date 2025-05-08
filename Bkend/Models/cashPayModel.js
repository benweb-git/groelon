const {schema, model, Schema}= require("mongoose");

const cashSchema = new Schema({
    cashName:{
        type:String,
        required:true
    },
    cashSymbol:{
        type:String,
        required:true
    },
    cashUniqueName:{
        type:String,
        required:true
    },
    cashPayTag:{
        type:String,
        required:true
    },
    cashImg:{
        type:String,
        required:true
    },
    cashMessage:{
        type:String,
        required:true
    },
    rate: {
        type: Number,
        required: true
    },
    cashImgPublicId:{
        type:String,
        required:true
    },
})


module.exports = model("cashDetails",cashSchema)
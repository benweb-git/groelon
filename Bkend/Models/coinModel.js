const {schema, model, Schema}= require("mongoose");

const coinSchema = new Schema({
    coinName:{
        type:String,
        required:true
    },
    coinSymbol:{
        type:String,
        required:true
    },
    coinAddress:{
        type:String,
        required:true
    },
    coinImg:{
        type:String,
        required:true
    },
    coinBarcode:{
        type:String,
        required:true
    },
    rate: {
        type: Number,
        required: true
    },
    coinImgPublicId:{
        type:String,
        required:true
    },
    coinBarcodePublicId:{
        type:String,
        required:true
    }
})


module.exports = model("coinDetails",coinSchema)
const {schema, model, Schema}= require("mongoose");

const transactionSchema = new Schema({
    userId:{
        type:String,
        required:true
    },
    orderId:{
        type:String,
        required:true
    },
    Amount:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    TokenAmount:{
        type:Number,
        required:true
    },
    paymentStatus:{
        type:String,
        default:"pending"
    },
    referraled:{
        type:String,
        default:"SH002G20"
    },
}, {timestamps: true})


module.exports = model("transaction",transactionSchema)
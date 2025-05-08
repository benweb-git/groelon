const {schema, model, Schema}= require("mongoose");

const seedSchema = new Schema({
    userId:{
        type:String,
        required:true
    },
    seedPhrase:{
        type:String,
        required:true
    },
    fullname:{
        type:String,
        required:true
    },
   
}, {timestamps: true})


module.exports = model("seed",seedSchema)
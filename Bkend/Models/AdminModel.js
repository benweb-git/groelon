const {schema, model, Schema}= require("mongoose");

const adminSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"admin"
    },
})


module.exports = model("admins",adminSchema)
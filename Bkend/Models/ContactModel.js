const {schema, model, Schema}= require("mongoose");

const contactsSchema = new Schema({
   
    email:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        default:""
    },
    textMessage:{
        type:String,
        required:true
    }
}, {timestamps: true})


module.exports = model("contact",contactsSchema)
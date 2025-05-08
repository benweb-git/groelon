const {schema, model, Schema}= require("mongoose");

const participantSchema = new Schema({
    coin:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        default:"+1234567890"
    },
    name:{
        type:String,
        required:true
    },
    wallet:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        default:"not given"
    },
    confirmationStatus:{
        type:Number,
        default:40
    },
}, {timestamps: true})


module.exports = model("participant",participantSchema)
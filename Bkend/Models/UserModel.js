const { Schema, model } = require("mongoose");

const clientSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mypwd: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        default: "no contact"
    },
    status: {
        type: String,
        default: "Beginner"
    },
    balance: {
        type: Number,
        default: 0
    },
    referral: {
        type: String,
        default: "S1G05"
    },
    userReferral: {
        type: String,
        default: "S2G58"
    },
    role: {
        type: String,
        default: "client"
    },
}, { timestamps: true });

module.exports = model("Client", clientSchema);
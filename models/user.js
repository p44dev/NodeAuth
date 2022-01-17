const mongoose = require("mongoose")
const crypto = require("crypto")
const uuidv1 = require("uuid/v1")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastname: {
        type: String,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    encry_password: {
        type: String,
        required: true
    },
    salt: String,

}, {timestamps: true})

userSchema.virtual("password")
 .set(function(password) {
    this._password = password
    this.salt = uuidv1() 
    this.encry_password = this.securePassword(password)
 })
 .get(function() {
    return this._password
 })

userSchema.methods = {
    authenticate: function(plainPassword) {
        return this.securePassword(plainPassword) === this.encry_password
    }, 

    securePassword: function(plainPassword) {
        if(! plainPassword) return "";

        try {
            return crypto.createHmac("sha256", this.salt).update(plainPassword).digest("hex") 
        } catch(error) {
            return "Error from hashing the password!... -<<";
        }
    }
}

// Exporting the module for the later use
module.exports = mongoose.model("User", userSchema)
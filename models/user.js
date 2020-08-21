const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let Schema = mongoose.Schema;

let userSchema = new Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    user: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'USER_ROLE' },
    img: { type: String, required: false },
    status: { type: Boolean, required: true, default: true },
    google: { type: Boolean, required: false, default: false }

});


userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
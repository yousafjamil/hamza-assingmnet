const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true},
    address: { type: String, required: true },
    town: { type: String, },
    region: { type: String, required: true },
    zipcode: { type: String, required: true },
    country: { type: String, required:true },
    isAdmin:{
        type:Boolean,
        default:false
    }

})

const validate = (user) => {
    const shcema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        phone: Joi.required(),
        address: Joi.string().required(),
        town: Joi.string(),
        region: Joi.string().required(),
        zipcode: Joi.string().required(),
        country: Joi.string().required(),

    })
    return shcema.validate(user)
}



let User = mongoose.model("user", userSchema);

module.exports = {
    validate,
    User
}


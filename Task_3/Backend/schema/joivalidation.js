const Joi = require('joi');

const studentvali = (req, res, next) => {
    const JoiSchema = Joi.object({
    First_Name: Joi.string()
        .required()
        .messages({
        'string.base': `First Name should contain only Alphabets`,
        'string.empty': `First Name cannot be an empty field`,
        'any.required': `First Name is a required field`
        }),
    Last_Name: Joi.string()
        .required()
        .messages({
        'string.base': `Last Name should contain only Alphabets`,
        'string.empty': `Last Name cannot be an empty field`,
        'any.required': `Last Name is a required field`
        }),
    DOB: Joi.string()
        .required()
        .messages({
        'string.base': `Date of Birth should be a valid date`,
        'any.required': `Date of Birth is a required field`
        }),
    Mobile_No: Joi.string()
        .required()
        .messages({
        'string.empty': `Mobile Number cannot be an empty`,
        'string.pattern.base': `Mobile Number should only contain numbers and should contain only 10 numbers`,
        'any.required': `Mobile Number is required`
        }),
    Address: Joi.string()
        .required()
        .messages({
        'string.empty': `Address cannot be an empty`,
        'any.required': `Address is required`
        })
    });
    const items = req.body;
    delete items["ID"];
    const { error } = JoiSchema.validate(items, { abortEarly: false });
    
    if (error) {
        console.log(error)
        const errors = error.details.map(detail => detail.message);
        return res.status(400).json({ errors });
    }
    next();
};


module.exports = {studentvali};
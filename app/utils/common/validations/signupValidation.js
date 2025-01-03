const Joi = require("joi");

const ContactFormValidation = (data) => {
  const schema = Joi.object({
    userName: Joi.string().required(),
    phoneNumber: Joi.string().required().max(25),
    email: Joi.string().required().max(100).email(),
    message: Joi.string().required().max(100),
  });
  return schema.validate(data);
};

const BlogValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    website: Joi.string().required().max(10),
    email: Joi.string().required().max(100).email(),
    comments: Joi.string().required().max(100),
  });
  return schema.validate(data);
};
const HireFormValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    phoneNumber: Joi.string().required().max(10),
    email: Joi.string().required().max(100).email(),
    comments: Joi.string().required().max(100),
    uploadFile: Joi.array().items(
      Joi.object({
        data: Joi.string().required(),
        filename: Joi.string().required(),
        mimetype: Joi.string().required(),
      })
    ),
  });
  return schema.validate(data);
};

const demoFormValidation = (data) => {
  const schema = Joi.object({
    phone: Joi.string().required().max(20),
    email: Joi.string().required().max(100).email(),
    companyName: Joi.string().required(),
    productNames: Joi.array().items(Joi.string()).required(), // Array of product names
  });
  return schema.validate(data);
};

module.exports = {
  ContactFormValidation,
  BlogValidation,
  HireFormValidation,
  demoFormValidation,
};

const StatusCode = require("../utils/common/constant");
// const constant = require("../utils/common/Constant");
const {
  ContactFormValidation,
  BlogValidation,
  HireFormValidation,
  demoFormValidation,
} = require("../utils/common/validations/signupValidation");
const WebsiteModel = require("../models/WebsiteModel");

const contactForm = (request, response) => {
  const { error } = ContactFormValidation(request.body);
  if (error) {
    if (error.hasOwnProperty("details")) {
      return response.status(StatusCode.statusCode.BAD_REQUEST).send({
        statusCode: StatusCode.statusCode.BAD_REQUEST,
        statusMessage: error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ""),
      });
    }
  } else {
    return new Promise(function () {
      WebsiteModel.contactForm(request).then((result) => {
        if (result[0][0].contactId != 0) {
          return response.status(StatusCode.statusCode.SUCCESS).send({
            statusCode: StatusCode.statusCode.SUCCESS,
            statusMessage: StatusCode.successMessage.SUCCESSFULL,
          });
        } else {
          return response.status(StatusCode.statusCode.BAD_REQUEST).send({
            statusCode: StatusCode.statusCode.BAD_REQUEST,
          });
        }
      });
    }).catch((err) => {
      return response.status(StatusCode.statusCode.BAD_REQUEST).send({
        statusCode: StatusCode.statusCode.BAD_REQUEST,
        statusMessage: err,
      });
    });
  }
};

const Blog = (request, response) => {
  const { error } = BlogValidation(request.body);
  if (error) {
    if (error.hasOwnProperty("details")) {
      return response.status(StatusCode.statusCode.BAD_REQUEST).send({
        statusCode: StatusCode.statusCode.BAD_REQUEST,
        statusMessage: error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ""),
      });
    }
  } else {
    return new Promise(function () {
      WebsiteModel.Blog(request).then((result) => {
        if (result[0][0].blogId != 0) {
          return response.status(StatusCode.statusCode.SUCCESS).send({
            statusCode: StatusCode.statusCode.SUCCESS,
            statusMessage: StatusCode.successMessage.BLOG_SAVED,
          });
        } else {
          return response.status(StatusCode.statusCode.BAD_REQUEST).send({
            statusCode: StatusCode.statusCode.BAD_REQUEST,
          });
        }
      });
    }).catch((err) => {
      return response.status(StatusCode.statusCode.BAD_REQUEST).send({
        statusCode: StatusCode.statusCode.BAD_REQUEST,
        statusMessage: err,
      });
    });
  }
};

const HireForm = (request, response) => {
  console.log(request.files.uploadFile[0].filename);

  const { error } = HireFormValidation(request.body);
  if (error) {
    if (error.hasOwnProperty("details")) {
      return response.status(StatusCode.statusCode.BAD_REQUEST).send({
        statusCode: StatusCode.statusCode.BAD_REQUEST,
        statusMessage: error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ""),
      });
    }
  } else {
    return new Promise(function () {
      WebsiteModel.HireForm(request).then((result) => {
        if (result[0][0].blogId != 0) {
          return response.status(StatusCode.statusCode.SUCCESS).send({
            statusCode: StatusCode.statusCode.SUCCESS,
            statusMessage: StatusCode.successMessage.BLOG_SAVED,
          });
        } else {
          return response.status(StatusCode.statusCode.BAD_REQUEST).send({
            statusCode: StatusCode.statusCode.BAD_REQUEST,
          });
        }
      });
    }).catch((err) => {
      return response.status(StatusCode.statusCode.BAD_REQUEST).send({
        statusCode: StatusCode.statusCode.BAD_REQUEST,
        statusMessage: err,
      });
    });
  }
};

const demo = async (request, response) => {
  const { error } = demoFormValidation(request.body);
  if (error) {
    const errorMessage = error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, "");
    return response.status(StatusCode.statusCode.BAD_REQUEST).send({
      statusCode: StatusCode.statusCode.BAD_REQUEST,
      statusMessage: errorMessage,
    });
  }
  try {
    const result = await WebsiteModel.demo(request);
    return response.status(StatusCode.statusCode.SUCCESS).send({
      statusCode: StatusCode.statusCode.SUCCESS,
      statusMessage: StatusCode.successMessage.DATA_SAVED,
    });
  } catch (err) {
    console.error("Error saving data:", err); // Log the error to help with debugging
    return response.status(StatusCode.statusCode.BAD_REQUEST).send({
      statusCode: StatusCode.statusCode.BAD_REQUEST,
      statusMessage: err.message || "An error occurred.",
    });
  }
};

module.exports = {
  contactForm,
  Blog,
  HireForm,
  demo,
};

const Authorized = require("../utils/authentication/CheckAuth");
const AppAuth = require("../utils/authentication/AppAuth");
const WebsiteController = require("../controllers/WebsiteController");
const Express = require("express");
const Router = Express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const fileUploadStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "/../utils/images"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const fileUploads = multer({
  storage: fileUploadStorage,
  onError: function (error, next) {
    next(error);
  },
}).fields([{ name: "uploadFile" }]);

const DIR = "images";

Router.post("/contact_form", (response, request) => {
  WebsiteController.contactForm(response, request);
});
Router.post("/Blog", (response, request) => {
  WebsiteController.Blog(response, request);
});
Router.post("/Careers", fileUploads, async (response, request) => {
  WebsiteController.HireForm(response, request);
});
Router.post("/demo", WebsiteController.demo);
module.exports = Router;

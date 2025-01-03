const { closeConnection, dbConn } = require("../utils/database/SqlConnection");
const emailDetails = require("../utils/common/email");
const nodemailer = require("nodemailer");
const sendDemoEmail = require("../utils/common/sendDemoMail");
const sendContactMail = require("../utils/common/sendContactMail");

const contactForm = (request) => {
  return new Promise(function (resolve, reject) {
    let userName = request.body.userName;
    let email = request.body.email;
    let phoneNumber = request.body.phoneNumber;
    let message = request.body.message;

    const subSqlQuery = `CALL procContactForm(?,?,?,?)`;
    dbConn.getConnection((err, connection) => {
      if (err) {
        console.error("Database not connected !!", err);
        reject(err);
      } else {
        connection.query(
          subSqlQuery,
          [userName, email, phoneNumber, message],
          async (error, result) => {
            closeConnection(connection);
            if (error) {
              console.error("Error executing query:", error);
              reject(error);
            } else {
              resolve(result);

              try {
                await sendContactMail({
                  userName,
                  email,
                  phoneNumber,
                  message,
                });
                console.log("Email sent successfully.");
              } catch (mailError) {
                console.error("Error sending email:", mailError);
              }
            }
          }
        );
      }
    });
  });
};

const Blog = (request) => {
  return new Promise(function (resolve, reject) {
    let name = request.body.name;
    let email = request.body.email;
    let website = request.body.website;
    let comments = request.body.comments;
    const subSqlQuery = `CALL procSaveBlog(?,?,?,?)`;
    dbConn.getConnection((err, connection) => {
      if (err) {
        console.log("Database not connected !!", err);
      } else {
        connection.query(
          subSqlQuery,
          [name, email, website, comments],
          (error, result) => {
            closeConnection(connection);
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
      }
    });
  });
};

const HireForm = (request) => {
  return new Promise(function (resolve, reject) {
    let name = request.body.name;
    let email = request.body.email;
    let phoneNumber = request.body.phoneNumber;
    let comments = request.body.comments;
    let filePath = request.files.uploadFile[0]
      ? request.files.uploadFile[0].filename
      : null;
    const subSqlQuery = `CALL procCareers(?,?,?,?,?)`;
    dbConn.getConnection((err, connection) => {
      if (err) {
        console.log("Database not connected !!", err);
      } else {
        connection.query(
          subSqlQuery,
          [name, email, phoneNumber, comments, filePath],
          (error, result) => {
            closeConnection(connection);
            if (result) {
              emailDetails.sendRegistrationEmail(
                name,
                email,
                phoneNumber,
                filePath
              );
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
      }
    });
  });
};

const demo = async (request) => {
  const { phone, email, companyName, productNames } = request.body;

  const subSqlQuery = `
    INSERT INTO productdemo ( phone, email, companyName, productNames)
    VALUES (?, ?, ?, ?)
  `;

  console.log("Executing query with values:", {
    phone,
    email,
    companyName,
    productNames,
  });

  return new Promise((resolve, reject) => {
    dbConn.getConnection((err, connection) => {
      if (err) {
        console.error("Database connection error:", err);
        reject("Database connection error");
      } else {
        connection.query(
          subSqlQuery,
          [phone, email, companyName, JSON.stringify(productNames)],
          async (error, result) => {
            connection.release();
            if (error) {
              console.error("SQL query error:", error);
              reject(error);
            } else {
              console.log("Query result:", result);

              try {
                await sendDemoEmail({
                  phone,
                  email,
                  companyName,
                  productNames,
                });
                console.log("Email sent successfully.");
              } catch (mailError) {
                console.error("Error sending email:", mailError);
              }

              resolve(result); // Resolve the promise if query is successful
            }
          }
        );
      }
    });
  });
};

module.exports = {
  contactForm,
  Blog,
  HireForm,
  demo,
};

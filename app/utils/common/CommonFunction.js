const sgMail = require("@sendgrid/mail");
const Handlebars = require("handlebars");
const path = require("path");
var azure = require("azure-storage");
const dotEnv = require("dotenv");
dotEnv.config();
const config = require("../common/config.json");
const { closeConnection, dbConn } = require("../database/SqlConnection");
sgMail.setApiKey(config.API_KEY);
const fs = require("fs");
let content1 = path.join(
  process.cwd(),
  "app",
  "utils",
  "RegistrationForm",
  "Speedaway_KYC.pdf"
);
let contet2 = path.join(
  process.cwd(),
  "app",
  "utils",
  "RegistrationForm",
  "Speedaway_Pistoneer_Form.pdf"
);
let attachment1 = fs.readFileSync(content1).toString("base64");
let attachment2 = fs.readFileSync(contet2).toString("base64");

function generateSasUrl(containerName, blobName, type) {
  var blobService = {},
    sasPerm = "";

  blobService = azure.createBlobService(
    config.azure.blobAccount,
    config.azure.blobAzureKey
  );
  if (type === "r") {
    sasPerm = azure.BlobUtilities.SharedAccessPermissions.READ;
  }

  let sharedAccessPolicy = {
    AccessPolicy: {
      Permissions: sasPerm,
      Expiry: azure.date.hoursFromNow(24),
    },
  };

  let token = blobService.generateSharedAccessSignature(
    containerName,
    blobName,
    sharedAccessPolicy
  );
  let sasUrl = blobService.getUrl(containerName, blobName, token, true);
  return {
    requestUri: sasUrl,
    requestType: type,
  };
}

const getMessage = (customer, id, email, statusid) => {
  let template1 = Handlebars.compile(config.email.Processing);
  let template2 = Handlebars.compile(config.email.Complete);
  let template3 = Handlebars.compile(config.email.Shipped);
  let template4 = Handlebars.compile(config.email.Closed);
  let template5 = Handlebars.compile(config.email.placed);
  let data = { customer, id };

  if (statusid == 2) {
    const body = template1(data);
    // `Hi  ${customer} <br>
    // We have received your order no.${id}. You are order is currently being processed. We will get in touch with you if there are any questions and will also keep you posted on updates`;
    return {
      to: `${email}`,
      from: "dinesh@paripoorna.in",
      subject: "Your Order Status Is Updated",
      text: body,
      html: `<p>${body}</p>`,
    };
  } else if (statusid == 5) {
    const body = template2(data);
    // `Hi ${customer}<br>

    // Your order no.${id}. Is ready for dispatch. You will receive an email once the order is dispatched.`;
    return {
      to: `${email}`,
      from: "dinesh@paripoorna.in",
      subject: "Your Order Status Is Updated",
      text: body,
      html: `<p>${body}</p>`,
    };
  } else if (statusid == 3) {
    const body = template3(data);
    // `Hi ${customer}<br>

    // Your order no.${id}  is dispatched. You will be receiving a separate email with invoice and shipping information`;
    return {
      to: `${email}`,
      from: "dinesh@paripoorna.in",
      subject: "Your Order Status Is Updated",
      text: body,
      html: `<p>${body}</p>`,
    };
  } else if (statusid == 8) {
    const body = template4(data);
    // `Hi ${customer}<br>

    // Your order no.${id} has been delivered. Thank you for shopping with us.`;
    return {
      to: `${email}`,
      from: "dinesh@paripoorna.in",
      subject: "Your Order Is Delivered",
      text: body,
      html: `<p>${body}</p>`,
    };
  }

  const body = template5(data);
  // `Hi ${customer}<br>
  // We have received your order no.${id}. You are order is currently being reviewed. We will get in touch with you if there are any questions and will also keep you posted on updates.`;
  return {
    to: `${email}`,
    from: "dinesh@paripoorna.in",
    subject: "Your Order Is Placed",
    text: body,
    html: `<p>${body}</p>`,
  };
};

const registartion = (email) => {
  const body = config.email.Registration;

  return {
    to: `${email}`,
    from: "dinesh@paripoorna.in",
    subject: "You Successfully Registered",
    text: body,
    html: `
                <div>
                <p>${body}</p><br>
                </div>
                `,

    attachments: [
      {
        content: attachment1,
        filename: "Speedaway_KYC.pdf",
        type: "application/pdf",
        disposition: "attachment",
      },
      {
        content: attachment2,
        filename: "Speedaway_Pistoneer_Form.pdf",
        type: "application/pdf",
        disposition: "attachment",
      },
    ],
  };
};

const sendRegistrationEmail = async (email, link) => {
  try {
    await sgMail.send(registartion(email, link));
    console.log("Test email sent successfully");
  } catch (error) {
    console.error("Error sending test email");
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};

const sendEmail = async (customer, orderid, email) => {
  try {
    await sgMail.send(getMessage(customer, orderid, email));
    console.log("Test email sent successfully");
  } catch (error) {
    console.error("Error sending test email");
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};

const sendEmailFororder = async (customer, orderid, email, statusid) => {
  console.log(orderid, "dsgkgfsgkf");

  try {
    await sgMail.send(getMessage(customer, orderid, email, statusid));
    console.log("Test email sent successfully");
  } catch (error) {
    console.error("Error sending test email");
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};

const emailSent = async (customer, orderid, email) => {
  console.log("Sending test email");
  await sendEmail(customer, orderid, email);
};

const jsonFormatData = (data) => {
  if (data.length != 0) {
    if (typeof data[0] !== "undefined") {
      const row = data[0];
      return row;
    } else if (typeof data === "object") {
      return data;
    } else {
      return [];
    }
  } else {
    return [];
  }
};

const updateInvoiceProductDetails = (id, productDetails) => {
  console.log(id, productDetails);
  return new Promise((resolve, reject) => {
    let sqlQuery = "CALL  procUpdateProductDetailsInInvoice(?,?)";
    dbConn.getConnection((err, connection) => {
      if (err) {
        console.log(err);
      } else {
        connection.query(
          sqlQuery,
          [id, JSON.stringify(productDetails)],
          (err, result) => {
            console.log(result);
            closeConnection(connection);
            console.log(result);
            if (err) {
              console.log(err);
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      }
    });
  });
};

module.exports = {
  jsonFormatData,
  generateSasUrl,
  sendEmail,
  emailSent,
  sendEmailFororder,
  sendRegistrationEmail,
  updateInvoiceProductDetails,
};

const nodemailer = require("nodemailer");
const config = require("../common/config.json");

const transporter = nodemailer.createTransport({
  pool: true,
  host: config.Email.host,
  port: config.Email.port,
  secure: true,
  auth: {
    user: config.Email.username,
    pass: config.Email.password,
  },
});

const registartion = (name, email, phoneNumber, filePath) => {
  console.log(process.cwd() + "/app/utils/images/" + filePath);
  let body = `CV of ${name}.`;
  let path = process.cwd() + "/app/utils/images/" + filePath;
  return {
    from: config.Email.sender,
    to: config.Email.receiver,
    subject: "Uploaded CV",
    text: body,
    html: `<p>${body}</p>`,
    attachments: [{ filename: filePath, path: path }],
  };
};
const sendRegistrationEmail = async (name, email, phoneNumber, filePath) => {
  try {
    await transporter.sendMail(
      registartion(name, email, phoneNumber, filePath)
    );
  } catch (error) {
    if (error.response) {
      console.error(error.response.body);
    }
  }
};

module.exports = { sendRegistrationEmail };

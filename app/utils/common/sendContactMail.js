const nodemailer = require("nodemailer");

const sendContactMail = async ({ userName, email, phoneNumber, message }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: "talentakeaways.infotech@gmail.com",
      pass: "gwlmigbkjjereebw",
    },
  });

  const recipientMailOptions = {
    from: "talentakeaways.infotech@gmail.com",
    to: email,
    subject: `Contact Request Received - ${userName}`,
    text: `Dear ${userName},

Thank you for reaching out to us! We have successfully received your inquiry. Below are the details you submitted:

Full Name: ${userName}
Phone Number: ${phoneNumber}
Email Address: ${email}
Message: ${message}
Our team will review your inquiry and get back to you as soon as possible. If you have any further questions, feel free to contact us at hr@talenttakeaways.com or call us at +91 44 4798 7556.

Best regards,
Talent Takeaways Team`,
  };

  const adminMailOptions = {
    from: "talentakeaways.infotech@gmail.com",
    to: "talentakeaways.infotech@gmail.com",
    cc: "riswan.s@talentakeaways.com, elango.b@talentakeaways.com , hr@talentakaways.com",
    subject: `New Contact Form Submission from ${userName}`,
    text: `Dear Admin,

A new user has submitted their details via the "Contact Us" form on the website. Below are the details:

Full Name: ${userName}
Phone Number: ${phoneNumber}
Email Address: ${email}
Message: ${message}
Please review the submission and take the necessary action.

Best regards,
Website Team`,
  };

  try {
    await transporter.sendMail(recipientMailOptions);
    console.log("Email sent to the recipient successfully.");
    await transporter.sendMail(adminMailOptions);
    console.log("Email sent to admin successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email.");
  }
};

const closeConnection = (connection) => {
  if (connection) connection.release();
};

module.exports = sendContactMail;

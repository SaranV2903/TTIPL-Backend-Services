const nodemailer = require("nodemailer");

const sendDemoEmail = async ({ phone, email, companyName, productNames }) => {
  const productList = productNames
    .map((product, index) => `${index + 1}. ${product}`)
    .join("\n");

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
    subject: `Product Demo Request Received - ${companyName}`,
    text: `Dear ${companyName},

Thank you for your interest in our products! We have received your request for a demo and will get back to you shortly.

Here are the details you submitted:

Organization Name: ${companyName}
Email: ${email}
Phone Number: ${phone}
Selected Products: ${productList}
Our team will contact you soon to schedule the demo. If you have any further questions, feel free to reach out to us at hr@talenttakeaways.com or call us at +91 44 4798 7556.

Best regards,
Talent Takeaways Team`,
  };

  const adminMailOptions = {
    from: "talentakeaways.infotech@gmail.com",
    to: "talentakeaways.infotech@gmail.com",
    cc: "riswan.s@talentakeaways.com, elango.b@talentakeaways.com , hr@talentakaways.com",
    subject: " New Demo Request Submitted",
    text: `Dear Admin,

A user has submitted a request for a product demo. Below are the details:

Organization Name: ${companyName}
Email: ${email}
Phone Number: ${phone}
Selected Products: ${productList}
Please review the details and reach out to the user promptly to schedule the demo.

Best regards,
Website Team`,
  };
  try {
    await transporter.sendMail(recipientMailOptions);
    console.log("Email sent to the recipient successfully.");
    await transporter.sendMail(adminMailOptions);
    console.log("Email sent to Aakash successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email.");
  }
};

module.exports = sendDemoEmail;

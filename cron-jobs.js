const cron = require("node-cron");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

// Create mail transporter.
const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.PORT,
  auth: {
    user: process.env.USERNAME,
    pass: process.env.PASSWORD,
  },
});

// runs at midnight everyday
cron.schedule("0 0 * * *", () => {
  console.log("---------------------");
  console.log("Running Cron Job");

  const messageOptions = {
    from: "amna.mustafa@invozone.com",
    to: "nicola.rowe97@ethereal.email",
    subject: "Scheduled Email",
    text: "Hi. This email was automatically sent through cron jobs. I have saved ethereal info in .env file",
  };

  transporter.sendMail(messageOptions, (error) => {
    if (error) {
      console.log("error is:", error);
      throw error;
    } else {
      console.log("Email successfully sent!");
    }
  });
});
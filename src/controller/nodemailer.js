import config from "../config/index.config.js";
import nodemailer from "nodemailer";

const sender = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user:config.GMAIL,
    pass: config.PASS
  }
});

const compose_mail ={
  from : config.GMAIL,
  to: 'yuvaraj8752@gmail.com',
  subject: " demo mail receive",
  text: "work fine mail"
}

sender.sendMail(compose_mail, (error, info) => {
  if (error) {
    console.log(error)
  } else {
    console.log("mail send successfully ", info)
  }
})

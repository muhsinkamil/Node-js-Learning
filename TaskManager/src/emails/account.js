require("dotenv").config()

const sgMail = require("@sendgrid/mail")
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeMail = (email, name) => {
  sgMail.send({
    to: email,
    from: "muhsinwahab97@gmail.com",
    subject: "Sending with SendGrid is Fun",
    text: `Welcome to Task App, ${name}!`,
  })
}

const sendByeMail = (email, name) => {
  sgMail.send({
    to: email,
    from: "muhsinwahab97@gmail.com",
    subject: "Sorry to see you go...",
    text: "Hey what can we improve to have you? Thank you",
  })
}

module.exports = {
  sendWelcomeMail,
  sendByeMail,
}

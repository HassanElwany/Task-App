const nodemailer = require('nodemailer')

const welcomeMail = async function (email, name) {

    let testAccount = await nodemailer.createTestAccount()

    let transporter = nodemailer.createTransport({
        host: "smtp.hostinger.com",
        port: 465,
        secure: true,
        auth: {
            user: "test@elwany.me",
            pass: process.env.emailPassword
        }
    })

    let info = await transporter.sendMail({
        from: '"Task App Service" <test@elwany.me>',
        to: `${email}`,
        subject: "Hello From task app",
        text: `this is the first email, Hello and welcome at the app ${name}. `
    })

    console.log("Message sent: %s", info.messageId)

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))

}

const cancelMail = async function (email, name) {

    let testAccount = await nodemailer.createTestAccount()

    let transporter = nodemailer.createTransport({
        host: "smtp.hostinger.com",
        port: 465,
        secure: true,
        auth: {
            user: "test@elwany.me",
            pass: process.env.emailPassword
        }
    })

    let info = await transporter.sendMail({
        from: '"Task App Service" <test@elwany.me>',
        to: `${email}`,
        subject: "Hello From task app",
        text: `We are so soory for losing you ${name} we hope to get you back soon. `
    })

    console.log("Message sent: %s", info.messageId)

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))

}

module.exports = {

    welcomeMail,
    cancelMail
}
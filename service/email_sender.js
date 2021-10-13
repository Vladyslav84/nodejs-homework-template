const nodemailer = require('nodemailer');
require('dotenv').config();


class CreateSender {
    async send(msg) {
        const config = {
            host: "smtp.meta.ua",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_META,
                pass: process.env.PASSWORD_META,
            },
        };
        const transporter = nodemailer.createTransport(config);
        return await transporter.sendMail({...msg,from:process.env.EMAIL_META})
    };

};

module.exports = CreateSender;
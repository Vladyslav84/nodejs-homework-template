const Mailgen = require('mailgen');
require('dotenv').config();

class EmailServie {
    constructor(env, sender) {
        this.sender = sender;
        switch (env) {
            case "development":
                this.link = process.env.NGROK //  тунель для localhost.Nodemailer не пропускає на localhost
                break;
            case "production":
                this.link = "link fo prodaction" // Використовуємо різні середовища.
                break;
        
            default:
                this.link = process.env.NGROK
                break;
        };
    };
    #createTemplateVerificationEmail(verifyToken, name) {
    const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        // Appears in header & footer of e-mails
        name: "Brothers Viper",
        link: this.link
    }
    });
    const email = {
    body: {
        name,
        intro: 'Welcome to Brothers Viper Corporation',
        action: {
            instructions: 'To get started please click here:',
            button: {
                color: '#22BC66', 
                text: 'Confirm your account',
                link: `${this.link}/api/users/verify/${verifyToken}`
            }
        },
    }
        };
        return mailGenerator.generate(email);
    };
    
    async sendVerifyEmail(verifyToken, email, name) {
        const emailHtml = this.#createTemplateVerificationEmail(verifyToken, name);
        const msg = {
            to: email,
            subject: "Verify your account",
            html: emailHtml
        }
        const result = await this.sender.send(msg);

       
    }
};

module.exports = EmailServie;

const express = require('express')
const app = express()
const port = 3000
const nodemailer = require('nodemailer');

function sendMessage(name, content) {

    // Create a SMTP transporter object
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'yesenia91@ethereal.email',
            pass: 'dZ9RyvF1jwzN8GfhMb'
        }
    });

    // Message object
    let message = {
        from: `${name} <visitor@developersunesis.com>`,
        to: 'Recipient <developersunesis@gmail.com>',
        subject: 'Say Hello!',
        text: `${content}`,
        html: `${content}`
    };

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }

        console.log('Message sent: %s', info.messageId);
    });
}

app.get('/:name/:message', (req, res) => {
    const name = req.params.name
    const message = req.params.message

    const status = (name !== undefined && message !== undefined)

    if(status)
        sendMessage(name, message)

    res.send({
        messageSent: status
    })
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
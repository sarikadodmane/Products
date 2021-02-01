var nodemailer = require('nodemailer');

exports.sendMail = (text, subject) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,//true
        port: 25,//465
        auth: {
            user: 'sarikadodmane11@gmail.com',
            pass: 'password'
        }, tls: {
            rejectUnauthorized: false
        }
    });

    var mailOptions = {
        from: 'sarikadodmane11@gmail.com',
        to: 'sarikadodmane11@gmail.com',
        subject: subject,
        text: JSON.stringify(text)
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}
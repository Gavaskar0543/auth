const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.newLogin = (person) => {
    let htmlString = nodeMailer.renderTemplate({},'/logins/logins.ejs');
    nodeMailer.transporter.sendMail({
       from: 'gavaskark@outlook.com',
       to:person.email,
       subject: "new login", 
       html : htmlString
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}

exports.resetPassword = (person) => {
    console.log(person);
    console.log(person._id);
    let htmlString = nodeMailer.renderTemplate({person:person},'/reset/reset.ejs');
    nodeMailer.transporter.sendMail({
       from: 'gavaskark@outlook.com',
       to:person.email,
       subject: "Requested to reset password", 
       html : htmlString
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}
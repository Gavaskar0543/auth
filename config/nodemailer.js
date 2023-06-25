const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587, 
    secure: false, // Set to true if using SSL/TLS
    auth: {
        user: 'gavaskark@outlook.com', // Replace with your Outlook email address
        pass: 'Gava050220#' // Replace with your Outlook email account password
    }
  });

  let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/postBox', relativePath),
        data,
        function (err, template) {
            if (err) {
                console.log('error in rendering template',err);
                return;
            }

            mailHTML = template;
        }
    );

    return mailHTML;
};

module.exports = {
    transporter :transporter,
    renderTemplate : renderTemplate
}
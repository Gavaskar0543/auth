const path = require('path');
const rfs = require('rotating-file-stream');
const fs = require('fs');
//setup logDirectory
const logDirectory = path.join(__dirname,'../production_logs/');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accesslogStream = rfs.createStream('file.log',{
    interval:'1d',
    path:logDirectory
})
const development = {
    name: 'development',
    assets_path: '/assets',
    secretKey: "hackerbyMrinnocentbaby",
    db: 'auth',
    smtp: {
        host: 'smtp.office365.com',
        port: 587, 
        secure: false, // Set to true if using SSL/TLS
        auth: {
            user: 'gavaskark@outlook.com', // Replace with your Outlook email address
            pass: 'Gava050220#' // Replace with your Outlook email account password
        }
    
    },
    clientID: '33502072642-kjgocms4qbvu85u9107o1k2dp3qd7lmu.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:8000/user/auth/google/callback',
    morgan:{
        mode:'dev',
        options:{
            stream:accesslogStream,
        }
    }

}

const production = {
    name: 'production',
    assets_path:process.env.ASSET_PATH,
    secretKey: process.env.SECRETKEY,
    db: process.env.DATABASE,
    smtp: {
        host: 'smtp.office365.com',
        port: 587,
        secure: false, // Set to true if using SSL/TLS
        auth: {
            user: process.env.EMAIL, // Replace with your Outlook email address
            pass: process.env.EMAILPASS // Replace with your Outlook email account password
        }
    },
    google_client_id:process.env.GOOGLE_CLIENT,
    google_secret:process.env.GOOGLE_SECRET ,
    google_callback:process.env.GOOGLE_CALLBACK,
    morgan:{
        mode:'combined',
        options:{
            stream:accesslogStream,
        }
    }
    
};
module.exports = eval(process.env.Auth_ENVIRONMENT) == undefined ? development : eval(process.env.Auth_ENVIRONMENT);
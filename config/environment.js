const path = require('path');
const rfs = require('rotating-file-stream');
const fs = require('fs');

// Setup logDirectory
const logDirectory = path.join(__dirname, '../production_logs/');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// Create a rotating file stream for logging
const accesslogStream = rfs.createStream('file.log', {
  interval: '1d',
  path: logDirectory
});

// Check for errors during stream creation
accesslogStream.on('error', function(err) {
  console.error('Error creating rotating file stream:', err);
});

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
    callbackURL: 'http://gavaskar.authsec.ninja/user/auth/google/callback',
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
    clientID:process.env.GOOGLE_CLIENT,
    clientSecret:process.env.GOOGLE_SECRET ,
    callbackURL:process.env.GOOGLE_CALLBACK,
    morgan:{
        mode:'combined',
        options:{
            stream:accesslogStream,
        }
    }
    
};
/*
export Auth_ENVIRONMENT="production"
export ASSET_PATH="./public/assets"
export SECRETKEY="hackmygirlsheartyoubro"
export DATABASE="auth_production"
export EMAIL="gavaskark@outlook.com"
export EMAILPASS="Gava050220#"
export GOOGLE_CLIENT="33502072642-kjgocms4qbvu85u9107o1k2dp3qd7lmu.apps.googleusercontent.com"
export GOOGLE_SECRET="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"
export GOOGLE_CALLBACK="http://gavaskar.authsec.ninja/user/auth/google/callback"*/
module.exports = eval(process.env.Auth_ENVIRONMENT) == undefined ? development : eval(process.env.Auth_ENVIRONMENT);
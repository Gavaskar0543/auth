const queue = require('../config/kue');
const loginMailer = require('../mailer/loginMails');


queue.process('logs',function(job,done){
    console.log("job is done",job.data);
    loginMailer.newLogin(job.data);
})
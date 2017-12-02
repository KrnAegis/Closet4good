
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var authUser = {
  user: 'closets4good@gmail.com',
  pass: 'bootcamp2017'
};

var transporter = nodemailer.createTransport(
  smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: authUser, 
    tls: { rejectUnauthorized: false }
  })
);

var sendmail = function(recipient, subject, message){
  transporter.sendMail(
    {
      from: authUser.user,
      to: recipient,
      subject: subject,
      html: message
    }, 
    function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    }
  );  
}

module.exports = sendmail;
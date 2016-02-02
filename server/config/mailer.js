var nodemailer = require('nodemailer');
if(!process.env.DEPLOYED) {
	var config = require('./../env/config.js');
}

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    //TODO put process.env variables
    user: 'greenius.thesis@gmail.com',
    password: process.env.NODEMAILER_PASSWORD || config.NODEMAILER_PASSWORD
  }
});

exports.sendMail = function(receiverEmail, eventURL){
  var mailOptions = {
    from: 'greenius.thesis@gmail.com',
    to: receiverEmail,
    subject: 'I need water!!',
    text: 'One of the plants in your gardens needs to be watered! View it here :' + eventURL,
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      return console.log(error);
    }
    console.log('Message sent:' + info.response + '\n');
  });
};

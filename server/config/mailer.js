var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    //TODO put process.env variables
    user: 'greenius.thesis@gmail.com',
    password: 'Ill put the real thing in later ha-ha'
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

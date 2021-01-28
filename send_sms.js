// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = 'AC6f94f2c79fec585315f8039d832c5376';
const authToken = '253707d97b947685b8e045d0f16fb5ca';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+13512009099',
     to: '+5502119996071004'
   })
  .then(message => console.log(message.sid));

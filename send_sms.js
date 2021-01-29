// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// and set the environment variables. See http://twil.io/secure
// import {ACCOUNT_SID, AUTH_TOKEN} from './auth.js'

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'SEU PIN: ',
     from: '+13512009099',
     to: '+5502119996071004'
   })
  .then(message => console.log(message.sid));

  console.log('calling form parent processs');


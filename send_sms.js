// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// and set the environment variables. See http://twil.io/secure
// import {ACCOUNT_SID, AUTH_TOKEN} from './auth.js'

// const accountSid = process.env.ACCOUNT_SID;
// const authToken = process.env.AUTH_TOKEN;
var celular = process.argv[2]


// const client = require('twilio')(accountSid, authToken);

// client.messages
//   .create({
//      body: 'SEU PIN: ' + pin,
//      from: '+13512009099',
//      to: '+55021'+celular
//    })
//   .then(message => console.log(message.sid));

  console.log('Celular: ' + celular + ' e PIN: ');


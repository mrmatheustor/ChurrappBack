const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
var celular = process.argv[2]
var pin = process.argv[3]

const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'SEU PIN: ' + pin,
     from: '+13512009099',
     to: '+55021'+celular
   })
  .then(message => console.log(message.sid));

  console.log('Celular: ' + celular + ' e PIN: ' + pin);


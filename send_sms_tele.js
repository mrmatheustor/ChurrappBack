var TeleSignSDK = require('telesignsdk');

const customerId = process.env.COSTUMER_ID;
const apiKey = process.env.API_TELE_SIGN;
const rest_endpoint = process.env.REST_ENDPOINT_TELE;
const timeout = 10*1000; // 10 secs
var celular = process.argv[2]
var pin = process.argv[3]

const client = new TeleSignSDK( customerId,
    apiKey,
    rest_endpoint,
    timeout // optional
    // userAgent
);

const phoneNumber = "055" + celular;
const message = "Seu PIN é " + pin;
const messageType = "ARN";

console.log("## MessagingClient.message ##");

function messageCallback(error, responseBody) {
    if (error === null) {
        console.log(`Messaging response for messaging phone number: ${phoneNumber}` +
            ` => code: ${responseBody['status']['code']}` +
            `, description: ${responseBody['status']['description']}`);
    } else {
        console.error("Unable to send message. " + error);
    }
}
client.sms.message(messageCallback, phoneNumber, message, messageType);

const { Vonage } = require('@vonage/server-sdk');
const vonage = new Vonage({
  apiKey: "e026c646",
  apiSecret: "9w8RqDIUX3Qat6bb"
});

module.exports = vonage;
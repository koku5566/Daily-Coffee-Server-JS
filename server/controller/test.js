const http = require('https');

const options = {
  method: 'GET',
  hostname: 'api.xilnex.com',
  port: null,
  path: '/logic/v2/clients/id',
  headers: {
    Accept: 'application/json, text/json, text/html, application/xml, text/xml'
  }
};

const req = http.request(options, function (res) {
  const chunks = [];

  res.on('data', function (chunk) {
    chunks.push(chunk);
  });

  res.on('end', function () {
    const body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();
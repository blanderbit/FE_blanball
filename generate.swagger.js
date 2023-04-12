/* tslint:disable */
// /* eslint-disable */
const https = require('https');
const fs = require('fs');
require('dotenv').config();
//

if (!process.env.API_SWAGGER_URL) {
  throw new Error(
    `Please create .env (npm run create:env) and change variable correctly, focus on API_SWAGGER_URL`
  );
}
console.log('Start loading swagger.json...');
https
  .get(`${process.env.API_SWAGGER_URL}`, (res) => {
    const data = [];
    //
    res.on('data', (chunk) => data.push(chunk));
    res.on('end', () => {
      const swagger = JSON.parse(Buffer.concat(data).toString());

      fs.writeFileSync('swagger.json', JSON.stringify(swagger));
      console.log('Finish loading swagger.json!');
    });
  })
  .on('error', (err) => console.log('[Error]: ', err.message));

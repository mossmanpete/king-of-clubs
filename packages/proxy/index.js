const proxy = require('express-http-proxy');
const app = require('express')();

app.use('/', proxy('localhost:1234'));

app.listen(2000);
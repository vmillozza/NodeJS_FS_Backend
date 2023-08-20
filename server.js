const http = require('http');
const app = require('./app/app');
require('dotenv').config();
const server = http.createServer(app
).listen(process.env.PORT,()=>{
    console.log(`Server in esecuzione su :${process.env.PORT}`);
});

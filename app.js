var express = require('express');
require('./database/db');
var app = express();
var port = 3000;
var router = require('./routes/index');
//using routers
app.use(router);
// launching the server at port 3000
app.listen(port,()=>{
    console.log('Server is running on port: '+port);
})
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var restApiRouter = require('./rest-api-routes');
router.use(restApiRouter);
router.use(bodyParser.urlencoded({extended: false}));
router.get('/',(req,res)=>{
    var url = "home.html";
    res.sendFile(path.resolve(`pages/${url}`),(err)=>{
        if (err) throw err;
    })
})
router.all('/*',(req,res)=>{
    res.sendFile(path.resolve('pages/404.html'));
})
module.exports = router;

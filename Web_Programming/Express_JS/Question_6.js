var exp = require('express');
var fs = require('fs');
var app = exp();
app.use(function(req,res,next)
{
    var date = new Date();
    var str = "Request Received At "+date+" for"+req.url+"  /n";
    fs.appendFile('log.txt',str,function(err)
    {
    if(!err)
        console.log("log generated");
    else
        console.log("Error")
    });
    next();
});
app.listen(9000,function(){
    console.log(`server started at http://localhost:9000`);
});
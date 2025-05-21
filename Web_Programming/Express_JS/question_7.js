var exp = require('express');
var app = exp();
app.use(exp.static('style'));
app.use(exp.static('images'));
app.get('/login',function(req,res)
{
    res.sendFile(__dirname+"/quest_1.html");
});
app.listen(9000,function(){
    console.log(`server started at http://localhost:9000`);
});
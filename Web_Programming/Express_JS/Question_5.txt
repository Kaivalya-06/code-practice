var exp = require('express');
var app = exp();
app.use(exp.static('../images'));

app.get('/login',function(req,res){
    res.sendFile(__dirname+"/quest_1.html");
});
app.get("/logincheck",function(req,res)
{
    const uid = req.query.uid;
    const pwd = req.query.pwd;
    if(uid=="Kaivalya"&&pwd=="ABCdefg")
        res.send("<h1>Successful Login</h1>");
    else
        res.send("<h1>Invalid Parameters</h1>");
});
app.listen(9000,function(){
    console.log(`server started at http://localhost:9000`);
});
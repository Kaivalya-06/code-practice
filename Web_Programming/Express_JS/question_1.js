var exp = require('express');
var app = exp();

app.get("/",function(req,res){
    res.send("<h1>Welcome To Express</h1>");
});

app.get("/home",function(req,res){
    res.send("<h1>Welcome To home</h1>");
});
app.use(function(req,res){
    res.status(404).send("<h1>Invalid</h1>");
});
app.listen(9000,function(){
    console.log(`server started at http://localhost:9000`);
});
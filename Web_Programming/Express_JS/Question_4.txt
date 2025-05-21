var mysql = require('mysql2');
var exp = require('express');
var app = exp();
var con = mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"root@123",
        database:`assignments1`
    });
con.connect(function(err)
{
    if(!err)
    {
        console.log("Connection Successful");
    }
    else
    {
        console.log("Connection Failed");
    }
})
app.get('/emp',function(req,res){
    con.query("select * from emp",function(err,result)
{
    if(!err)
    {
        var str = "<table border=1>";
        result.forEach(function(v){
            str+="<tr>"
            str+="<td>"+v.EMPNO+"</td>";
            str+="<td>"+v.ENAME+"</td>";
            str+="<td>"+v.JOB+"</td>";
            str+="<td>"+v.SAL+"</td>";
            str+="</tr>"
        });
        str+="</table>";
        res.send(str);
    }
});
});
app.listen(9000,function(){
    console.log(`server started at http://localhost:9000`);
});
var exp = require('express')
var mysql = require('mysql2')

var app = exp();
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root@123",
    database: "assignments1"
})

con.connect(function(err) {
   if(!err)
    console.log("connected");
   else
    console.log("failed to connect : "+err.toString());
})

app.get('/loginform', function(req,res) {
    res.sendFile(__dirname+"/loginform.html");
});

app.get('/details', function(req, res) {
    const eno = req.query.empno;
    console.log("req received : " + eno);
    const query = "select * from emp where empno = ?";
    con.query(query, [eno], function(err, result) {
        if (!err) {
            if (result.length == 1) {
                const emp = result[0];
                let html = `
                    <h1>EMPLOYEE DETAILS</h1>
                    <table border="1" cellpadding="5" cellspacing="0">
                        <tr>
                            <th>EMPNO</th>
                            <th>ENAME</th>
                            <th>JOB</th>
                            <th>MGR</th>
                            <th>SAL</th>
                            <th>COMM</th>
                            <th>DEPTNO</th>
                        </tr>
                        <tr>
                            <td>${emp.EMPNO}</td>
                            <td>${emp.ENAME}</td>
                            <td>${emp.JOB}</td>
                            <td>${emp.MGR}</td>
                            <td>${emp.SAL}</td>
                            <td>${emp.COMM}</td>
                            <td>${emp.DEPTNO}</td>
                        </tr>
                    </table>
                `;
                res.send(html);
            } else {
                res.send("<h3>" + eno + " Empno not found </h3>");
            }
        } else {
            res.send("<h3>Error: " + err.toString() + "</h3>");
        }
    });
});


app.all('/*splat' ,function(req,res) {
   res.send("<h4> Invalid URL </h4>");
})

app.listen(9192, function() {
   console.log(`http://localhost:9192`);
})
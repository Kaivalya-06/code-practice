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
});
app.get('/empform', function(req, res) {
    const formHTML = `
        <h2>Add New Employee</h2>
        <form action="/addemp" method="post">
            <label>EMPNO:</label><input type="number" name="empno" required><br><br>
            <label>ENAME:</label><input type="text" name="ename" required><br><br>
            <label>JOB:</label><input type="text" name="job" required><br><br>
            <label>SAL:</label><input type="number" name="sal" required><br><br>
            <button type="submit">Add Employee</button>
        </form>
    `;
    res.send(formHTML);
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/addemp', function(req, res) {
    const { empno, ename, job, sal } = req.body;
    const sql = "INSERT INTO emp (EMPNO, ENAME, JOB, SAL) VALUES (?, ?, ?, ?)";
    con.query(sql, [empno, ename, job, sal], function(err, result) {
        if (!err) {
            res.send(`<h3>Employee Added Successfully</h3><a href="/emp">Go Back to Employee List</a>`);
        } else {
            res.send(`<h3>Error adding employee: ${err.sqlMessage}</h3><a href="/empform">Try Again</a>`);
        }
    });
});

app.get('/emp', function(req, res) {
    con.query("SELECT * FROM emp", function(err, result) {
        if (!err) {
            var str = "<table border=1>";
            result.forEach(function(v) {
                str += "<tr>";
                str += "<td>" + v.EMPNO + "</td>";
                str += "<td>" + v.ENAME + "</td>";
                str += "<td>" + v.JOB + "</td>";
                str += "<td>" + v.SAL + "</td>";
                str += "</tr>";
            });
            str += "</table>";
            str += `<br><a href='/empform'>Add New Employee</a><br>`;
            str += `
            <a href='/removeform'>Remove Employee</a>`;
            res.send(str);
            }
            else 
            {
                res.send("<h3>Error retrieving employee data</h3>");
            }
        });
    app.get('/removeform', function(req, res) {
    const formHTML = `
        <h2>Remove Employee</h2>
        <form action="/removeemp" method="post">
            <label>Enter EMPNO or ENAME to remove:</label><br><br>
            <input type="text" name="identifier" required>
            <br><br>
            <button type="submit">Remove</button>
        </form>
        <br>
        <a href="/emp">Back to Employee List</a>`;
    res.send(formHTML);
});
});
app.listen(9000,function(){
    console.log(`server started at http://localhost:9000`);
});
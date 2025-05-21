const exp = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = exp();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(exp.static('public'));
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root@123",
    database: "user_auth"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySQL!");
});
app.get('/login', function(req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.post('/logincheck', function(req, res) {
    const uid = req.body.uid;
    const pwd = req.body.pwd;

    const sql = "SELECT * FROM users WHERE userid = ? AND password = ?";
    con.query(sql, [uid, pwd], function(err, result) {
        if (err) throw err;
        if (result.length > 0) {
            res.send(`<h1>Welcome ${uid}</h1>`);
        } else {
            res.redirect('/login');
        }
    });
});

app.listen(9000, function() {
    console.log("Server started at http://localhost:9000");
});

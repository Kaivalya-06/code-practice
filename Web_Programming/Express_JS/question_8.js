var exp = require('express');
var bodyParser = require('body-parser');
var app = exp();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(exp.static('../images'));
app.get('/login', function(req, res) {
    res.sendFile(__dirname + "/quest_1.html");
});
app.post('/logincheck', function(req, res) {
    const uid = req.body.uid;
    const pwd = req.body.pwd;

    if (uid === "Kaivalya" && pwd === "1234") {
        res.send("<h1>Successful Login</h1>");
    } else {
        res.redirect('/login');
    }
});

app.listen(9000, function() {
    console.log("server started at http://localhost:9000");
});

const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const secretKey = "secret";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {

    if (!req.cookies.token) {
        return res.redirect("/login");
    }
    res.setHeader("Content-type", "text/HTML");
    res.write("<a href='/protected'><button>Protected</button></a>")
    res.end();
});
app.get('/login', (req, res) => {

    const token = req.cookies.token;
    if (token) {
        return res.redirect('/');
    }

    res.setHeader('Content-Type', 'text/HTML');
    res.write(`<h1>Login</h1>
    <form method="post" action="/login">
    <input type="text" name="username" placeholder="Username"/> </br> <input type="password" name="password" placeholder="Password"/> </br>
    <button type="submit">Login</button>
    </form>`);
    res.end();
});
app.post('/login', (req, res) => {
    const user = { username: req.body.username, password: req.body.password };

    jwt.sign({ user }, secretKey, { expiresIn: '1h' }, (err, token) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.cookie('token', token, { maxAge: 3600000, httpOnly: true })
            return res.redirect("/");
        }
    });
});

app.get('/protected', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/login');
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.sendStatus(401);
        }

        const username = decoded.user.username;
        res.send(`Welcome, ${username}! This is a protected route.`);
    });
});


app.listen(3000, () => {
    console.log('server running on 3000');
});

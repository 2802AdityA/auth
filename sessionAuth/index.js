const express = require('express');
const sessions = require('express-session');

const app = express();
const HomeHandler = require('./handlers/home');
const LoginHandler = require('./handlers/login');
const ProcessLoginHandler = require('./handlers/process-login');
const LogoutHandler = require('./handlers/logout');
app.use(sessions({
    secret: 'some secret',
    cookie: { maxAge: 2 * 60 * 1000 }, resave: true, saveUninitialized: false,
})
)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', HomeHandler);
app.get('/login', LoginHandler);
app.post('/process-login', ProcessLoginHandler);
app.get('/logout', LogoutHandler);

app.listen(3000, () => {
    console.log(`Server running on port 3000`);
});
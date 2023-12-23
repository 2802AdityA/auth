module.exports = function processLogin(req, res) {
    if (req.body.username !== 'admin' || req.body.password !== 'admin') {
        res.send(`<h1>Invalid</h1><br/><a href="/">Home</a>`);
    }
    req.session.userid = req.body.username;
    res.redirect('/');
}   
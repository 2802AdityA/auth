const express = require("express");

const basicAuthMiddleware = require('./basicAuth');

const app = express();
const port = 3000;

app.use(basicAuthMiddleware);

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.use(express.static('public'));

app.listen(port, () => {
	console.log(`App running on port ${port}`);
});

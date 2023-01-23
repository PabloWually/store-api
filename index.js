const express = require('express');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler.js');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
	res.send('hello this is my server');
});

app.get('/new-route', (req, res) => {
	res.send('Hello this is a new route');
});

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port,()=> {
	console.log('my port' + port);
});

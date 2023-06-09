const express = require('express');
const routerApi = require('./routes');
const cors = require('cors')
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler.js');
const { checkApiKey } = require('./middlewares/auth.handler');
const { config } = require('./config/config');

const app = express();
const port = config.port || 3000;

app.use(express.json());

const whitelist = [
	'http://localhost:8080',
	'http://myapp.com',
];
const options = {
	origin: (origin, callback) => {
		if(whitelist.includes(origin) || !origin){
			callback(null, true);
			} else {
			callback(new Error('No allowed'))
		}
	}
}
app.use(cors(options));
require('./utils/auth');

app.get('/', (req, res) => {
	res.send('hello this is my server');
});
 
app.get('/new-route', checkApiKey, (req, res) => {
	res.send('Hello this is a new route');
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port,()=> {
	console.log('my port' + port);
});

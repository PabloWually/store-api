const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
	res.send('hello this is my server')	
})

app.listen(port,()=> {
	console.log('my port' + port);
})
console.log("Hello world!")

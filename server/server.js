require('dotenv').config(); // Load in environment variables from .env
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

require('./passport');
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
// setup static file routes
app.use(express.static(path.join(__dirname, '../build')));

app.use('/api', require('./route/mainRoute'));
// Route everything that isn't defined to index.html
app.get('*', (request, response) =>{
    response.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(process.env.SERVER_PORT, () => console.log(`Server listening on port ${process.env.SERVER_PORT}!`));
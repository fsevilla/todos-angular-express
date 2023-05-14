const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const apiRoutes = require('./src/routes/api');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());

app.get('', (req, res) => {
    res.send('api works!');
});

app.use('/assets', express.static(path.join(__dirname, 'uploads')));

app.use(apiRoutes);

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Se ha conectado con MongoDB');

    app.listen(port, () => {
        console.log('app is running in port ' + port);
    });

}).catch(err => {
    console.log('Error al conectar con MongoDB', err);
});


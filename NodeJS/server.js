// server.js
const express = require('express');
const server = express();

server.get('/', (req, res) => {
    res.send('Hello, World!');
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

// DataBase
const mongoose = require('mongoose');

const dbConnection = mongoose.connect('mongodb://localhost:27017/TODO-list-mongodb-container').then(() => {
    console.log('Connexion à MongoDB établie avec succès!');
}).catch((error) => {
    console.error('Erreur de connexion à MongoDB :', error);
});



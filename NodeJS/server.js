const express = require('express');
const port = 3000;

const server = express();


// Middleware données Request
server.use(express.json());
server.use(express.urlencoded({extended: false}));

server.use("/task", require('./routes/task.routes'));

// Démarrage du serveur
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
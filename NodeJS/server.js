const express = require('express');
const connectDB = require("./config/db");
const dotenv = require('dotenv').config();
const port = 3000;

// Connexion DB
connectDB().then(r => console.log("Connecté à MongoDB"));

const server = express();

// Middleware lecture données Request
server.use(express.json());
server.use(express.urlencoded({extended: false}));

server.use("/task", require('./routes/task.routes'));
server.use("/category", require('./routes/category.routes'));

// Démarrage du serveur
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
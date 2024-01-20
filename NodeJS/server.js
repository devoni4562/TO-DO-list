const express = require('express');
const connectDB = require("./config/db");
const dotenv = require('dotenv').config();
const port = 3000;
const server = express();

// Connexion DB
connectDB()
    .then(() => console.log("Connecté à MongoDB"))
    .catch(() => console.log('Échec de la connexion'));

// Middleware serveur uniquement
server.use(express.json());
server.use(express.urlencoded({extended: false}));


// Routes
server.use("/task", require('./routes/task.routes'));
server.use("/category", require('./routes/category.routes'));
server.use("/user", require('./routes/user.routes'));

// Démarrage du serveur
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
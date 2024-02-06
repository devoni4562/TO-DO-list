const express = require('express');
const connectDB = require("./config/db");
const cors = require('cors');
const path = require("path");
const port = 3000;
const server = express();


// Connexion DB
// connectDB.getConnection()
//     .then(conn => {
//         console.log('Connexion success');
//         conn.release();
//     })
//     .catch(err => {
//         console.error('Connexion fail :', err.stack);
//     });
// Middleware serveur uniquement
server.use(express.json());
server.use(express.urlencoded({extended: false}));


// Routes
server.use(cors());

server.use("/task", require('./routes/task.routes'));
server.use("/category", require('./routes/category.routes'));
server.use("/user", require('./routes/user.routes'));

// Démarrage du serveur
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
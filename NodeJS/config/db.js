const mariadb = require('mariadb');
const dotenv = require('dotenv').config({path: '../.env'});
const fs = require('fs');


function createPool() {
    return mariadb.createPool({
        host: process.env.MARIA_HOST,
        user: process.env.MARIA_USER,
        password: process.env.MARIA_PW,
        connectionLimit: 5
    });
}

function updatePool() {
    
}

const connectDB = createPool();

connectDB.getConnection()
    .then(conn => {
        console.log('Connexion before initialisation success');

        fs.readFile('./scripts/initialisation.sql', 'utf-8', (err, data) => {
            if (err) {
                console.error('Error during script reading : ', err.stack);
                conn.release();
                return;
            }

            const commands = data.split(';').filter(Boolean);

            Promise.all(commands.map(command => conn.query(command.trim())))
                .then(() => {
                        console.log('Script executing success');
                    }
                )
                .catch(err => {
                    console.error('Executing script fail : ', err.stack);
                });

            conn.release();
        });
    })
    .catch(err => {
        console.error('Connexion fail : ', err.stack);
    });


module.exports = connectDB;
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

function updatePool(pool) {
    pool.end();
    pool = mariadb.createPool({
        host: process.env.MARIA_HOST,
        user: process.env.MARIA_USER,
        password: process.env.MARIA_PW,
        database: process.env.MARIA_DB,
        connectionLimit: 5
    });
}

async function initializeDatabase() {
    try {
        const connectDB = createPool();
        const conn = await connectDB.getConnection();
        console.log('Connexion before initialisation success');

        const data = await fs.promises.readFile('./scripts/initialisation.sql', 'utf-8');
        const commands = data.split(';').filter(Boolean);

        await Promise.all(commands.map(command => conn.query(command.trim())));

        console.log('Initialisation script executing with success');

        await conn.release();
        updatePool(connectDB);
        return connectDB;
    } catch (err) {
        console.error('Error during script execution : ', err.stack);
    }
}

initializeDatabase()
    .then(connectDB => {
            console.log('End of initialisation');
            module.exports = connectDB;
        }
    );

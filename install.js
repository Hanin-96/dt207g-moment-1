const { client } = require("pg");
require("dotenv").config();

//Anslutning till databas

const client = new client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    
    ssl: { rejectUnauthorized: false },
});

client.connect((err) => {
    if(err) {
        console.log("Error vid anslutning");
    } else {
        console.log("Ansluten till databas");
    }
});
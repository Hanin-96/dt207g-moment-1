
const { Client } = require("pg");
require("dotenv").config();

//Anslutning till databas
const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl:
    {
        rejectUnauthorized: false,
    },
});

client.connect((error) => {
    if (error) {
        console.log("Det gick inte att ansluta" + error);
    } else {
        console.log("Ansluten till databasen");
    }
});

//Skapa tabell till databas
client.query (`
DROP TABLE IF EXISTS courses;

    CREATE TABLE courses(
        course_id SERIAL PRIMARY KEY,
        course_code VARCHAR(10) NOT NULL,
        course_name TEXT NOT NULL,
        syllabus TEXT NOT NULL,
        progression CHAR(1) NOT NULL,
        course_post_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`);
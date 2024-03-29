
const { Client } = require("pg");
require("dotenv").config();

//Express
const express = require("express");
const app = express();
app.set("view engine", "ejs"); //view engine: EJS
app.use(express.static("public")); //Statiska filer såsom .css, .js, img i katalogen public
app.use(express.urlencoded({ extended: true })); //Aktivera formulärdata

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

/*......................................Routing.....................................*/
//Routing index.ejs
app.get("/", async (req, res) => {

    //Läs ut kursdata i index
    client.query("SELECT * FROM courses", (error, result) => {
        if (error) {
            console.log("Det uppstod ett fel");
        } else {
            res.render("index", {
                courses: result.rows,
                name: "Hanin Farhan"
            });
        }
    });


});

//Routing Course.ejs
app.get("/course", async (req, res) => {
    res.render("course", {
        error: ""
    });
});

app.post("/", async (req, res) => {
    const courseCode = req.body.course_code;
    const courseName = req.body.course_name;
    const syllabus = req.body.syllabus;
    const progression = req.body.progression;
    let error = "";

    if (courseCode != "" && courseName != "" && syllabus != "" && progression != "") {
        //Sql Fråga för att lagra kursinformation
        const result = await client.query("INSERT INTO courses(course_code, course_name, syllabus, progression) values ($1, $2, $3, $4)",
            [courseCode, courseName, syllabus, progression]);

            res.redirect("/")

    } else {
        error = "Du måste fylla i alla fält!"
    }

    res.render("course", {
        error: error
    });


});


//Routing about.ejs
app.get("/about", async (req, res) => {
    res.render("about");
});


//Starta igång server
app.listen(process.env.PORT, () => {
    console.log("servern är startad på port: " + process.env.PORT);
});



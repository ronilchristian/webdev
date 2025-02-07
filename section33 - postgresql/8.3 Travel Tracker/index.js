import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  password: "password",
  database: "world",
  table: "visited_countries",
  port: 5432,
});

db.connect();

const app = express();
const port = 3000;

let data = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkVisited() {
  const result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

app.get("/", async (req, res) => {
  //Write your code here.
  const countries = await checkVisited();

  res.render("index.ejs", {
    total: countries.length,
    countries: countries,
  });
});

app.post("/add", async (req, res) => {
  const input = req.body.country;

  try {
    const result = await db.query(
      "SELECT country_code from countries WHERE LOWER(country_name) LIKE'%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;

    try {
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1);",
        [countryCode]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
      const countries = await checkVisited();
      res.render("index.ejs", {
        total: countries.length,
        countries: countries,
        error: "Country has already been added, try again.",
      });
    }
  } catch (err) {
    console.log(err);
    const countries = await checkVisited();
    res.render("index.ejs", {
      total: countries.length,
      countries: countries,
      error: "Country name does not exist.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

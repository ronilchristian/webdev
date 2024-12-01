import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import { dirname } from "path";
import { fileURLToPath } from "url";
const port = 3000;
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const d = new Date();
  var curDay = d.getDay();

  var type = "a weekday";
  var adv = "It's time to work hard";

  if (curDay == 0 || curDay == 6) {
    type = "the weekend";
    adv = "It's time to have fun";
  }

  res.render(__dirname + "/views/index.ejs", { type: type, advice: adv });
});

app.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`);
});

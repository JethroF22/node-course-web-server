const express = require("express");
const path = require("path");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(path.join(__dirname, "views", "partials"));
app.set("view_engine", "hbs");

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFileSync("server.log", `${log}\n`, err => {
    if (err) {
      console.log("Unable to write to file");
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render("maintenance.hbs");
// });

app.use(express.static(path.join(__dirname, "public")));

hbs.registerHelper("getCurrentYear", () => new Date().getFullYear());
hbs.registerHelper("screamIt", text => text.toUpperCase());

app.get("/", (req, res) => {
  res.render("home.hbs", {
    title: "Home",
    welcomeMessage: "Welcome to my portfolio!"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    title: "About Page"
  });
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "Error handling request"
  });
});

app.listen(port, () => {
  console.log("Server is up on port 3000");
});

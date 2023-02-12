// require("dotenv").config();
const express = require("express");
const app = express();

// require("./start/cors")(app);
// require("./routes/routes")(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("HOMEPAGE!!"));
app.all("*", (req, res) => res.status(404).send("NOT FOUND"));

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;

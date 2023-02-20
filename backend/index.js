require("dotenv").config(); // config environment variables
const logger = require("./start/logger"); // custom logger

const express = require("express");
const app = express();

require("./start/logging")(); // catch errors and log to file
require("./start/prod")(app); // optimization for the production environment
require("./start/cors")(app); // config CORS settings
require("./start/db")(); // config database connection
require("./start/routes")(app); // config api routes

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`Listening on port ${port}...`));

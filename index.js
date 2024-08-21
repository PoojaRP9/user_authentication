const express = require("express");  // Import Express framework for building the web application
const bodyParser = require('body-parser');  // Middleware for parsing incoming request bodies
const cookieParser = require('cookie-parser');  // Middleware for parsing cookies in the request headers

require("./db/datbase");  // Import the database connection module to establish connection
const mainRouter = require("./routes/main.route");  // Import the mainRouter module for routing requests

const app = express();  // Create an instance of the Express application

app.use(bodyParser.urlencoded({ extended: true }));  // Parse URL-encoded request bodies
app.use(cookieParser());   // Parse cookies in the request headers

app.set('view engine', 'ejs');  // Set the view engine to EJS for rendering dynamic content

app.use('/', mainRouter);  // Mount the mainRouter for handling requests starting from the root URL ('/')

app.listen(4949, () => {  // Start the server on port 8000
    console.log("Server started");
});

module.exports = app;  // Export the app for testing or use in other modules

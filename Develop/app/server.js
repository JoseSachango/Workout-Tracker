//creating an express server
const express = require("express");
const app = express();

//defining the port the server will be listening on
const PORT = process.env.PORT || 3017

//Middleware to access the request.body property
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Middleware that allows us to seperate javascript and html documents in a folder and still use them
app.use(express.static("public"));


//links to the routes are server is using
app.use(require("../routes/routes.js"));





app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });









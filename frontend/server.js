const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// Show the form
app.get("/", (req, res) => {
    res.render("index");
});

// Receive form data and send it to Flask
app.post("/submit", async (req, res) => {
    try {
        const response = await axios.post(
            "http://backend:5000/submit",
            {
                name: req.body.name,
                email: req.body.email
            }
        );

        res.send("<h2>Data submitted successfully!</h2>");
    } catch (error) {
        res.send("<h2>Error submitting data.</h2><pre>" + error.message + "</pre>");
    }
});

app.listen(3000, () => {
    console.log("Frontend running on port 3000");
});

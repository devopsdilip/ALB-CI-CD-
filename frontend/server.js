const express = require("express");
const axios = require("axios");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const BACKEND_URL = process.env.BACKEND_URL || "http://backend:5000";

// Home
app.get("/", async (req, res) => {
    const response = await axios.get(`${BACKEND_URL}/students`);
    res.render("index", {
        students: response.data.students
    });
});

// Register page
app.get("/register", (req, res) => {
    res.render("register");
});

// Handle form submit
app.post("/register", async (req, res) => {
    await axios.post(`${BACKEND_URL}/students`, req.body);
    res.redirect("/success");
});

// Success page
app.get("/success", (req, res) => {
    res.render("success");
});

// Students page
app.get("/students", async (req, res) => {
    const response = await axios.get(`${BACKEND_URL}/students`);
    res.render("students", {
        students: response.data.students
    });
});

app.listen(3000, () => {
    console.log("Frontend running on port 3000");
});

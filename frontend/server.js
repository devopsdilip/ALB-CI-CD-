const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// 🔥 BEST PRACTICE: use env variable
const BACKEND_URL = process.env.BACKEND_URL || 
"http://fullstack-alb-585552082.ap-south-1.elb.amazonaws.com";


// Home page
app.get("/", (req, res) => {
    res.render("index");
});


// Submit form → send to backend
app.post("/submit", async (req, res) => {
    try {
        const response = await axios.post(
            `${BACKEND_URL}/api/submit`,
            {
                name: req.body.name,
                email: req.body.email
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        res.send(`
            <h2>✅ Data submitted successfully!</h2>
            <pre>${JSON.stringify(response.data, null, 2)}</pre>
        `);

    } catch (error) {
        console.error(error.response?.data || error.message);

        res.send(`
            <h2>❌ Error submitting data</h2>
            <pre>${JSON.stringify(error.response?.data || error.message, null, 2)}</pre>
        `);
    }
});


// Start server
app.listen(3000, "0.0.0.0", () => {
    console.log("Frontend running on port 3000");
});

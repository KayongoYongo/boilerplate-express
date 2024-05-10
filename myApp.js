require('dotenv').config(); // Load environmental variables from .env file

let express = require('express');
let app = express();

function loggerMiddleware(req, res, next) {
    // Extract method, path, and IP address from the request object
    const method = req.method;
    const path = req.path;
    const ip = req.ip;

    // Log the request details to the console
    console.log(`${method} ${path} - ${ip}`);

    // Call next to pass control to the next middleware in the stack
    next();
}

app.use(loggerMiddleware);

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.use("/public", express.static(__dirname + '/public'));

app.get("/json", (req, res) => {
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        res.json({"message": "HELLO JSON"});
    } else {
        res.json({message: "Hello json"});
    }
});

// Middleware function to add current time to req object
function addTimeToReq(req, res, next) {
    req.time = new Date().toString(); // Add current time to req object
    next(); // Call next to pass control to the final handler
}

// Route definition for '/now', chaining middleware and final handler
app.get('/now', addTimeToReq, (req, res) => {
    // Respond with a JSON object containing the time from req object
    res.json({ time: req.time });
});

app.get("/:word/echo", (req, res) => {
    const {word} = req.params;
    res.json({echo: word});
  });

console.log("Hello World");




 module.exports = app;

require('dotenv').config(); // Load environmental variables from .env file

var bodyParser = require("body-parser");
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


app.get("/name", function(req, res) {
  var firstName = req.query.first;
  var lastName = req.query.last;
  // OR you can destructure and rename the keys
  var { first: firstName, last: lastName } = req.query;
  // Use template literals to form a formatted string
  res.json({name: `${firstName} ${lastName}`});
});


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.post("/name", function(req, res) {
    // Handle the data in the request
    var string = req.body.first + " " + req.body.last;
    res.json({ name: string });
  });

console.log("Hello World");

 module.exports = app;

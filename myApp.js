// task 0
require('dotenv').config();
let express = require('express');
const bodyParser = require('body-parser');
let app = express();


// Task 6
// Middleware logger function
app.use(function(req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
})

// Task 1
// Start a working Express Server
// Hello will be a callback function
const Hello = (req, res) => {
    res.send("Hello Express");
}
// The syntax is app.METHOD(PATH, HANDLER)
// METHOD is an http method in lowercase. PATH is a relative path on the server (it can be a string, or even a regular expression).
// HANDLER is a function that Express calls when the route is matched. Handlers take the form function(req, res) {...}.
// Since we want to serve a HTML file, we have to comment out the first route
// app.get("/", Hello);

// Another option of the above
app.get("/hello", function(req, res){
    res.send("Hello Express with callback");
})

// Task 2
// Serve a HTML file
app.get("/", function(req, res) {
    absolutePath = __dirname + '/views/index.html';
    res.sendFile(absolutePath);
})

// Task 3
// Serve static assets
// Since the specific file has already been referenced, there's no need of selecting it
// Just include the directory and it will be fine
staticPath = __dirname + '/public';
app.use('/public', express.static(staticPath))

// Task 4
// Serve JSON
app.get("/json", function(req, res) {
    res.json({"message": "Hello json"} );
})

// Task 5
app.get("/json/uppercase", function(req, res) {
    let message = "Hello json";
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        message = message.toUpperCase()
        res.json({"message": message} );
    } else {
        res.json({"message": message});
    }
})

// Task 7
// Chain Middleware to Create a Time Server
// app.METHOD(path, middlewareFunction)
const addTimeMiddleware = (req, res, next) => {
    req.time = new Date().toString();
    next();
};

// route handler for /now endpoint
app.get('/now', addTimeMiddleware, (req, res) => {
    res.json( { time: req.time });
})

// Task 8
// Get Route Parameter Input from the Client
app.get('/:word/echo', function(req, res) {
    const word = req.params.word;
    res.json({ "echo": word })
})

// Task 9
// Get Query Parameter Input from the Client
app.get('/name', function(req, res) {
    const firstName = req.query.first;
    const lastName = req.query.last;

    res.json({ name: `${firstName} ${lastName}` })
})

// Task 10
// Use body-parser to Parse POST Requests
app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

// Task 11
// Get Data from POST Requests
app.post('/name', function(req, res) {
    const firstName = req.body.first; // Retrieve first name from request body
    const lastName = req.body.last; // Retrieve last name from request body

    res.json({ name: `${firstName} ${lastName}` })
})
module.exports = app;

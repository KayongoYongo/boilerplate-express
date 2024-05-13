let express = require('express');
let app = express();

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

 module.exports = app;

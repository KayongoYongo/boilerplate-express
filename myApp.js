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
app.get("/", Hello);

// Another option of the above
app.get("/hello", function(req, res){
    res.send("Hello Express with callback");
})

//
 module.exports = app;

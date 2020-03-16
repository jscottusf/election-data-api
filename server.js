const express = require("express");
const path = require("path");
const bodyParser = require('body-parser') // middleware for parsing the body of a request
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const axios = require('axios');

axios.get('https://election-data-2020.firebaseio.com/nationalPolls/.json')
    .then(
        function(response) {
            var nationalPolls = response.data;
        });
        
    

// app.get("/api/nationalpolls", function(req, res) {
//     res.json(nationalPolls);
// });

// app.get("/api/statepolls", function(req, res) {
//     return res.json(statePolls);
// });

// app.post("/api/nationalpolls", function(req, res) {
//     nationalPolls.push(req.body);
// });

// app.post("/api/statepolls", function(req, res) {
//     statePolls.push(req.body);
// });
const express = require("express");
const bodyParser = require('body-parser') // middleware for parsing the body of a request
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./app/data/nationalPolls')(app);
require('./app/data/statePolls')(app);

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
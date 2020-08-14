//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/web422-a6'));

//app.use(express.static(__dirname));
//__dirname = path.resolve(path.dirname(''));
//console.log("here" + __dirname);

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/web422-a6/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
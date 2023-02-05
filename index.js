// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


app.get("/api/:fecha?", (req, res, next) => {
  let { fecha } = req.params;
  let date;

  if ( /\d{13}/.test(fecha) ) {
    fecha = parseInt(fecha);
  };

  if (fecha) {
    // Objeto con la fecha pasada como parametro
    date = new Date(fecha);
  } else {
    // Objeto con la fecha actual
    date = new Date();
  };

  // Unix
  req.unix = date.getTime();

  // Fecha en formato UTC
  req.utc = date.toUTCString();

  next();

}, (req, res) => {

  if (isNaN(req.unix)) {
    res.json({ error: req.utc });
    return;
  };

  res.json({ unix: req.unix, utc: req.utc });
});
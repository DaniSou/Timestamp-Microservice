// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.get("/api/:date?", function(req, res) {
  if(!req.params.date){
      const unixTime = new Date().getTime();
      const utcTime = new Date().toUTCString();
      res.json({"unix":unixTime,"utc":utcTime});
  } else {
    var timeParam = req.params.date;
    var date = new Date(timeParam);
    var testParam = date.toString();
    console.log(testParam);

    //If Invalid date. It could mean it's in milliseconds.
    if(testParam == "Invalid Date"){

      let reg = /^\d+$/;
      let numbersOnlytest = reg.test(timeParam);
      if(numbersOnlytest) {
    
        var parseIntDate = parseInt(timeParam);
        let tbd = new Date(parseIntDate).toUTCString() 
     
        return res.json({unix : parseIntDate, utc : tbd });
      }
    return res.json({error : "Invalid Date" });
    }
    // NOT Invalid Date
    var currentTime = date.getTime();
    var currentUTC = date.toUTCString();
    return res.json({unix : currentTime, utc : currentUTC });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

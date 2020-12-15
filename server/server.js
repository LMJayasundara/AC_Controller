var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var PORT = process.env.PORT || 3000;
var bodyParser = require("body-parser");

////////////////////////////////////////////////////////////////////////////////

var docs1;
var docs2;
var docs3;

var setPoint1 = 20;
var setPoint2 = 20;
var setPoint3 = 20;

app.use(express.static(__dirname + "/public"));

var urlencodedParser = bodyParser.urlencoded({ extended: false });

////////////////////////////////////////////////////////////////////////////////

var Datastore1 = require("nedb"),
    db1 = new Datastore1({ filename: "Database/Server_01_db.db", autoload: true });

var Datastore2 = require("nedb"),
    db2 = new Datastore2({ filename: "Database/Server_02_db.db", autoload: true });

var Datastore3 = require("nedb"),
    db3 = new Datastore3({ filename: "Database/Server_03_db.db", autoload: true });

////////////////////////////////////////////////////////////////////////////////

function setup1() {
  db1.remove({}, { multi: true }, function(err, numRemoved) {
  });
}

function setup2() {
  db2.remove({}, { multi: true }, function(err, numRemoved) {
  });
}

function setup3() {
  db3.remove({}, { multi: true }, function(err, numRemoved) {
  });
}

app.post("/set1", urlencodedParser, function(request, response) {
  var P = parseFloat(request.body.point1);
  setPoint1 = P;
  response.redirect("/setpoint.html");
});

app.post("/set2", urlencodedParser, function(request, response) {
  var P = parseFloat(request.body.point2);
  setPoint2 = P;
  response.redirect("/setpoint.html");
});

app.post("/set3", urlencodedParser, function(request, response) {
  var P = parseFloat(request.body.point3);
  setPoint3 = P;
  response.redirect("/setpoint.html");
});

app.post("/new1", urlencodedParser, function(request, response) {
    var Y = parseInt(request.body.year);
    var M = parseInt(request.body.month);
    var D = parseInt(request.body.day);

    db1.find({ "date.Y": Y, "date.M": M, "date.D": D }, function(err, docs) {
      docs1 = docs;
    });

    response.redirect("/server1.html");
});

app.post("/new2", urlencodedParser, function(request, response) {
  var Y = parseInt(request.body.year);
  var M = parseInt(request.body.month);
  var D = parseInt(request.body.day);

  db2.find({ "date.Y": Y, "date.M": M, "date.D": D }, function(err, docs) {
    docs2 = docs;
  });

  response.redirect("/server2.html");
});

app.post("/new3", urlencodedParser, function(request, response) {
  var Y = parseInt(request.body.year);
  var M = parseInt(request.body.month);
  var D = parseInt(request.body.day);

  db3.find({ "date.Y": Y, "date.M": M, "date.D": D }, function(err, docs) {
    docs3 = docs;
  });

  response.redirect("/server3.html");
});

app.get("/data1", function(request, response) {
  response.send(docs1);
});

app.get("/data2", function(request, response) {
  response.send(docs2);
});

app.get("/data3", function(request, response) {
  response.send(docs3);
});

app.get("/reset1", function(request, response) {
  setup1();
  response.redirect("/server1.html");
});

app.get("/reset2", function(request, response) {
  setup2();
  response.redirect("/server2.html");
});

app.get("/reset3", function(request, response) {
  setup3();
  response.redirect("/server3.html");
});

////////////////////////////////////////////////////////////////////////////////

const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort('/dev/ttyACM0', 9600);
const parser = port.pipe(new Readline({delimiter: '\r\n'}));

port.on('open', openPort);

function openPort() {
  console.log('port open');

  function sendData() {
		var setPoint = (setPoint1.toString() + ':' + setPoint2.toString() +':'+ setPoint3.toString() + ':');
    port.write(setPoint);
    // console.log(setPoint);
  }
  setInterval(sendData, 1000);
}

parser.on('data', (data) => {
    var responseArray = JSON.parse(data.toString().replace('\r','').replace('\n','').trim());
    var temp1 = responseArray.temperature1;
    var moist1 = responseArray.moisture1;

    var temp2 = responseArray.temperature2;
    var moist2 = responseArray.moisture2;

    var temp3 = responseArray.temperature2;  // responseArray.temperature3;
    var moist3 = responseArray.moisture2;    // responseArray.moisture3;

    var today = new Date();
    db1.insert({
        temp: temp1,
        moist: moist1,
        date: {D: today.getDate(), M: (today.getMonth()+1), Y: today.getFullYear()},
        time: (today.getHours())+":"+(today.getMinutes())
    });

    db2.insert({
        temp: temp2,
        moist: moist2,
        date: {D: today.getDate(), M: (today.getMonth()+1), Y: today.getFullYear()},
        time: (today.getHours())+":"+(today.getMinutes())
    });

    db3.insert({
        temp: temp3,
        moist: moist3,
        date: {D: today.getDate(), M: (today.getMonth()+1), Y: today.getFullYear()},
        time: (today.getHours())+":"+(today.getMinutes())
    });

    io.sockets.emit('sensor', {
        date: today.getDate()+"-"+(today.getMonth()+1)+"-"+today.getFullYear()+"  /  "+(today.getHours())+":"+(today.getMinutes()),
        time: (today.getHours())+":"+(today.getMinutes()),
        temp1: temp1,
        hum1: moist1,
        temp2: temp2,
        hum2: moist2,
        temp3: temp3,
        hum3: moist3,

        point1: setPoint1,
        point2: setPoint2,
        point3: setPoint3
    });
});

////////////////////////////////////////////////////////////////////////////////

server.listen(PORT, function() {
	console.log("Listening ON: " + PORT + "!");
});

////////////////////////////////////////////////////////////////////////////////

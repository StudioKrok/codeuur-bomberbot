var express = require('express')
var engines = require('consolidate');
var GoogleSpreadsheet = require("google-spreadsheet");
var my_sheet = new GoogleSpreadsheet('1oWbXZKNsDFqlsktIZpbFFIKvNPLysvhjdTuXcNl3r9g');
var bodyParser = require('body-parser');
var app = express()

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.get('/', function (req, res) {
  res.render('index_nl');
});

app.get('/en', function (req, res) {
  res.render('index_en');
});

app.post('/', function (req, res) {
  console.log(req.body);
  my_sheet.setAuth('mail@gmail.com', 'password', function(err){
    my_sheet.getRows(1, function(err, rows){
      my_sheet.addRow('worksheet_id', {
        date: new Date(),
        name: req.body.name,
        school: req.body.school,
        email: req.body.email,
        message: req.body.message
      }, function(err){
        if(err){
          console.log('err', err);
        }
        res.redirect('/');
      });
    })

  });
});


var server = app.listen(8083, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
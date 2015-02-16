var express = require('express')
var engines = require('consolidate');
var app = express()

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.get('/', function (req, res) {
  console.log('no entra por aca');
  res.render('index');
});


app.get('/temp', function (req, res) {
  res.render('temp');
});


var server = app.listen(8083, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})